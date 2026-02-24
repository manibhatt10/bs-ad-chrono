// Nepali Events & Festivals Dataset
// Keyed by BS date string "YYYY-MM-DD"
// Covers major festivals for BS 2080-2083

export interface NepaliEvent {
    name: string;
    nameNp: string;
    description: string;
    isHoliday: boolean;
    category: 'festival' | 'national' | 'religious' | 'cultural';
}

export const EVENTS_DATA: Record<string, NepaliEvent[]> = {
    // ===== BS 2080 =====
    "2080-01-01": [{
        name: "Nepali New Year 2080",
        nameNp: "नयाँ वर्ष २०८०",
        description: "The first day of Baishakh marks the beginning of the Bikram Sambat new year.",
        isHoliday: true,
        category: 'national'
    }],
    "2080-01-11": [{
        name: "Rato Machhindranath Jatra",
        nameNp: "रातो मछिन्द्रनाथ जात्रा",
        description: "An ancient chariot festival celebrated in Lalitpur (Patan).",
        isHoliday: false,
        category: 'cultural'
    }],
    "2080-02-01": [{
        name: "Buddha Jayanti",
        nameNp: "बुद्ध जयन्ती",
        description: "Celebrates the birth, enlightenment, and death of Gautama Buddha at Lumbini.",
        isHoliday: true,
        category: 'religious'
    }],
    "2080-04-15": [{
        name: "Janai Purnima / Raksha Bandhan",
        nameNp: "जनै पूर्णिमा / रक्षा बन्धन",
        description: "Sacred thread ceremony. Brahmins change their Janai (sacred thread) and sisters tie Rakhi to brothers.",
        isHoliday: true,
        category: 'religious'
    }],
    "2080-04-27": [{
        name: "Gaijatra",
        nameNp: "गाईजात्रा",
        description: "Festival of cows. Families who lost members parade through streets in Bhaktapur.",
        isHoliday: true,
        category: 'cultural'
    }],
    "2080-05-03": [{
        name: "Krishna Janmashtami",
        nameNp: "कृष्ण जन्माष्टमी",
        description: "Celebrates the birth of Lord Krishna. Devotees flock to Krishna Mandir in Patan.",
        isHoliday: true,
        category: 'religious'
    }],
    "2080-05-18": [{
        name: "Teej",
        nameNp: "तीज",
        description: "Women's festival dedicated to Goddess Parvati. Women fast and pray for marital bliss.",
        isHoliday: true,
        category: 'religious'
    }],
    "2080-06-09": [{
        name: "Ghatasthapana (Dashain Start)",
        nameNp: "घटस्थापना (दशैं सुरु)",
        description: "The first day of the 15-day Dashain festival. A sacred kalash is established.",
        isHoliday: true,
        category: 'festival'
    }],
    "2080-06-15": [{
        name: "Fulpati",
        nameNp: "फूलपाती",
        description: "The seventh day of Dashain when a bouquet of sacred flowers is brought to the Dashain Ghar.",
        isHoliday: true,
        category: 'festival'
    }],
    "2080-06-16": [{
        name: "Maha Ashtami",
        nameNp: "महा अष्टमी",
        description: "The eighth day of Dashain. Mass animal sacrifices in temples across Nepal.",
        isHoliday: true,
        category: 'festival'
    }],
    "2080-06-17": [{
        name: "Maha Navami",
        nameNp: "महा नवमी",
        description: "The ninth day of Dashain. Final day of sacrifices and worship of Goddess Durga.",
        isHoliday: true,
        category: 'festival'
    }],
    "2080-06-18": [{
        name: "Vijaya Dashami",
        nameNp: "विजय दशमी",
        description: "The most important day of Dashain. Elders place tika and jamara on younger family members.",
        isHoliday: true,
        category: 'festival'
    }],
    "2080-07-02": [{
        name: "Kaag Tihar",
        nameNp: "काग तिहार",
        description: "First day of the five-day Tihar festival. Crows are worshipped as messengers of death.",
        isHoliday: false,
        category: 'festival'
    }],
    "2080-07-03": [{
        name: "Kukur Tihar",
        nameNp: "कुकुर तिहार",
        description: "Second day of Tihar. Dogs are worshipped and honored with tika, garlands and treats.",
        isHoliday: false,
        category: 'festival'
    }],
    "2080-07-04": [{
        name: "Laxmi Puja / Gai Tihar",
        nameNp: "लक्ष्मी पूजा / गाई तिहार",
        description: "Goddess Laxmi is worshipped at night. Homes are cleaned and decorated with lights and rangoli.",
        isHoliday: true,
        category: 'festival'
    }],
    "2080-07-05": [{
        name: "Govardhan Puja / Mha Puja",
        nameNp: "गोवर्धन पूजा / म्ह पूजा",
        description: "Newari New Year. Oxen are worshipped. Newar community celebrates self-worship (Mha Puja).",
        isHoliday: true,
        category: 'festival'
    }],
    "2080-07-06": [{
        name: "Bhai Tika",
        nameNp: "भाइ टीका",
        description: "The final and most important day of Tihar. Sisters place tika on brothers for protection.",
        isHoliday: true,
        category: 'festival'
    }],
    "2080-07-12": [{
        name: "Chhath Parva",
        nameNp: "छठ पर्व",
        description: "Ancient Hindu festival dedicated to the Sun God. Devotees fast and pray on riverbanks.",
        isHoliday: true,
        category: 'religious'
    }],
    "2080-10-01": [{
        name: "Maghe Sankranti",
        nameNp: "माघे सक्रान्ती",
        description: "Marks the transition of the Sun into Makar rashi. Special foods like ghee, yam, and sesame are eaten.",
        isHoliday: true,
        category: 'cultural'
    }],
    "2080-10-15": [{
        name: "Sonam Lhosar",
        nameNp: "सोनाम ल्होसार",
        description: "Tamang New Year celebrated with feasts, dances, and cultural programs.",
        isHoliday: true,
        category: 'cultural'
    }],
    "2080-11-07": [{
        name: "Maha Shivaratri",
        nameNp: "महा शिवरात्री",
        description: "Night of Lord Shiva. Devotees fast and visit Pashupatinath Temple in Kathmandu.",
        isHoliday: true,
        category: 'religious'
    }],
    "2080-11-18": [{
        name: "Fagu Purnima (Holi)",
        nameNp: "फागु पूर्णिमा (होली)",
        description: "Festival of colors. People play with colored powder and water to celebrate spring.",
        isHoliday: true,
        category: 'festival'
    }],
    "2080-12-07": [{
        name: "Ghode Jatra",
        nameNp: "घोडे जात्रा",
        description: "Horse racing festival in Tundikhel, Kathmandu to ward off evil spirits.",
        isHoliday: true,
        category: 'cultural'
    }],
    "2080-12-17": [{
        name: "Ram Navami",
        nameNp: "राम नवमी",
        description: "Birthday of Lord Ram. Devotees visit temples and listen to recitations of Ramayana.",
        isHoliday: true,
        category: 'religious'
    }],

    // ===== BS 2081 =====
    "2081-01-01": [{
        name: "Nepali New Year 2081",
        nameNp: "नयाँ वर्ष २०८१",
        description: "The first day of Baishakh marks the beginning of the Bikram Sambat new year.",
        isHoliday: true,
        category: 'national'
    }],
    "2081-02-04": [{
        name: "Buddha Jayanti",
        nameNp: "बुद्ध जयन्ती",
        description: "Celebrates the birth, enlightenment, and death of Gautama Buddha.",
        isHoliday: true,
        category: 'religious'
    }],
    "2081-03-15": [{
        name: "Republic Day",
        nameNp: "गणतन्त्र दिवस",
        description: "Celebrates the establishment of the Federal Democratic Republic of Nepal in 2008.",
        isHoliday: true,
        category: 'national'
    }],
    "2081-04-16": [{
        name: "Janai Purnima",
        nameNp: "जनै पूर्णिमा",
        description: "Sacred thread ceremony. Brahmins change their Janai (sacred thread).",
        isHoliday: true,
        category: 'religious'
    }],
    "2081-05-03": [{
        name: "Krishna Janmashtami",
        nameNp: "कृष्ण जन्माष्टमी",
        description: "Celebrates the birth of Lord Krishna.",
        isHoliday: true,
        category: 'religious'
    }],
    "2081-05-17": [{
        name: "Teej",
        nameNp: "तीज",
        description: "Women's festival dedicated to Goddess Parvati.",
        isHoliday: true,
        category: 'religious'
    }],
    "2081-06-07": [{
        name: "Ghatasthapana (Dashain Start)",
        nameNp: "घटस्थापना",
        description: "First day of the 15-day Dashain festival.",
        isHoliday: true,
        category: 'festival'
    }],
    "2081-06-17": [{
        name: "Vijaya Dashami",
        nameNp: "विजय दशमी",
        description: "The most important day of Dashain.",
        isHoliday: true,
        category: 'festival'
    }],
    "2081-07-03": [{
        name: "Kaag Tihar",
        nameNp: "काग तिहार",
        description: "First day of Tihar. Crows are worshipped.",
        isHoliday: false,
        category: 'festival'
    }],
    "2081-07-07": [{
        name: "Bhai Tika",
        nameNp: "भाइ टीका",
        description: "Final day of Tihar. Sisters place tika on brothers.",
        isHoliday: true,
        category: 'festival'
    }],
    "2081-07-11": [{
        name: "Chhath Parva",
        nameNp: "छठ पर्व",
        description: "Ancient Hindu festival dedicated to the Sun God.",
        isHoliday: true,
        category: 'religious'
    }],
    "2081-09-10": [{
        name: "Christmas Day",
        nameNp: "क्रिसमस",
        description: "Although not a national holiday, Christmas is celebrated by Christian communities in Nepal.",
        isHoliday: false,
        category: 'cultural'
    }],
    "2081-10-01": [{
        name: "Maghe Sankranti",
        nameNp: "माघे सक्रान्ती",
        description: "Marks the transition of the Sun into Makar rashi.",
        isHoliday: true,
        category: 'cultural'
    }],
    "2081-11-05": [{
        name: "Maha Shivaratri",
        nameNp: "महा शिवरात्री",
        description: "Night of Lord Shiva.",
        isHoliday: true,
        category: 'religious'
    }],
    "2081-11-16": [{
        name: "Fagu Purnima (Holi)",
        nameNp: "फागु पूर्णिमा (होली)",
        description: "Festival of colors celebrating spring.",
        isHoliday: true,
        category: 'festival'
    }],

    // ===== BS 2082 =====
    "2082-01-01": [{
        name: "Nepali New Year 2082",
        nameNp: "नयाँ वर्ष २०८२",
        description: "The first day of Baishakh marks the beginning of the Bikram Sambat new year.",
        isHoliday: true,
        category: 'national'
    }],
    "2082-01-19": [{
        name: "Labour Day",
        nameNp: "श्रमिक दिवस",
        description: "International Workers' Day, a public holiday in Nepal.",
        isHoliday: true,
        category: 'national'
    }],
    "2082-02-01": [{
        name: "Buddha Jayanti",
        nameNp: "बुद्ध जयन्ती",
        description: "Celebrates the birth, enlightenment, and death of Gautama Buddha.",
        isHoliday: true,
        category: 'religious'
    }],
    "2082-03-15": [{
        name: "Republic Day",
        nameNp: "गणतन्त्र दिवस",
        description: "Celebrates the Federal Democratic Republic of Nepal.",
        isHoliday: true,
        category: 'national'
    }],
    "2082-05-18": [{
        name: "Teej",
        nameNp: "तीज",
        description: "Women's festival dedicated to Goddess Parvati.",
        isHoliday: true,
        category: 'religious'
    }],
    "2082-06-06": [{
        name: "Ghatasthapana (Dashain Start)",
        nameNp: "घटस्थापना",
        description: "First day of Dashain.",
        isHoliday: true,
        category: 'festival'
    }],
    "2082-06-13": [{
        name: "Fulpati",
        nameNp: "फूलपाती",
        description: "Seventh day of Dashain.",
        isHoliday: true,
        category: 'festival'
    }],
    "2082-06-14": [{
        name: "Maha Ashtami",
        nameNp: "महा अष्टमी",
        description: "Eighth day of Dashain.",
        isHoliday: true,
        category: 'festival'
    }],
    "2082-06-15": [{
        name: "Maha Navami",
        nameNp: "महा नवमी",
        description: "Ninth day of Dashain.",
        isHoliday: true,
        category: 'festival'
    }],
    "2082-06-16": [{
        name: "Vijaya Dashami",
        nameNp: "विजय दशमी",
        description: "The main day of Dashain.",
        isHoliday: true,
        category: 'festival'
    }],
    "2082-07-02": [{
        name: "Kaag Tihar",
        nameNp: "काग तिहार",
        description: "First day of Tihar.",
        isHoliday: false,
        category: 'festival'
    }],
    "2082-07-03": [{
        name: "Kukur Tihar",
        nameNp: "कुकुर तिहार",
        description: "Dogs are worshipped with garlands and treats.",
        isHoliday: false,
        category: 'festival'
    }],
    "2082-07-04": [{
        name: "Laxmi Puja",
        nameNp: "लक्ष्मी पूजा",
        description: "Goddess Laxmi is worshipped. Homes decorated with lights.",
        isHoliday: true,
        category: 'festival'
    }],
    "2082-07-06": [{
        name: "Bhai Tika",
        nameNp: "भाइ टीका",
        description: "Sisters place tika on brothers' foreheads.",
        isHoliday: true,
        category: 'festival'
    }],
    "2082-07-10": [{
        name: "Chhath Parva",
        nameNp: "छठ पर्व",
        description: "Sun worship festival.",
        isHoliday: true,
        category: 'religious'
    }],
    "2082-10-01": [{
        name: "Maghe Sankranti",
        nameNp: "माघे सक्रान्ती",
        description: "Winter solstice celebration with traditional foods.",
        isHoliday: true,
        category: 'cultural'
    }],
    "2082-11-07": [{
        name: "Maha Shivaratri",
        nameNp: "महा शिवरात्री",
        description: "Night of Lord Shiva.",
        isHoliday: true,
        category: 'religious'
    }],
    "2082-11-18": [{
        name: "Fagu Purnima (Holi)",
        nameNp: "फागु पूर्णिमा (होली)",
        description: "Festival of colors.",
        isHoliday: true,
        category: 'festival'
    }],

    // ===== BS 2083 =====
    "2083-01-01": [{
        name: "Nepali New Year 2083",
        nameNp: "नयाँ वर्ष २०८३",
        description: "The first day of Baishakh marks the beginning of the Bikram Sambat new year.",
        isHoliday: true,
        category: 'national'
    }],
    "2083-02-05": [{
        name: "Buddha Jayanti",
        nameNp: "बुद्ध जयन्ती",
        description: "Celebrates the birth of Gautama Buddha.",
        isHoliday: true,
        category: 'religious'
    }],
    "2083-03-15": [{
        name: "Republic Day",
        nameNp: "गणतन्त्र दिवस",
        description: "National holiday celebrating Nepal's republic.",
        isHoliday: true,
        category: 'national'
    }],
    "2083-06-16": [{
        name: "Vijaya Dashami",
        nameNp: "विजय दशमी",
        description: "The main day of Dashain.",
        isHoliday: true,
        category: 'festival'
    }],
    "2083-07-06": [{
        name: "Bhai Tika",
        nameNp: "भाइ टीका",
        description: "Final day of Tihar.",
        isHoliday: true,
        category: 'festival'
    }],
    "2083-10-01": [{
        name: "Maghe Sankranti",
        nameNp: "माघे सक्रान्ती",
        description: "Winter solstice celebration.",
        isHoliday: true,
        category: 'cultural'
    }],
    "2083-11-08": [{
        name: "Fagu Purnima (Holi)",
        nameNp: "फागु पूर्णिमा (होली)",
        description: "Festival of colors.",
        isHoliday: true,
        category: 'festival'
    }],
};

export function getEventsForBsDate(year: number, month: number, day: number): NepaliEvent[] {
    const key = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return EVENTS_DATA[key] || [];
}
