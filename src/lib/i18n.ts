export type Locale = "ar" | "en";

type Dict = {
  direction: "rtl" | "ltr";
  nav: { plans: string; features: string; contact: string; switchLang: string };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  plans: {
    heading: string;
    sub: string;
    setupFee: string;
    monthly: string;
    perMonth: string;
    mostPopular: string;
    choose: string;
    contact: string;
  };
  features: {
    heading: string;
    items: { title: string; desc: string }[];
  };
  form: {
    heading: string;
    sub: string;
    stepLabel: string;
    of: string;
    next: string;
    previous: string;
    submit: string;
    submitting: string;
    planLabel: string;
    steps: {
      business: string;
      operations: string;
      knowledge: string;
      behavior: string;
      review: string;
    };
    fields: {
      businessName: string;
      businessNamePh: string;
      businessType: string;
      businessTypePh: string;
      goal: string;
      goalPh: string;
      workingHours: string;
      workingHoursPh: string;
      location: string;
      locationPh: string;
      paymentMethods: string;
      paymentMethodsHint: string;
      paymentOptions: {
        cash: string;
        visa: string;
        instapay: string;
        fawry: string;
        wallet: string;
        bank: string;
      };
      knowledge: string;
      knowledgePh: string;
      policy: string;
      policyPh: string;
      productsServices: string;
      productsServicesHint: string;
      productAdd: string;
      productName: string;
      productNamePh: string;
      productPrice: string;
      productPricePh: string;
      productDesc: string;
      productDescPh: string;
      remove: string;
      files: string;
      filesHint: string;
      extracting: string;
      extracted: string;
      tone: string;
      toneOptions: { formal: string; friendly: string; egyptian: string };
      fallback: string;
      fallbackOptions: { handover: string; collect: string; apologize: string };
      contact: string;
      contactPh: string;
    };
    preview: { heading: string; msg: (name: string) => string };
    success: { heading: string; msg: string };
    errors: { required: string; invalidPhone: string; submitFailed: string };
    whatsapp: (plan: string, id: string) => string;
  };
  footer: { tagline: string; rights: string };
};

export const translations: Record<Locale, Dict> = {
  ar: {
    direction: "rtl",
    nav: {
      plans: "الخطط",
      features: "المميزات",
      contact: "اتصل بنا",
      switchLang: "English",
    },
    hero: {
      badge: "بوتات واتساب بالذكاء الاصطناعي",
      title: "خلي بوت ذكي يرد على عملاؤك على الواتساب",
      subtitle:
        "منصة متكاملة لتشغيل بوتات خدمة عملاء ذكية على واتساب باللهجة المصرية. اختار خطتك، املأ بيانات نشاطك، وابدأ في دقايق.",
      ctaPrimary: "اختار خطتك",
      ctaSecondary: "اعرف أكتر",
    },
    plans: {
      heading: "اختار الخطة المناسبة لنشاطك",
      sub: "كل الأسعار بالجنيه المصري — رسوم إعداد لمرة واحدة + اشتراك شهري للصيانة",
      setupFee: "رسوم الإعداد — مرة واحدة",
      monthly: "صيانة شهرية",
      perMonth: "/ شهر",
      mostPopular: "الأكثر طلبًا",
      choose: "ابدأ دلوقتي",
      contact: "تواصل معنا",
    },
    features: {
      heading: "ليه ArqFlow؟",
      items: [
        {
          title: "رد فوري 24/7",
          desc: "البوت بيرد على عملاؤك في أي وقت، حتى وأنت نايم.",
        },
        {
          title: "لهجة مصرية طبيعية",
          desc: "البوت بيتكلم زي العميل بالظبط، مش رسمي زيادة.",
        },
        {
          title: "تكامل مع أنظمتك",
          desc: "Google Sheets, CRM, وأنظمة الحجز — كله متربط مع بعض.",
        },
        {
          title: "تشغيل في يوم واحد",
          desc: "املأ الفورم، ابعت البيانات، وبوتك جاهز في 24 ساعة.",
        },
      ],
    },
    form: {
      heading: "جهز بياناتك علشان بوتك يبقى جاهز",
      sub: "كل ما البيانات تكون أوضح، البوت بتاعك هيكون أذكى وأدق",
      stepLabel: "خطوة",
      of: "من",
      next: "التالي",
      previous: "السابق",
      submit: "إرسال وفتح واتساب",
      submitting: "جاري الإرسال...",
      planLabel: "الخطة المختارة",
      steps: {
        business: "بيانات نشاطك",
        operations: "ساعات العمل والدفع",
        knowledge: "قاعدة المعرفة",
        behavior: "طريقة الرد",
        review: "مراجعة",
      },
      fields: {
        businessName: "اسم النشاط",
        businessNamePh: "مثال: مطعم الذواق",
        businessType: "نوع النشاط",
        businessTypePh: "مطعم، عيادة، محل ملابس...",
        goal: "الهدف الأساسي للبوت",
        goalPh: "الرد على استفسارات، حجز مواعيد، بيع منتجات...",
        workingHours: "ساعات العمل",
        workingHoursPh: "مثال: 10ص - 12م يوميًا (الجمعة إجازة)",
        location: "العنوان / الموقع",
        locationPh: "مثال: المهندسين، شارع جامعة الدول العربية",
        paymentMethods: "وسائل الدفع المتاحة",
        paymentMethodsHint: "اختار كل وسائل الدفع اللي بتقبلها",
        paymentOptions: {
          cash: "كاش",
          visa: "فيزا / ماستركارد",
          instapay: "InstaPay",
          fawry: "فوري",
          wallet: "محفظة موبايل",
          bank: "تحويل بنكي",
        },
        knowledge: "بيانات قاعدة المعرفة",
        knowledgePh:
          "اكتب أي معلومات عن نشاطك — خدمات، عروض، عناوين فروع، روابط مواقع، تفاصيل تواصل...",
        policy: "سياسات النشاط (إلغاء / استرجاع / حجز)",
        policyPh: "مثال: الإلغاء قبل ساعة من الموعد مجاني، بعد كده 50% خصم...",
        productsServices: "المنتجات / الخدمات",
        productsServicesHint:
          "اكتب أهم المنتجات أو الخدمات اللي بتقدمها بسعرها — البوت هيستخدمها في الرد",
        productAdd: "+ إضافة منتج / خدمة",
        productName: "الاسم",
        productNamePh: "مثال: بيتزا مارجريتا",
        productPrice: "السعر",
        productPricePh: "مثال: 150 جنيه",
        productDesc: "وصف مختصر",
        productDescPh: "مكونات، أحجام، تفاصيل إضافية...",
        remove: "حذف",
        files: "ارفع ملفات (PDF, Word) — اختياري",
        filesHint: "هنستخرج النص من الملفات أوتوماتيك ونضيفه لقاعدة المعرفة",
        extracting: "جاري استخراج النص...",
        extracted: "تم استخراج النص",
        tone: "نبرة الكلام",
        toneOptions: {
          formal: "رسمي",
          friendly: "ودود",
          egyptian: "مصري عامي",
        },
        fallback: "لو البوت معرفش الإجابة، يعمل إيه؟",
        fallbackOptions: {
          handover: "تحويل لموظف بشري",
          collect: "ياخد رقم العميل ويتواصل لاحقًا",
          apologize: "يعتذر بأدب",
        },
        contact: "رقم التواصل الأساسي",
        contactPh: "+20 1XX XXX XXXX",
      },
      preview: {
        heading: "كده هيرحب البوت بعملاؤك",
        msg: (name: string) =>
          `أهلاً بيك في ${name || "نشاطك"} 👋 أنا مساعدك الذكي، أقدر أساعدك في إيه النهارده؟`,
      },
      success: {
        heading: "تم استلام بياناتك ✅",
        msg: "هنحولك دلوقتي على واتساب علشان نكمل الدفع والتفعيل.",
      },
      errors: {
        required: "ده حقل مطلوب",
        invalidPhone: "رقم غير صالح",
        submitFailed: "حصل خطأ في الإرسال، حاول تاني",
      },
      whatsapp: (plan: string, id: string) =>
        `أنا مليت الفورم الخاصة بخطة ${plan}، رقم الطلب بتاعي هو ${id}. ابدأ في تشغيل البوت.`,
    },
    footer: {
      tagline: "بوتات واتساب ذكية للأعمال المصرية",
      rights: "جميع الحقوق محفوظة",
    },
  },
  en: {
    direction: "ltr",
    nav: {
      plans: "Plans",
      features: "Features",
      contact: "Contact",
      switchLang: "العربية",
    },
    hero: {
      badge: "AI-powered WhatsApp bots",
      title: "Let an AI bot reply to your customers on WhatsApp",
      subtitle:
        "Complete platform to launch smart customer-support bots on WhatsApp in Egyptian Arabic. Pick a plan, fill the form, go live in minutes.",
      ctaPrimary: "Choose a plan",
      ctaSecondary: "Learn more",
    },
    plans: {
      heading: "Pick the plan that fits your business",
      sub: "All prices in EGP — one-time setup fee + monthly maintenance",
      setupFee: "One-time setup fee",
      monthly: "Monthly maintenance",
      perMonth: "/ month",
      mostPopular: "Most popular",
      choose: "Get started",
      contact: "Contact us",
    },
    features: {
      heading: "Why ArqFlow?",
      items: [
        {
          title: "24/7 instant replies",
          desc: "The bot answers your customers anytime — even while you sleep.",
        },
        {
          title: "Native Egyptian Arabic",
          desc: "Speaks like your customers — not stiff or corporate.",
        },
        {
          title: "Integrates with your stack",
          desc: "Google Sheets, CRM, booking systems — all connected.",
        },
        {
          title: "Live in 24 hours",
          desc: "Fill the form, submit, and your bot is ready within a day.",
        },
      ],
    },
    form: {
      heading: "Tell us about your business",
      sub: "The more detail you give, the smarter and more accurate your bot will be",
      stepLabel: "Step",
      of: "of",
      next: "Next",
      previous: "Back",
      submit: "Submit & open WhatsApp",
      submitting: "Submitting...",
      planLabel: "Selected plan",
      steps: {
        business: "Business info",
        operations: "Hours & payment",
        knowledge: "Knowledge base",
        behavior: "Bot behavior",
        review: "Review",
      },
      fields: {
        businessName: "Business name",
        businessNamePh: "e.g. El Zawaq Restaurant",
        businessType: "Business type",
        businessTypePh: "Restaurant, clinic, clothing store...",
        goal: "Primary goal of the bot",
        goalPh: "Answer FAQs, book appointments, sell products...",
        workingHours: "Working hours",
        workingHoursPh: "e.g. 10am - 12am daily (closed Fri)",
        location: "Address / location",
        locationPh: "e.g. Mohandessin, Arab League Street",
        paymentMethods: "Accepted payment methods",
        paymentMethodsHint: "Select every method you accept",
        paymentOptions: {
          cash: "Cash",
          visa: "Visa / Mastercard",
          instapay: "InstaPay",
          fawry: "Fawry",
          wallet: "Mobile wallet",
          bank: "Bank transfer",
        },
        knowledge: "Knowledge base data",
        knowledgePh:
          "Anything the bot should know — services, offers, branch addresses, website links, contact info...",
        policy: "Business policies (cancellation / return / booking)",
        policyPh: "e.g. Free cancellation up to 1 hour before, then 50% fee...",
        productsServices: "Products / services",
        productsServicesHint:
          "List your main products or services with prices — the bot will use them when answering",
        productAdd: "+ Add product / service",
        productName: "Name",
        productNamePh: "e.g. Margherita Pizza",
        productPrice: "Price",
        productPricePh: "e.g. 150 EGP",
        productDesc: "Short description",
        productDescPh: "Ingredients, sizes, extra details...",
        remove: "Remove",
        files: "Upload files (PDF, Word) — optional",
        filesHint:
          "We'll auto-extract the text from your files and add it to the knowledge base",
        extracting: "Extracting text...",
        extracted: "Text extracted",
        tone: "Tone of voice",
        toneOptions: {
          formal: "Formal",
          friendly: "Friendly",
          egyptian: "Egyptian Arabic",
        },
        fallback: "If the bot doesn't know the answer, what should it do?",
        fallbackOptions: {
          handover: "Hand over to a human",
          collect: "Take the customer's number for follow-up",
          apologize: "Politely apologize",
        },
        contact: "Primary contact number",
        contactPh: "+20 1XX XXX XXXX",
      },
      preview: {
        heading: "This is how the bot will greet your customers",
        msg: (name: string) =>
          `Welcome to ${name || "your business"} 👋 I'm your AI assistant — how can I help you today?`,
      },
      success: {
        heading: "Submitted ✅",
        msg: "We're redirecting you to WhatsApp now to finalize payment and activation.",
      },
      errors: {
        required: "This field is required",
        invalidPhone: "Invalid phone number",
        submitFailed: "Submission failed — please try again",
      },
      whatsapp: (plan: string, id: string) =>
        `Hi! I filled the form for the ${plan} plan. My order ID is ${id}. Please start activating the bot.`,
    },
    footer: {
      tagline: "Smart WhatsApp bots for Egyptian businesses",
      rights: "All rights reserved",
    },
  },
};

export type Translations = Dict;
