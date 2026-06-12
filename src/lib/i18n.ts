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
      payment: string;
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
      files: string;
      filesHint: string;
      extracting: string;
      extracted: string;
      tone: string;
      toneOptions: { formal: string; friendly: string; professional: string };
      contact: string;
      contactHint: string;
      contactPh: string;
    };
    preview: {
      heading: string;
      msg: (name: string, tone: "formal" | "friendly" | "professional") => string;
    };
    payment: {
      heading: string;
      sub: string;
      amountLabel: string;
      breakdown: (setup: number, monthly: number) => string;
      methodLabel: string;
      transferTo: string;
      copy: string;
      copied: string;
      txnLabel: string;
      txnPh: string;
      txnHint: string;
      screenshotLabel: string;
      screenshotHint: string;
      screenshotChosen: string;
      changeFile: string;
      confirm: string;
      confirming: string;
      errors: {
        method: string;
        txnRequired: string;
        txnLength: string;
        screenshot: string;
        screenshotType: string;
      };
    };
    success: {
      heading: string;
      msg: string;
      orderIdLabel: string;
      whatsappBtn: string;
    };
    errors: { required: string; invalidPhone: string; submitFailed: string };
    whatsapp: (plan: string, id: string) => string;
    whatsappPaid: (plan: string, id: string) => string;
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
        payment: "الدفع",
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
          "اكتب أي معلومات عن نشاطك — خدمات، عروض، أسعار، عناوين فروع، روابط مواقع، تفاصيل تواصل...",
        policy: "سياسات النشاط (إلغاء / استرجاع / حجز)",
        policyPh: "مثال: الإلغاء قبل ساعة من الموعد مجاني، بعد كده 50% خصم...",
        files: "ارفع ملفات (PDF, Word) — اختياري",
        filesHint: "هنستخرج النص من الملفات أوتوماتيك ونضيفه لقاعدة المعرفة",
        extracting: "جاري استخراج النص...",
        extracted: "تم استخراج النص",
        tone: "نبرة الكلام",
        toneOptions: {
          formal: "رسمي",
          friendly: "ودود",
          professional: "احترافي",
        },
        contact: "رقم التواصل الأساسي (الرقم اللي البوت هيرد منه)",
        contactHint: "ابدأ برمز الدولة بدون + (مثال: 20 لمصر) — أرقام فقط",
        contactPh: "201090220773",
      },
      preview: {
        heading: "كده هيرحب البوت بعملاؤك",
        msg: (name: string, tone: "formal" | "friendly" | "professional") => {
          const biz = name || "نشاطك";
          if (tone === "formal")
            return `مرحبًا بكم في ${biz}. كيف يمكننا خدمتكم اليوم؟`;
          if (tone === "professional")
            return `أهلًا بحضرتك في ${biz}. حضرتك محتاج أي خدمة؟ هساعدك على طول.`;
          return `أهلاً بيك في ${biz} 👋 إيه اللي أقدر أساعدك بيه النهارده؟`;
        },
      },
      payment: {
        heading: "تأكيد الدفع",
        sub: "حول المبلغ على إحدى الوسيلتين، وادخل رقم العملية وارفع سكرين شوت للتحويل",
        amountLabel: "المبلغ المطلوب",
        breakdown: (setup: number, monthly: number) =>
          `رسوم إعداد ${setup.toLocaleString("ar-EG")} + شهر صيانة ${monthly.toLocaleString("ar-EG")}`,
        methodLabel: "اختار طريقة التحويل",
        transferTo: "حوّل على الرقم",
        copy: "نسخ",
        copied: "تم النسخ ✓",
        txnLabel: "رقم العملية (12 رقم)",
        txnPh: "مثال: 123456789012",
        txnHint: "هتلاقي الرقم في رسالة تأكيد التحويل من التطبيق",
        screenshotLabel: "سكرين شوت التحويل",
        screenshotHint: "صورة توضح المبلغ ورقم العملية والتاريخ",
        screenshotChosen: "تم اختيار الصورة",
        changeFile: "تغيير",
        confirm: "إرسال وتأكيد الدفع",
        confirming: "جاري التأكيد...",
        errors: {
          method: "اختار طريقة الدفع",
          txnRequired: "ادخل رقم العملية",
          txnLength: "رقم العملية لازم يكون 12 رقم بالظبط",
          screenshot: "ارفع سكرين شوت التحويل",
          screenshotType: "الملف لازم يكون صورة",
        },
      },
      success: {
        heading: "تم تقديم طلبك بنجاح ✅",
        msg: "هنراجع البيانات والدفع ونبدأ في تشغيل البوت. سجل رقم الطلب اللي تحت وتواصل معانا على واتساب لتأكيد بدء التشغيل.",
        orderIdLabel: "رقم الطلب",
        whatsappBtn: "تواصل معانا على واتساب",
      },
      errors: {
        required: "ده حقل مطلوب",
        invalidPhone: "رقم غير صالح",
        submitFailed: "حصل خطأ في الإرسال، حاول تاني",
      },
      whatsapp: (plan: string, id: string) =>
        `أنا مليت الفورم الخاصة بخطة ${plan}، رقم الطلب بتاعي هو ${id}. ابدأ في تشغيل البوت.`,
      whatsappPaid: (plan: string, id: string) =>
        `أنا مليت الفورم الخاصة بالخطة ${plan} ورقم الطلب بتاعي ${id} ودفعت المبلغ. ابدأ في تشغيل البوت`,
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
        payment: "Payment",
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
          "Anything the bot should know — services, offers, prices, branch addresses, website links, contact info...",
        policy: "Business policies (cancellation / return / booking)",
        policyPh: "e.g. Free cancellation up to 1 hour before, then 50% fee...",
        files: "Upload files (PDF, Word) — optional",
        filesHint:
          "We'll auto-extract the text from your files and add it to the knowledge base",
        extracting: "Extracting text...",
        extracted: "Text extracted",
        tone: "Tone of voice",
        toneOptions: {
          formal: "Formal",
          friendly: "Friendly",
          professional: "Professional",
        },
        contact: "Primary contact number (the number the bot replies from)",
        contactHint:
          "Start with the country code without + (e.g. 20 for Egypt) — digits only",
        contactPh: "201090220773",
      },
      preview: {
        heading: "This is how the bot will greet your customers",
        msg: (name: string, tone: "formal" | "friendly" | "professional") => {
          const biz = name || "your business";
          if (tone === "formal")
            return `Welcome to ${biz}. How may we assist you today?`;
          if (tone === "professional")
            return `Hello and welcome to ${biz}. How can I help you today?`;
          return `Hey 👋 welcome to ${biz}! What can I help you with?`;
        },
      },
      payment: {
        heading: "Confirm your payment",
        sub: "Transfer the amount via one of the methods below, then enter the transaction ID and upload a screenshot.",
        amountLabel: "Amount due",
        breakdown: (setup: number, monthly: number) =>
          `Setup ${setup.toLocaleString("en-US")} + 1st month ${monthly.toLocaleString("en-US")}`,
        methodLabel: "Choose a transfer method",
        transferTo: "Transfer to",
        copy: "Copy",
        copied: "Copied ✓",
        txnLabel: "Transaction ID (12 digits)",
        txnPh: "e.g. 123456789012",
        txnHint: "You'll find it in the confirmation SMS / app message",
        screenshotLabel: "Transfer screenshot",
        screenshotHint: "An image showing the amount, transaction ID, and date",
        screenshotChosen: "Image selected",
        changeFile: "Change",
        confirm: "Submit & confirm payment",
        confirming: "Confirming...",
        errors: {
          method: "Please choose a payment method",
          txnRequired: "Enter the transaction ID",
          txnLength: "Transaction ID must be exactly 12 digits",
          screenshot: "Please upload the transfer screenshot",
          screenshotType: "File must be an image",
        },
      },
      success: {
        heading: "Order submitted ✅",
        msg: "We'll review the details and payment, then start activating your bot. Save your order ID below and reach out on WhatsApp to confirm activation.",
        orderIdLabel: "Order ID",
        whatsappBtn: "Contact us on WhatsApp",
      },
      errors: {
        required: "This field is required",
        invalidPhone: "Invalid phone number",
        submitFailed: "Submission failed — please try again",
      },
      whatsapp: (plan: string, id: string) =>
        `Hi! I filled the form for the ${plan} plan. My order ID is ${id}. Please start activating the bot.`,
      whatsappPaid: (plan: string, id: string) =>
        `Hi! I filled the form for the ${plan} plan, my order ID is ${id}, and I've paid the amount. Please start activating the bot.`,
    },
    footer: {
      tagline: "Smart WhatsApp bots for Egyptian businesses",
      rights: "All rights reserved",
    },
  },
};

export type Translations = Dict;
