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
        text: 'לוח זמנים ועדכונים על קווי אוטובוס, תחנות מרכזיות וקישוריות לשכונות סמוכות. מומלץ להשתמש באפליקציות זמן אמת כמו Moovit או Bus Nearby לקבלת זמן הגעה מדויק.',
        linkLabel: 'לבדיקת זמני אוטובוסים',
        link: 'https://www.moovitapp.com'
      },
      recycle: {
        title: 'מחזור',
        text: 'נקודות איסוף למיחזור: נייר, פלסטיק, זכוכית, בגדים וסוללות. אנא הקפידו להפריד בהתאם לסוג החומר ולשמור על ניקיון המכלים כדי לשמור על סביבה נקייה.',
        linkLabel: 'מפת נקודות מחזור',
        link: 'https://www.recycling.gov.il'
      },
      municipalSchedual: {
        title: 'לוח פעילות עירוני',
        text: 'אירועים, חוגים ופעילויות קהילתיות הפתוחים לציבור לאורך השנה. כולל פרסומים על מופעים, הרצאות, וסדנאות בשכונה ובמרכזים העירוניים.',
        linkLabel: 'לוח אירועים עירוני',
        link: 'https://www.kiryatono.muni.il/events/'
      },
      kindergartens: {
        title: 'גני ילדים',
        text: 'מידע על גני ילדים באזור: שעות פעילות, רישום שנתי, פעילות חינוכית ותיאום ביקורים. מומלץ לבדוק מראש מועדי רישום והסדרי התאקלמות.',
        linkLabel: 'מידע והרשמה לגני ילדים',
        link: 'https://www.kiryatono.muni.il'
      },
      dayCare: {
        title: 'צהרונים',
        text: 'מסגרות צהרון לאחר שעות הלימודים: פעילויות העשרה, ארוחות מסודרות, צוות מקצועי ומדיניות ביטול. בדקו אפשרויות הנחה ורישום מרוכז.',
        linkLabel: 'רישום לצהרונים',
        link: 'https://www.kiryatono.muni.il'
      },
      classes: {
        title: 'חוגים ופעילויות',
        text: 'מגוון חוגים בתחומים כגון ספורט, אומנות, מוסיקה, מחשבים ושפות. הרשמה מתבצעת אונליין או במרכזים הקהילתיים. מומלץ לוודא זמינות מקומות.',
        linkLabel: 'רישום לחוגים',
        link: 'https://www.kiryatono.muni.il'
      },
      municipalContacts: {
        title: 'מוקדי קשר עירוניים',
        text: 'טלפונים ושירותים חיוניים: מוקד עירוני, פניות הציבור, תברואה, ביטחון קהילתי, רווחה וחינוך. שמרו מספרים אלו לשעת צורך.',
        linkLabel: 'מוקדי קשר באתר העירייה',
        link: 'https://www.kiryatono.muni.il'
      },
      synagogActivity: {
        title: 'פעילות בתי כנסת',
        text: 'זמני תפילות, שיעורי תורה ופעילות קהילתית בשבתות וחגים. פרסום מודעות מיוחדות לעילוי נשמה, בר מצווה וקהילה תומכת.',
        linkLabel: 'זמני תפילות',
        link: 'https://www.kiryatono.muni.il'
      },
      schoolHolidays: {
        title: 'חופשות בתי ספר',
        text: 'לוח חופשות שנתיות: חגים, מועדי פתיחת שנה, חופשת חנוכה, פסח וקיץ. מומלץ לעקוב אחרי עדכונים רשמיים של משרד החינוך.',
        linkLabel: 'לוח חופשות משרד החינוך',
        link: 'https://edu.gov.il'
      }
    }
  }
};

export default he;
