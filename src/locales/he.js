// Hebrew translations (partial coverage based on current UI strings)
const he = {
  nav: {
    home: 'ראשי',
    lostAndFound: 'השבת אבידה',
    carpool: 'קארפול',
    education: 'חינוך ותרבות',
    business: 'עסקים',
    phoneBook: 'ספר טלפונים',
    sell: 'לוח מודעות'
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
};

export default he;
