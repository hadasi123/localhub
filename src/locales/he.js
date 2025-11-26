// Hebrew translations (partial coverage based on current UI strings)
const he = {
  nav: {
    home: 'ראשי',
    lostAndFound: 'השבת אבידה',
    carpool: 'קארפול',
    education: 'חינוך ותרבות',
    business: 'עסקים',
    phoneBook: 'ספר טלפונים',
    sell: 'לוח מודעות',
    infoCenter: 'מידע שימושי'
  },
  common: {
    cancel: 'ביטול',
    loading: 'טוען...',
    submit: 'שלח',
    add: 'הוספה',
    selectCategory: 'בחר קטגוריה',
    other: 'אחר',
    noItems: 'אין פריטים עדיין.',
    beFirst: 'היה הראשון להוסיף!'
  ,
    toggleMobileMenu: 'החלף תפריט נייד',
    closeMobileMenu: 'סגור תפריט נייד'
  },
  business: {
    title: 'עסקים ונותני שירות בשכונת אריאל שרון',
    addBusiness: 'הוספת עסק מקומי',
    addBusinessBtn: 'הוספת עסק חדש',
    localBusinesses: '',
    loadingBusinesses: 'טוען עסקים...',
    noBusinesses: 'אין עסקים רשומים עדיין.',
    beFirstBusiness: 'היה הראשון להוסיף עסק מקומי!',
    fields: {
      address: 'כתובת',
      phone: 'טלפון',
      website: 'אתר אינטרנט',
      hours: 'שעות פעילות'
    }
  },
  sell: {
    title: 'לוח מודעות',
    sellItem: 'הוספת מודעה',
    listItem: 'פרסם מודעה',
    itemsForSale: 'מכירה, מסירה והשכרה בשכונה',
    loadingItems: 'טוען פריטים...',
    noItemsForSale: 'אין פריטים למכירה, מסירה או השכרה עדיין.',
    beFirstList: 'היה הראשון לפרסם מודעה!',
    fields: {
      contact: 'איש קשר',
      price: 'מחיר',
      condition: 'מצב',
      listed: 'פורסם',
      description: 'תיאור',
      itemCondition: 'מצב הפריט'
    },
    category: {
      sale: 'למכירה',
      giveaway: 'למסירה',
      rent: 'להשכרה'
    },
    categories: {
      electronics: 'אלקטרוניקה',
      furniture: 'ריהוט',
      clothing: 'בגדים',
      books: 'ספרים',
      vehicles: 'רכבים',
      home: 'בית וגינה',
      sports: 'ספורט',
      toys: 'צעצועים',
      other: 'אחר'
    },
    conditions: {
      new: 'חדש',
      'like-new': 'כמו חדש',
      good: 'טוב',
      fair: 'במצב סביר',
      poor: 'פחות טוב'
    }
  },
  lostAndFound: {
    title: 'השבת אבידה',
    report: ' הוספת דיווח על אבידה או מציאה',
    recentReports: '',
    loadingItems: 'טוען פריטים...',
    noItems: 'לא דווחו פריטים עדיין.',
    beFirstReport: 'היה הראשון לדווח!'
  },
  carpool: {
    title: 'קארפול',
    subtitle: 'נסיעות שיתופיות אל ומחוץ לשכונה',
    offerRequest: 'הוספת נסיעה',
    availableRides: 'כל בקשות והצעות הנסיעה מתוך השכונה ואליה',
    loadingRides: 'טוען נסיעות...',
    noRides: 'אין נסיעות זמינות עדיין.',
    beFirstRide: 'היה הראשון להציע נסיעה!',
    placeholderFrom: 'מיקום התחלה',
    placeholderTo: 'יעד הנסיעה',
    date: 'תאריך',
    time: 'שעה',
    description: 'תיאור',
    availableSeats: 'מקומות פנויים',
    pricePerPerson: 'מחיר לנוסע (₪)',
    driverName: 'שם הנהג',
    contactDetails: 'פרטי קשר',
    additionalNotes: 'הערות ',
    notesPlaceholder: 'מידע נוסף על הנסיעה',
    submitRide: 'הוספת נסיעה',
    from: 'מוצא',
    to: 'יעד',
    seats: 'מקומות',
    price: 'מחיר',
    driver: 'נהג',
    contact: 'יצירת קשר',
    phone: 'שם, טלפון'
  },
  education: {
    title: 'חינוך ותרבות',
    subtitle: 'הכל על מסגרות חינוכיות ותרבותיות בשכונת אריאל שרון',
    addCourse: 'הוספת מודעה חדשה',
    addOpportunity: 'הוספת מודעה חדשה',
    loadingCourses: 'טוען קורסים...',
    noCourses: 'טרם פורסמו מודעות.',
    beFirstCourse: '!',
    availableCourses: 'כל אירועי התרבות והספורט בשכונה',
    level: {
      label: 'רמה',
      beginner: 'מתחילים',
      intermediate: 'בינוניים',
      advanced: 'מתקדמים'
    },
    category: {
      label: 'קטגוריה',
      select: 'בחר קטגוריה',
      language: 'שפות',
      technology: 'טכנולוגיה',
      arts: 'אומנות ויצירה',
      fitness: 'כושר',
      cooking: 'בישול',
      business: 'עסקים',
      other: 'אחר'
    },
    duration: {
      label: 'משך',
      placeholder: 'לדוגמה: 8 שבועות, שעתיים'
    },
    schedule: {
      label: 'מועדים',
      placeholder: 'לדוגמה: ימי שני 19:00-21:00'
    },
    form: {
      title: 'כותרת',
      instructor: 'מדריך/ה',
      price: 'מחיר (₪)',
      location: 'מיקום',
      contact: 'פרטי קשר',
      description: 'תיאור'
    },
    buttons: {
      add: 'הוספה',
      cancel: 'ביטול'
    }
  },
  phoneBook: {
    title: 'מספרי טלפון חשובים',
    subtitle: 'ספר טלפונים קהילתי',
    addContact: 'הוספת איש קשר',
    editContact: 'ערוך איש קשר',
    communityContacts: '',
    loadingContacts: 'טוען אנשי קשר...',
    noContacts: 'אין אנשי קשר זמינים עדיין.',
    beFirstContact: 'היה הראשון להוסיף איש קשר!',
    form: {
      name: 'שם',
      phone: 'טלפון',
      email: 'דואר אלקטרוני',
      address: 'כתובת',
      category: 'קטגוריה',
      selectCategory: 'בחר קטגוריה',
      description: 'תיאור',
      descriptionPlaceholder: 'מידע נוסף על איש הקשר',
      emergency: 'איש קשר לשעת חירום',
      submit: 'הוספת איש קשר',
      cancel: 'ביטול'
    },
    buttons: {
      add: 'הוספת איש קשר',
      cancel: 'ביטול',
      save: 'שמור',
      clear: 'נקה טופס',
      delete: 'מחק',
      print: 'הדפס'
    },
    directory: {
      title: 'ספריית אנשי קשר',
      communityContacts: '',
      noContacts: 'אין אנשי קשר.',
      beFirst: 'היה הראשון להוסיף איש קשר!'
    },
    loading: 'טוען אנשי קשר...',
    categories: {
      emergency: 'חירום',
      healthcare: 'בריאות',
      government: 'ממשלה ורשויות',
      utilities: 'שירותים',
      business: 'עסקים',
      personal: 'אישי'
    },
    labels: {
      phone: 'טלפון',
      description: 'תיאור',
      email: 'דואר אלקטרוני',
      address: 'כתובת',
      category: 'קטגוריה',
      emergency: 'חירום'
    }
  },
  labels: {
    from: 'מאת',
    to: 'אל',
    businessName: 'שם העסק',
    category: 'קטגוריה',
    phone: 'טלפון',
    email: 'אימייל',
    website: 'אתר',
    hours: 'שעות',
    services: 'שירותים',
    address: 'כתובת',
    description: 'תיאור',
    title: 'כותרת',
    price: 'מחיר',
    condition: 'מצב',
    seller: 'מוכר',
    contact: 'יצירת קשר',
    contactDetails: 'שם, טלפון',
    location: 'מיקום',
    date: 'תאריך',
    time: 'שעה',
    seats: 'מקומות',
    driver: 'נהג',
    instructor: 'מנחה',
    duration: 'משך',
    schedule: 'לו"ז'
  }
  ,
  infoCenter: {
    title: 'מרכז מידע קהילתי',
    subtitle: 'מידע שימושי לתושבים בנושאים מרכזיים',
    subjects: {
      publicTransportation: {
        title: 'תחבורה ציבורית',
        text: `בשכונה עוברים מספר קווי אוטובוס- ברחוב עצמו ובתחנות במרחק הליכה קצר (כמו יצחק נבון/אילן ג'ורג'י, יצחק נבון/שולמית אלוני ותחנות נוספות לאורך שדרות אהרון קציר) פועלים קווים מקומיים ובין-עירוניים המאפשרים הגעה נוחה לאזורים מרכזיים בסביבה.

קו 15 – קו מרכזי העוצר במספר תחנות לאורך הרחוב.

קווים 30א, 47א, 43 – קווים העוברים בסביבת הרחוב ומקשרים לשכונות ולערים סמוכות.

קווים נוספים באזור: 64, 70, 468, 472, 621 — בהתאם לתחנות הקרובות ברחוב ובשדרות אהרון קציר.

זמני פעילות וקווים מדויקים יכולים להשתנות בהתאם ללוח הזמנים של מפעילי התחבורה.
הנתונים מבוססים על אתרי מידע לתחבורה ציבורית כגון Moovit ו-Markav`,
        linkLabel: 'לבדיקת זמני אוטובוסים',
        link: 'https://moovitapp.com/index/he/%D7%AA%D7%97%D7%91%D7%95%D7%A8%D7%94_%D7%A6%D7%99%D7%91%D7%95%D7%A8%D7%99%D7%AA-%D7%99%D7%A6%D7%97%D7%A7_%D7%A0%D7%91%D7%95%D7%9F_%D7%A9%D7%95%D7%9C%D7%9E%D7%99%D7%AA_%D7%90%D7%9C%D7%95%D7%A0%D7%99-Israel-stop_649481372-1#:~:text=%D7%A7%D7%95%D7%95%D7%99%20%D7%90%D7%95%D7%98%D7%95%D7%91%D7%95%D7%A1%20%D7%9C%D7%AA%D7%97%D7%A0%D7%AA%20%D7%99%D7%A6%D7%97%D7%A7%20%D7%A0%D7%91%D7%95%D7%9F/%D7%A9%D7%95%D7%9C%D7%9E%D7%99%D7%AA%20%D7%90%D7%9C%D7%95%D7%A0%D7%99%20%D7%91%D7%A7%D7%A8%D7%99%D7%99%D7%AA,%D7%A9%D7%95%D7%94%D7%9D%2C%20%D7%A6%D7%A4%D7%99%D7%99%D7%94%20%C2%B7%2069%2C%20%D7%AA%D7%9C%20%D7%90%D7%91%D7%99%D7%91%2D%D7%99%D7%A4%D7%95%2C%20%D7%A6%D7%A4%D7%99%D7%99%D7%94'
      },
      recycle: {
        title: 'מחזור',
        text: 'נקודות איסוף למיחזור: נייר, פלסטיק, זכוכית, בגדים וסוללות פזורות ברחבי השכונה.',
        linkLabel: 'מפת נקודות מחזור',
        link: 'https://mai.org.il/mai_map/'
      },
     
      kindergartens: {
        title: 'גני ילדים',
        text: 'מידע על גני ילדים באזור: שעות פעילות, רישום שנתי, פעילות חינוכית ותיאום ביקורים. מומלץ לבדוק מראש מועדי רישום והסדרי התאקלמות.',
        linkLabel: 'מידע והרשמה לגני ילדים',
        link: 'https://www.kiryatono.muni.il/%D7%9E%D7%97%D7%9C%D7%A7%D7%AA-%D7%92%D7%A0%D7%99-%D7%99%D7%9C%D7%93%D7%99%D7%9D/'
      },
      dayCare: {
        title: 'צהרונים',
        text: 'צהרוני אפטר סקול פועלים לרווחת ילדי הגנים ובית הספר רונה רמון. לילדי הגנים פעילות הצהרון עד שעה 17:00, ולילדי בית הספר היסודי פעילות הצהרון עד השעה 16:30.',
        linkLabel: 'רישום לצהרונים',
        link: 'https://h5z.info-cloud.co.il/Home/AnotherProcIsRunning?lang=he'
      },
      classes: {
        title: 'חוגים ופעילויות',
        text: 'חוגים לילדים ומבוגרים זמינים במתנ״ס השכונתי על שם אל״מ אסף חממי ובבית הספר רונה רמון. בין החוגים: ג׳ודו, אומנות, ריקודים, שחמט, אנגלית, מדע ורפואה.',
        linkLabel: 'רישום לחוגים',
        link: 'https://www.hamatnas.co.il/activities/2026/'
      },
      municipalContacts: {
        title: 'מוקדי קשר עירוניים',
        text: 'טלפונים ושירותים חיוניים: מוקד עירוני, פניות הציבור, תברואה, ביטחון קהילתי, רווחה וחינוך. שמרו מספרים אלו לשעת צורך.',
        linkLabel: 'מוקדי קשר באתר העירייה',
        link: 'hhttps://www.kiryatono.muni.il/phonebook/'
      },
      synagogActivity: {
        title: 'פעילות בתי כנסת',
        text: 'ברחוב שולמית אלוני, מעל מתחם הגנים (קומה 2) ניתן למצוא את בית הכנסת הקהילתי  המקיים תפילות בחול, שבתות וחגים. לפניות באשר לקיום אירועים, שבת חתן, עליה לתורה וכדומה, ניתן לפנות לרב חיליק קפלן במספר הטלפון 0546924770',
        linkLabel: 'זמני תפילות',
        link: 'https://www.chabad.org.il/Time/Index.asp?CategoryID=176'
      },
      schoolHolidays: {
        title: 'חופשות בתי ספר',
        text: ` 
16-22.12.2025 ימים שלישי עד שני – חג החנוכה
2.2.2026 יום שני – ט"ו בשבט הוא יום לימודים
2.3.2026 יום שני - תענית אסתר הוא יום לימודים 
3-4.3.2026 ימים שלישי עד רביעי – חופשת חג פורים
24.3.2026-8.4.2026 ימים שלישי עד רביעי – חופשת חג הפסח
9.4.2026 יום חמישי – אסרו חג פסח הוא יום לימודים
22.4.2026 יום רביעי – יום העצמאות
5.5.2026 יום שלישי - ל"ג בעומר הוא יום לימודים בגני הילדים, בתי הספר היסודיים וחטיבות הביניים, ויום חופש בחטיבות העליונות ובתיכונים (כיתות י'-יב')
21-22.5.2026 ימים חמישי עד שישי – חג השבועות`,
        linkLabel: 'לוח חופשות משרד החינוך',
        link: 'https://www.gov.il/he/pages/vacations25-26'
      }
    }
  }
};

export default he;
