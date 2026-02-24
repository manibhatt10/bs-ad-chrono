'use client';

import { useMemo, useState, useEffect } from 'react';
import { BS_MONTHS_EN, BS_MONTHS_NP, AD_MONTHS_EN, getDaysInBsMonth, BS_MIN_YEAR, BS_MAX_YEAR } from '@/data/bsData';

interface DateInputProps {
    type: 'ad' | 'bs';
    year: number;
    month: number;
    day: number;
    onYearChange: (year: number) => void;
    onMonthChange: (month: number) => void;
    onDayChange: (day: number) => void;
}

function getDaysInAdMonth(year: number, month: number): number {
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2 && ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)) return 29;
    return daysInMonth[month - 1];
}

export default function DateInput({ type, year, month, day, onYearChange, onMonthChange, onDayChange }: DateInputProps) {
    const isBS = type === 'bs';

    const yearMin = isBS ? BS_MIN_YEAR : 1913;
    const yearMax = isBS ? BS_MAX_YEAR : 2044;

    // Local string state so user can freely type without clamping mid-keystroke
    const [yearText, setYearText] = useState(String(year));
    const [dayText, setDayText] = useState(String(day));

    // Sync local text when parent value changes (e.g. mode swap)
    useEffect(() => { setYearText(String(year)); }, [year]);
    useEffect(() => { setDayText(String(day)); }, [day]);

    const months = isBS ? BS_MONTHS_EN : AD_MONTHS_EN;
    const monthsNp = isBS ? BS_MONTHS_NP : null;

    const maxDay = useMemo(() => {
        if (isBS) {
            return getDaysInBsMonth(year, month) || 30;
        } else {
            return getDaysInAdMonth(year, month);
        }
    }, [isBS, year, month]);

    // Commit year on blur or Enter — clamp to valid range
    const commitYear = () => {
        const val = parseInt(yearText);
        if (isNaN(val) || yearText.trim() === '') {
            setYearText(String(year)); // revert
            return;
        }
        const clamped = Math.min(yearMax, Math.max(yearMin, val));
        setYearText(String(clamped));
        onYearChange(clamped);
    };

    // Commit day on blur or Enter
    const commitDay = () => {
        const val = parseInt(dayText);
        if (isNaN(val) || dayText.trim() === '') {
            setDayText(String(day)); // revert
            return;
        }
        const clamped = Math.min(maxDay, Math.max(1, val));
        setDayText(String(clamped));
        onDayChange(clamped);
    };

    const handleKeyDown = (commit: () => void) => (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            commit();
            (e.target as HTMLInputElement).blur();
        }
    };

    const inputClasses = `
    w-full px-4 py-3.5 rounded-xl text-sm font-medium
    bg-white/70 dark:bg-white/[0.06]
    backdrop-blur-sm
    border border-black/10 dark:border-white/10
    text-gray-800 dark:text-gray-100
    focus:outline-none focus:ring-2 focus:ring-violet-500/50 dark:focus:ring-violet-400/50
    focus:border-violet-500 dark:focus:border-violet-400
    transition-all duration-200
    hover:bg-white/90 dark:hover:bg-white/[0.09]
  `;

    const selectClasses = inputClasses + " appearance-none cursor-pointer";

    const labelClasses = "block text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2";

    return (
        <div className="grid grid-cols-3 gap-3 md:gap-4">
            {/* Year — free-text input, commits on blur / Enter */}
            <div>
                <label htmlFor={`${type}-year`} className={labelClasses}>
                    Year {isBS ? <span className="font-nepali normal-case tracking-normal">(वर्ष)</span> : ''}
                </label>
                <input
                    id={`${type}-year`}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    aria-label={`Enter ${isBS ? 'BS' : 'AD'} year`}
                    placeholder={isBS ? 'e.g. 2081' : 'e.g. 2025'}
                    value={yearText}
                    onChange={e => setYearText(e.target.value.replace(/[^0-9]/g, ''))}
                    onBlur={commitYear}
                    onKeyDown={handleKeyDown(commitYear)}
                    className={inputClasses}
                />
                <p className="text-[9px] text-gray-400 dark:text-gray-500 mt-1 pl-1">
                    {yearMin}–{yearMax}
                </p>
            </div>

            {/* Month — dropdown */}
            <div>
                <label htmlFor={`${type}-month`} className={labelClasses}>
                    Month {isBS ? <span className="font-nepali normal-case tracking-normal">(महिना)</span> : ''}
                </label>
                <div className="relative">
                    <select
                        id={`${type}-month`}
                        aria-label={`Select ${isBS ? 'BS' : 'AD'} month`}
                        value={month}
                        onChange={e => onMonthChange(parseInt(e.target.value))}
                        className={selectClasses}
                    >
                        {months.map((m, i) => (
                            <option key={i + 1} value={i + 1}>
                                {m}{monthsNp ? ` (${monthsNp[i]})` : ''}
                            </option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Day — free-text input, commits on blur / Enter */}
            <div>
                <label htmlFor={`${type}-day`} className={labelClasses}>
                    Day {isBS ? <span className="font-nepali normal-case tracking-normal">(गते)</span> : ''}
                </label>
                <input
                    id={`${type}-day`}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    aria-label={`Enter ${isBS ? 'BS' : 'AD'} day`}
                    placeholder={`1–${maxDay}`}
                    value={dayText}
                    onChange={e => setDayText(e.target.value.replace(/[^0-9]/g, ''))}
                    onBlur={commitDay}
                    onKeyDown={handleKeyDown(commitDay)}
                    className={inputClasses}
                />
                <p className="text-[9px] text-gray-400 dark:text-gray-500 mt-1 pl-1">
                    1–{maxDay}
                </p>
            </div>
        </div>
    );
}
