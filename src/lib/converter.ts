// AD ↔ BS Date Conversion Engine
import {
    BS_CALENDAR_DATA,
    BS_EPOCH_YEAR,
    AD_EPOCH_YEAR,
    AD_EPOCH_MONTH,
    AD_EPOCH_DAY,
    getDaysInBsMonth,
    BS_MIN_YEAR,
    BS_MAX_YEAR,
    DAYS_EN,
    DAYS_NP,
    BS_MONTHS_EN,
    BS_MONTHS_NP,
    AD_MONTHS_EN,
    toNepaliNumeral,
} from '@/data/bsData';

export interface DateResult {
    year: number;
    month: number;
    day: number;
}

export interface ConversionResult {
    ad: DateResult;
    bs: DateResult;
    dayOfWeekEn: string;
    dayOfWeekNp: string;
    bsMonthNameEn: string;
    bsMonthNameNp: string;
    adMonthNameEn: string;
    bsDateFormatted: string;
    adDateFormatted: string;
    bsDateFormattedNp: string;
}

// --- Gregorian calendar helpers ---

function isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function getDaysInAdMonth(year: number, month: number): number {
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2 && isLeapYear(year)) return 29;
    return daysInMonth[month - 1];
}

function countAdDaysFromEpoch(year: number, month: number, day: number): number {
    // Count days from AD epoch (April 14, 1943) to given AD date
    let totalDays = 0;

    if (year > AD_EPOCH_YEAR || (year === AD_EPOCH_YEAR && month > AD_EPOCH_MONTH) ||
        (year === AD_EPOCH_YEAR && month === AD_EPOCH_MONTH && day >= AD_EPOCH_DAY)) {
        // Forward counting
        // Days remaining in epoch month
        let y = AD_EPOCH_YEAR;
        let m = AD_EPOCH_MONTH;
        let d = AD_EPOCH_DAY;

        // Count days from epoch to target
        while (y < year || (y === year && m < month) || (y === year && m === month && d < day)) {
            const daysInCurrentMonth = getDaysInAdMonth(y, m);
            const daysLeftInMonth = daysInCurrentMonth - d + 1;

            if (y === year && m === month) {
                totalDays += day - d;
                break;
            }

            totalDays += daysLeftInMonth;
            m++;
            if (m > 12) {
                m = 1;
                y++;
            }
            d = 1;
        }
    } else {
        // Backward counting (date is before epoch)
        let y = year;
        let m = month;
        let d = day;

        while (y < AD_EPOCH_YEAR || (y === AD_EPOCH_YEAR && m < AD_EPOCH_MONTH) ||
            (y === AD_EPOCH_YEAR && m === AD_EPOCH_MONTH && d < AD_EPOCH_DAY)) {
            const daysInCurrentMonth = getDaysInAdMonth(y, m);
            const daysLeftInMonth = daysInCurrentMonth - d + 1;

            if (y === AD_EPOCH_YEAR && m === AD_EPOCH_MONTH) {
                totalDays += AD_EPOCH_DAY - d;
                break;
            }

            totalDays += daysLeftInMonth;
            m++;
            if (m > 12) {
                m = 1;
                y++;
            }
            d = 1;
        }
        totalDays = -totalDays;
    }

    return totalDays;
}

// --- Conversion functions ---

export function adToBs(adYear: number, adMonth: number, adDay: number): DateResult | null {
    // Count days from AD epoch to target date
    const daysDiff = countAdDaysFromEpoch(adYear, adMonth, adDay);

    let bsYear = BS_EPOCH_YEAR;
    let bsMonth = 1;
    let bsDay = 1;
    let remainingDays = daysDiff;

    if (remainingDays >= 0) {
        // Forward from epoch
        while (remainingDays > 0) {
            const daysInMonth = getDaysInBsMonth(bsYear, bsMonth);
            if (daysInMonth === 0) return null; // Out of range

            const daysLeftInMonth = daysInMonth - bsDay + 1;

            if (remainingDays < daysLeftInMonth) {
                bsDay += remainingDays;
                remainingDays = 0;
            } else {
                remainingDays -= daysLeftInMonth;
                bsMonth++;
                if (bsMonth > 12) {
                    bsMonth = 1;
                    bsYear++;
                }
                bsDay = 1;
            }
        }
    } else {
        // Backward from epoch
        remainingDays = Math.abs(remainingDays);
        while (remainingDays > 0) {
            bsDay--;
            if (bsDay === 0) {
                bsMonth--;
                if (bsMonth === 0) {
                    bsMonth = 12;
                    bsYear--;
                }
                bsDay = getDaysInBsMonth(bsYear, bsMonth);
                if (bsDay === 0) return null;
            }
            remainingDays--;
        }
    }

    if (bsYear < BS_MIN_YEAR || bsYear > BS_MAX_YEAR) return null;

    return { year: bsYear, month: bsMonth, day: bsDay };
}

export function bsToAd(bsYear: number, bsMonth: number, bsDay: number): DateResult | null {
    if (!BS_CALENDAR_DATA[bsYear]) return null;

    const maxDay = getDaysInBsMonth(bsYear, bsMonth);
    if (bsDay < 1 || bsDay > maxDay || bsMonth < 1 || bsMonth > 12) return null;

    // Count total days from BS epoch to the given BS date
    let totalDays = 0;

    if (bsYear >= BS_EPOCH_YEAR) {
        // Forward
        for (let y = BS_EPOCH_YEAR; y < bsYear; y++) {
            const months = BS_CALENDAR_DATA[y];
            if (!months) return null;
            for (let m = 0; m < 12; m++) {
                totalDays += months[m];
            }
        }
        // Subtract the first month partial (epoch starts at day 1 of month 1)
        // Actually, epoch is day 1 month 1, so no subtraction needed for first year months before

        // Wait, we need to be more careful. The epoch is 1 Baishakh 2000 BS = April 14, 1943 AD
        // So from epoch year, we skip entire years up to bsYear
        // But for the epoch year itself, we started at month 1 day 1
        // So the above loop (starting from epoch year) already handles full years

        // For the target year, add days up to target month/day
        const months = BS_CALENDAR_DATA[bsYear];
        if (!months) return null;
        for (let m = 0; m < bsMonth - 1; m++) {
            totalDays += months[m];
        }
        totalDays += bsDay - 1; // -1 because day 1 is the 0th day offset
    } else {
        // Backward from epoch
        for (let y = BS_EPOCH_YEAR - 1; y > bsYear; y--) {
            const months = BS_CALENDAR_DATA[y];
            if (!months) return null;
            for (let m = 0; m < 12; m++) {
                totalDays -= months[m];
            }
        }
        // For the target year
        const months = BS_CALENDAR_DATA[bsYear];
        if (!months) return null;
        // Days from bsDay/bsMonth to end of year
        let daysToEndOfYear = 0;
        daysToEndOfYear += months[bsMonth - 1] - bsDay; // remaining days in target month
        for (let m = bsMonth; m < 12; m++) {
            daysToEndOfYear += months[m];
        }
        totalDays -= (daysToEndOfYear + 1);
    }

    // Now convert totalDays offset from AD epoch to AD date
    let adYear = AD_EPOCH_YEAR;
    let adMonth = AD_EPOCH_MONTH;
    let adDay = AD_EPOCH_DAY;

    if (totalDays >= 0) {
        while (totalDays > 0) {
            const daysInCurrentMonth = getDaysInAdMonth(adYear, adMonth);
            const daysLeftInMonth = daysInCurrentMonth - adDay + 1;

            if (totalDays < daysLeftInMonth) {
                adDay += totalDays;
                totalDays = 0;
            } else {
                totalDays -= daysLeftInMonth;
                adMonth++;
                if (adMonth > 12) {
                    adMonth = 1;
                    adYear++;
                }
                adDay = 1;
            }
        }
    } else {
        let absTotal = Math.abs(totalDays);
        while (absTotal > 0) {
            adDay--;
            if (adDay === 0) {
                adMonth--;
                if (adMonth === 0) {
                    adMonth = 12;
                    adYear--;
                }
                adDay = getDaysInAdMonth(adYear, adMonth);
            }
            absTotal--;
        }
    }

    return { year: adYear, month: adMonth, day: adDay };
}

export function getDayOfWeek(adYear: number, adMonth: number, adDay: number): { en: string; np: string; index: number } {
    // Using Zeller-like formula via JS Date
    const date = new Date(adYear, adMonth - 1, adDay);
    const dayIndex = date.getDay(); // 0=Sunday
    return {
        en: DAYS_EN[dayIndex],
        np: DAYS_NP[dayIndex],
        index: dayIndex,
    };
}

export function isValidBsDate(year: number, month: number, day: number): boolean {
    if (year < BS_MIN_YEAR || year > BS_MAX_YEAR) return false;
    if (month < 1 || month > 12) return false;
    const maxDay = getDaysInBsMonth(year, month);
    if (day < 1 || day > maxDay) return false;
    return true;
}

export function isValidAdDate(year: number, month: number, day: number): boolean {
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > getDaysInAdMonth(year, month)) return false;
    return true;
}

export function getFullConversion(
    source: 'ad' | 'bs',
    year: number,
    month: number,
    day: number
): ConversionResult | null {
    let ad: DateResult;
    let bs: DateResult;

    if (source === 'ad') {
        if (!isValidAdDate(year, month, day)) return null;
        ad = { year, month, day };
        const bsResult = adToBs(year, month, day);
        if (!bsResult) return null;
        bs = bsResult;
    } else {
        if (!isValidBsDate(year, month, day)) return null;
        bs = { year, month, day };
        const adResult = bsToAd(year, month, day);
        if (!adResult) return null;
        ad = adResult;
    }

    const dow = getDayOfWeek(ad.year, ad.month, ad.day);

    return {
        ad,
        bs,
        dayOfWeekEn: dow.en,
        dayOfWeekNp: dow.np,
        bsMonthNameEn: BS_MONTHS_EN[bs.month - 1],
        bsMonthNameNp: BS_MONTHS_NP[bs.month - 1],
        adMonthNameEn: AD_MONTHS_EN[ad.month - 1],
        bsDateFormatted: `${bs.year}-${String(bs.month).padStart(2, '0')}-${String(bs.day).padStart(2, '0')}`,
        adDateFormatted: `${ad.year}-${String(ad.month).padStart(2, '0')}-${String(ad.day).padStart(2, '0')}`,
        bsDateFormattedNp: `${toNepaliNumeral(bs.year)}-${toNepaliNumeral(bs.month).padStart(2, '०')}-${toNepaliNumeral(bs.day).padStart(2, '०')}`,
    };
}
