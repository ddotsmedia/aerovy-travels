/**
 * Curated Phase-1 seed data for Aerovy Travels.
 * Hand-authored; images are stable Unsplash URLs (allowed by next.config).
 *
 * To add an experience: append to `experiences`. The seed runner wires
 * category + variants + schedules + images via upsert, so re-running is safe.
 */

export type SeedCategory = {
  slug: string;
  nameEn: string;
  nameAr: string;
};

export type SeedVariant = {
  nameEn: string;
  nameAr: string;
  basePriceAED: number;
  maxPax: number;
  includes: string[];
};

export type SeedImage = {
  url: string;
  altEn: string;
  altAr: string;
};

export type SeedExperience = {
  slug: string;
  categorySlug: string;
  titleEn: string;
  titleAr: string;
  summaryEn: string;
  summaryAr: string;
  descriptionEn: string;
  descriptionAr: string;
  durationMinutes: number;
  location: string;
  featured: boolean;
  images: SeedImage[];
  variants: SeedVariant[];
};

export const categories: SeedCategory[] = [
  { slug: "cultural", nameEn: "Cultural & Heritage", nameAr: "الثقافة والتراث" },
  { slug: "desert", nameEn: "Desert & Adventure", nameAr: "الصحراء والمغامرة" },
  { slug: "theme-parks", nameEn: "Theme Parks & Family", nameAr: "الحدائق الترفيهية والعائلة" },
  { slug: "nature", nameEn: "Nature & Outdoor", nameAr: "الطبيعة والهواء الطلق" },
  { slug: "dining", nameEn: "Dining & Nightlife", nameAr: "المطاعم والحياة الليلية" },
  { slug: "tours", nameEn: "City Tours & Transfers", nameAr: "جولات المدينة والتنقلات" },
];

// Image helper: Unsplash Source returns a stable image for a query + seed.
const img = (query: string, seed: string) =>
  `https://images.unsplash.com/photo-${seed}?auto=format&fit=crop&w=1600&q=80&sig=${encodeURIComponent(query)}`;

export const experiences: SeedExperience[] = [
  // ─── Cultural ───────────────────────────────────────────────
  {
    slug: "sheikh-zayed-grand-mosque-guided-tour",
    categorySlug: "cultural",
    titleEn: "Sheikh Zayed Grand Mosque Guided Tour",
    titleAr: "جولة إرشادية في جامع الشيخ زايد الكبير",
    summaryEn:
      "Walk the white-marble courtyards of Abu Dhabi's most iconic landmark with a knowledgeable local guide.",
    summaryAr: "تجوّل في الأروقة الرخامية البيضاء لأبرز معالم أبوظبي مع دليل محلي خبير.",
    descriptionEn:
      "Join a 90-minute expert-led tour of Sheikh Zayed Grand Mosque — 82 domes, the world's largest hand-knotted carpet, seven imported chandeliers, and reflective pools that mirror the evening light. Dress code provided on arrival; photography inside the main prayer hall is permitted outside of prayer times.\n\nIdeal as a first-morning experience or a cool evening visit. Private-car transfers from any Abu Dhabi hotel can be added at checkout.",
    descriptionAr:
      "انضم إلى جولة بصحبة خبير لمدة 90 دقيقة في جامع الشيخ زايد الكبير — 82 قبة، أكبر سجادة منسوجة يدوياً في العالم، سبع ثريات مستوردة، وبرك عاكسة تعكس ضوء المساء. يتم توفير الزي المناسب عند الوصول؛ يُسمح بالتصوير داخل قاعة الصلاة الرئيسية خارج أوقات الصلاة.\n\nمثالي كتجربة في الصباح الباكر أو زيارة مسائية. يمكن إضافة خدمة النقل الخاص من أي فندق في أبوظبي عند الدفع.",
    durationMinutes: 90,
    location: "Sheikh Zayed Grand Mosque, Abu Dhabi",
    featured: true,
    images: [
      {
        url: img("grand-mosque-dome", "1518684079-3c830dcef090"),
        altEn: "Main dome of Sheikh Zayed Grand Mosque at dusk",
        altAr: "القبة الرئيسية لجامع الشيخ زايد الكبير عند الغسق",
      },
      {
        url: img("grand-mosque-courtyard", "1512453979798-5ea266f8880c"),
        altEn: "White-marble courtyard with reflective pools",
        altAr: "فناء من الرخام الأبيض مع برك عاكسة",
      },
      {
        url: img("grand-mosque-hall", "1591779051696-1c3fa1469a79"),
        altEn: "Interior prayer hall with chandelier",
        altAr: "قاعة الصلاة الداخلية مع الثريا",
      },
    ],
    variants: [
      {
        nameEn: "Small-group walking tour",
        nameAr: "جولة سير ضمن مجموعة صغيرة",
        basePriceAED: 125,
        maxPax: 12,
        includes: ["Licensed guide", "Entry fee", "Dress code robe"],
      },
      {
        nameEn: "Private tour with hotel pickup",
        nameAr: "جولة خاصة مع خدمة الاستقبال من الفندق",
        basePriceAED: 420,
        maxPax: 4,
        includes: ["Licensed guide", "Entry fee", "Dress code robe", "Private car transfers"],
      },
    ],
  },
  {
    slug: "louvre-abu-dhabi-curators-tour",
    categorySlug: "cultural",
    titleEn: "Louvre Abu Dhabi — Curator's Timed Entry",
    titleAr: "اللوفر أبوظبي — دخول موقت بصحبة أمناء المتحف",
    summaryEn:
      "Skip the line and walk the domed galleries with a curator who picks the 10 works you shouldn't miss.",
    summaryAr:
      "تخطّ الطابور وتجوّل في الأجنحة المقببة مع أمين متحف يختار أهم 10 أعمال لا يجب تفويتها.",
    descriptionEn:
      "Jean Nouvel's silver-dome masterpiece on Saadiyat Island holds 600 works spanning 9,000 years — from a 2,400-year-old gold bracelet to canvases by Van Gogh and Monet. This two-hour curator-led walk tells the story of human creativity across cultures, with priority entry and access to rotating special exhibitions.",
    descriptionAr:
      "تحفة جان نوفيل ذات القبة الفضية في جزيرة السعديات تحتضن 600 عمل تمتد عبر 9,000 عام — من سوار ذهبي يعود إلى 2,400 عام إلى لوحات فان جوخ ومونيه. تروي هذه الجولة التي يقودها أمين المتحف لمدة ساعتين قصة الإبداع البشري عبر الثقافات، مع الدخول بأولوية والوصول إلى المعارض الخاصة المتغيرة.",
    durationMinutes: 120,
    location: "Louvre Abu Dhabi, Saadiyat Island",
    featured: true,
    images: [
      {
        url: img("louvre-dome", "1583265266-66a988e63d0c"),
        altEn: "Louvre Abu Dhabi perforated dome from below",
        altAr: "قبة اللوفر أبوظبي المثقبة من الأسفل",
      },
      {
        url: img("louvre-hall", "1531816458010-fb7685eecbcb"),
        altEn: "Gallery hall with ancient sculptures",
        altAr: "قاعة المعرض مع منحوتات قديمة",
      },
      {
        url: img("louvre-water", "1564510667-55ffe8fd6c1f"),
        altEn: "Reflective water pools around the museum",
        altAr: "برك مياه عاكسة حول المتحف",
      },
    ],
    variants: [
      {
        nameEn: "Timed entry with audio guide",
        nameAr: "دخول موقت مع دليل صوتي",
        basePriceAED: 95,
        maxPax: 10,
        includes: ["Timed entry ticket", "Multilingual audio guide"],
      },
      {
        nameEn: "Curator-led 10-works tour",
        nameAr: "جولة أمين المتحف لعشرة أعمال",
        basePriceAED: 240,
        maxPax: 8,
        includes: ["Priority entry", "Expert curator", "Special exhibition access"],
      },
    ],
  },
  {
    slug: "qasr-al-watan-palace-tour",
    categorySlug: "cultural",
    titleEn: "Qasr Al Watan Presidential Palace Tour",
    titleAr: "جولة في قصر الوطن الرئاسي",
    summaryEn:
      "Step inside the UAE's working presidential palace and the Great Hall's 37-meter dome.",
    summaryAr:
      "ادخل إلى القصر الرئاسي العامل لدولة الإمارات وقبة القاعة الكبرى التي يبلغ ارتفاعها 37 متراً.",
    descriptionEn:
      "Qasr Al Watan is part museum, part working palace of state. The self-guided route covers the Great Hall, the House of Knowledge (with one of the oldest surviving Qur'an manuscripts), the Presidential Gifts Gallery, and the Spirit of Collaboration — the round table where Gulf heads of state meet. Evening tickets include the Palace in Motion light-and-sound projection on the facade.",
    descriptionAr:
      "قصر الوطن هو متحفٌ وقصرٌ رئاسي عامل. يغطي المسار الذاتي القاعة الكبرى، ودار المعرفة (مع إحدى أقدم مخطوطات القرآن الباقية)، ومعرض الهدايا الرئاسية، وطاولة روح التعاون — الطاولة المستديرة التي يلتقي عندها قادة دول الخليج. تشمل تذاكر المساء عرض الصوت والضوء على واجهة القصر.",
    durationMinutes: 150,
    location: "Qasr Al Watan, Abu Dhabi",
    featured: false,
    images: [
      {
        url: img("qasr-al-watan-facade", "1582719471384-894fbb16e074"),
        altEn: "White facade of Qasr Al Watan",
        altAr: "الواجهة البيضاء لقصر الوطن",
      },
      {
        url: img("qasr-dome", "1568837626025-7c4b74cfb1c4"),
        altEn: "Great Hall ornate dome interior",
        altAr: "القبة الداخلية المزخرفة للقاعة الكبرى",
      },
      {
        url: img("palace-garden", "1518998053901-5348d3961a04"),
        altEn: "Palace gardens at sunset",
        altAr: "حدائق القصر عند الغروب",
      },
    ],
    variants: [
      {
        nameEn: "Day ticket — self-guided",
        nameAr: "تذكرة نهارية — جولة ذاتية",
        basePriceAED: 65,
        maxPax: 20,
        includes: ["All galleries", "Audio guide app"],
      },
      {
        nameEn: "Evening ticket with Palace in Motion",
        nameAr: "تذكرة مسائية مع عرض القصر المتحرك",
        basePriceAED: 95,
        maxPax: 20,
        includes: ["All galleries", "Audio guide app", "Palace in Motion show"],
      },
    ],
  },
  {
    slug: "heritage-village-evening",
    categorySlug: "cultural",
    titleEn: "Heritage Village Evening with Traditional Arts",
    titleAr: "أمسية في القرية التراثية مع الفنون التقليدية",
    summaryEn:
      "Watch pearl-diving, weaving, and pottery demonstrations along the Corniche breakwater.",
    summaryAr: "شاهد عروض الغوص على اللؤلؤ والنسج والخزف على طول كاسر أمواج الكورنيش.",
    descriptionEn:
      "A reconstructed Bedouin encampment with functioning date-syrup mills, a replica falaj irrigation channel, and craftspeople who will show you how Emirati households looked before oil. Arrive before sunset; leave with a hand-painted terracotta souvenir included in the ticket.",
    descriptionAr:
      "مخيم بدوي معاد بناؤه مع مطاحن عاملة لدبس التمر، وقناة فلج للري طبق الأصل، وحرفيون يعرضون عليك كيف كانت البيوت الإماراتية قبل النفط. احضر قبل غروب الشمس؛ واحصل على تذكار من الفخار المدهون يدوياً مشمول بسعر التذكرة.",
    durationMinutes: 120,
    location: "Heritage Village, Corniche Breakwater",
    featured: false,
    images: [
      {
        url: img("heritage-pottery", "1580894732444-8ecded7900cd"),
        altEn: "Potter shaping clay on a wheel",
        altAr: "خزاف يشكّل الطين على العجلة",
      },
      {
        url: img("heritage-tent", "1514890547357-a9ee288728e0"),
        altEn: "Traditional Bedouin tent at dusk",
        altAr: "خيمة بدوية تقليدية عند الغسق",
      },
      {
        url: img("heritage-market", "1504674900247-0877df9cc836"),
        altEn: "Traditional market stalls with textiles",
        altAr: "أكشاك السوق التقليدي بالأقمشة",
      },
    ],
    variants: [
      {
        nameEn: "General admission",
        nameAr: "الدخول العام",
        basePriceAED: 35,
        maxPax: 30,
        includes: ["Entry", "Craft demonstration", "Terracotta souvenir"],
      },
    ],
  },
  {
    slug: "al-ain-oasis-day-trip",
    categorySlug: "cultural",
    titleEn: "Al Ain Oasis & Jahili Fort Day Trip",
    titleAr: "رحلة يومية إلى واحة العين وحصن الجاهلي",
    summaryEn:
      "UNESCO-listed palm oasis, ancient falaj water channels, and the mud-brick fort Lawrence of Arabia lived in.",
    summaryAr:
      "واحة النخيل المدرجة في اليونسكو، وقنوات الفلج القديمة، وحصن طيني أقام فيه لورنس العرب.",
    descriptionEn:
      "Drive inland to Al Ain — the 'Garden City' — across the Jebel Hafeet foothills. You'll walk the 1,200 hectares of UNESCO-listed date palm oasis still irrigated by a 3,000-year-old falaj system, then tour Jahili Fort, once home to Wilfred Thesiger during his Empty Quarter crossings. Buffet lunch at a shaded majlis is included.",
    descriptionAr:
      "انطلق إلى داخل البلاد باتجاه العين — 'مدينة الحدائق' — عبر سفوح جبل حفيت. ستمشي في 1200 هكتار من واحة النخيل المدرجة في اليونسكو والتي لا تزال تُروى بنظام فلج عمره 3000 عام، ثم تتجول في حصن الجاهلي، الذي كان في وقت ما منزل ويلفرد ثيسيجر خلال رحلاته في الربع الخالي. وجبة غداء من البوفيه في مجلس مظلل مشمولة.",
    durationMinutes: 540,
    location: "Al Ain (2h drive from Abu Dhabi)",
    featured: false,
    images: [
      {
        url: img("al-ain-oasis", "1528702748617-c64d49f918af"),
        altEn: "Date palms in Al Ain Oasis",
        altAr: "أشجار النخيل في واحة العين",
      },
      {
        url: img("al-ain-fort", "1589308078054-832dc03b84cf"),
        altEn: "Mud-brick watchtower of Jahili Fort",
        altAr: "برج المراقبة الطيني لحصن الجاهلي",
      },
      {
        url: img("al-ain-falaj", "1566150905458-1bf1fc113f0d"),
        altEn: "Falaj irrigation channel cutting through the oasis",
        altAr: "قناة الفلج للري تشق الواحة",
      },
    ],
    variants: [
      {
        nameEn: "Shared coach tour",
        nameAr: "جولة بحافلة مشتركة",
        basePriceAED: 285,
        maxPax: 16,
        includes: ["Hotel pickup", "English guide", "Fort entry", "Buffet lunch"],
      },
      {
        nameEn: "Private SUV with dedicated guide",
        nameAr: "سيارة دفع رباعي خاصة مع دليل مخصص",
        basePriceAED: 1450,
        maxPax: 4,
        includes: ["Hotel pickup", "Private Arabic/English guide", "Fort entry", "Lunch at majlis"],
      },
    ],
  },

  // ─── Desert ─────────────────────────────────────────────────
  {
    slug: "liwa-desert-overnight-safari",
    categorySlug: "desert",
    titleEn: "Liwa Desert Overnight Safari",
    titleAr: "رحلة سفاري ليلية إلى صحراء ليوا",
    summaryEn:
      "Sleep under the stars at the edge of the Empty Quarter after dune bashing the world's tallest dunes.",
    summaryAr: "نَم تحت النجوم على حافة الربع الخالي بعد التزلج على أعلى كثبان العالم.",
    descriptionEn:
      "Liwa's Moreeb Dune rises 300 meters — the highest drivable dune on earth. We'll run a 4x4 convoy up it at sunset, roll down the face, and settle into a Bedouin camp with traditional oud music, a whole-lamb mandi dinner, and private goat-hair tents. Breakfast at sunrise with optional camel trek across the crescent dunes.",
    descriptionAr:
      "تبلغ كثبان مريب في ليوا 300 متر — أعلى كثيب يمكن قيادته على الأرض. سنقود قافلة من الدفع الرباعي إلى أعلاه عند غروب الشمس، نتزلج على وجهه، ثم نستقر في مخيم بدوي مع موسيقى العود التقليدية، وعشاء مندي بخروف كامل، وخيام خاصة من شعر الماعز. إفطار عند شروق الشمس مع رحلة اختيارية على الجمال عبر الكثبان الهلالية.",
    durationMinutes: 1080,
    location: "Liwa Oasis (2.5h from Abu Dhabi)",
    featured: true,
    images: [
      {
        url: img("liwa-dune", "1519046904884-53103b34b206"),
        altEn: "Orange crescent dunes at sunset",
        altAr: "كثبان برتقالية هلالية عند الغروب",
      },
      {
        url: img("desert-camp", "1489493512598-d08130f49bea"),
        altEn: "Bedouin camp with lit tents",
        altAr: "مخيم بدوي بخيام مضاءة",
      },
      {
        url: img("camel-dawn", "1512917774080-9991f1c4c750"),
        altEn: "Camels at dawn on dune ridge",
        altAr: "جِمال عند الفجر على حافة الكثيب",
      },
    ],
    variants: [
      {
        nameEn: "Shared camp experience",
        nameAr: "تجربة المخيم المشترك",
        basePriceAED: 850,
        maxPax: 12,
        includes: ["4x4 dune bashing", "Dinner", "Overnight tent", "Breakfast"],
      },
      {
        nameEn: "Private bubble tent with stargazing",
        nameAr: "خيمة فقاعية خاصة مع مراقبة النجوم",
        basePriceAED: 2200,
        maxPax: 2,
        includes: [
          "4x4 dune bashing",
          "Private chef's dinner",
          "Transparent stargazing tent",
          "Breakfast",
        ],
      },
    ],
  },
  {
    slug: "evening-dune-bashing-bbq",
    categorySlug: "desert",
    titleEn: "Evening Dune Bashing & Desert BBQ",
    titleAr: "تزلج على الكثبان ومشاوي صحراوية مسائية",
    summaryEn: "Classic half-day safari: 4x4 thrills, camel ride, henna, and a grilled dinner.",
    summaryAr: "سفاري نصف يوم كلاسيكي: مغامرات الدفع الرباعي، ركوب الجمل، الحناء، وعشاء مشوي.",
    descriptionEn:
      "A perfect intro to the desert if Liwa feels too far. 45 minutes of dune bashing in a Land Cruiser, then into camp for camel rides, sandboarding, traditional dress photo-ops, shisha, and a grilled dinner under fairy lights. Back at your hotel by 10pm.",
    descriptionAr:
      "مقدّمة مثالية للصحراء إذا كانت ليوا بعيدة. 45 دقيقة من التزلج بالسيارات عبر الكثبان في لاند كروزر، ثم إلى المخيم لركوب الجمال والتزلج الرملي وجلسات التصوير باللباس التقليدي والشيشة وعشاء مشوي تحت الأضواء المعلقة. والعودة إلى فندقك بحلول الساعة 10 مساءً.",
    durationMinutes: 360,
    location: "Al Khatim Desert (45min from Abu Dhabi)",
    featured: true,
    images: [
      {
        url: img("dune-bashing", "1451337516015-6b6e9a44a8a3"),
        altEn: "Land Cruiser cresting a dune",
        altAr: "سيارة لاند كروزر تتسلق كثيب",
      },
      {
        url: img("camp-night", "1504851149312-7a075b496cc7"),
        altEn: "Desert camp at night with bonfire",
        altAr: "مخيم صحراوي ليلاً مع نار المخيم",
      },
      {
        url: img("camel-ride", "1483137140003-ae073b395549"),
        altEn: "Tourist riding a camel at sunset",
        altAr: "سائح يركب جملاً عند الغروب",
      },
    ],
    variants: [
      {
        nameEn: "Shared 4x4",
        nameAr: "دفع رباعي مشترك",
        basePriceAED: 275,
        maxPax: 6,
        includes: ["Hotel pickup", "Dune bashing", "Camel ride", "BBQ dinner"],
      },
      {
        nameEn: "Private Land Cruiser + VIP camp",
        nameAr: "لاند كروزر خاصة ومخيم VIP",
        basePriceAED: 1150,
        maxPax: 6,
        includes: ["Hotel pickup", "Private 4x4", "VIP seating", "Premium BBQ"],
      },
    ],
  },
  {
    slug: "morning-dune-buggy",
    categorySlug: "desert",
    titleEn: "Morning Dune Buggy Adventure",
    titleAr: "مغامرة عربة الكثبان الصباحية",
    summaryEn: "Drive your own 1,000cc dune buggy across the red desert before the heat peaks.",
    summaryAr: "قُد عربة الكثبان 1000 سي سي بنفسك عبر الصحراء الحمراء قبل أن تشتد الحرارة.",
    descriptionEn:
      "Two hours behind the wheel of a two-seater Polaris RZR. Full safety briefing, helmets and goggles supplied, lead and sweep guides in separate buggies. Route follows a ridge of crescent dunes, with a coffee break at a lookout. Min age 18 to drive; 12 to ride.",
    descriptionAr:
      "ساعتان خلف مقود عربة بوليس RZR بمقعدين. إحاطة أمان كاملة، مع توفير الخوذ والنظارات، وأدلة قيادة في عربات منفصلة. يتبع المسار سلسلة من الكثبان الهلالية، مع استراحة قهوة عند نقطة مراقبة. الحد الأدنى للقيادة 18 عاماً؛ و12 عاماً للركوب.",
    durationMinutes: 180,
    location: "Al Khatim Desert",
    featured: false,
    images: [
      {
        url: img("dune-buggy", "1541899478920-acb107c5ed8e"),
        altEn: "Two-seater dune buggy kicking up sand",
        altAr: "عربة كثبان بمقعدين تثير الرمال",
      },
      {
        url: img("desert-ridge", "1508264165352-258db2ebd59b"),
        altEn: "Rider on dune ridge at sunrise",
        altAr: "راكب على حافة الكثيب عند شروق الشمس",
      },
      {
        url: img("rzr-group", "1470071459604-3b5ec3a7fe05"),
        altEn: "Group of buggies parked at a lookout",
        altAr: "مجموعة من العربات متوقفة عند نقطة مراقبة",
      },
    ],
    variants: [
      {
        nameEn: "Two-seater buggy",
        nameAr: "عربة بمقعدين",
        basePriceAED: 895,
        maxPax: 2,
        includes: ["2h rental", "Safety gear", "Lead guide", "Refreshments"],
      },
      {
        nameEn: "Four-seater buggy (family)",
        nameAr: "عربة بأربعة مقاعد (عائلية)",
        basePriceAED: 1390,
        maxPax: 4,
        includes: ["2h rental", "Safety gear for all", "Lead guide", "Refreshments"],
      },
    ],
  },
  {
    slug: "sunrise-hot-air-balloon",
    categorySlug: "desert",
    titleEn: "Sunrise Hot Air Balloon over the Dunes",
    titleAr: "منطاد هواء ساخن عند الشروق فوق الكثبان",
    summaryEn:
      "A silent hour over the red desert, chasing the sunrise with falcon-eye views of Liwa's dunes.",
    summaryAr: "ساعة صامتة فوق الصحراء الحمراء، نطارد شروق الشمس بإطلالات صقرية على كثبان ليوا.",
    descriptionEn:
      "Meet the pilot before dawn, watch the envelope inflate in the cool air, and lift off as the first light hits the dunes. An hour in the basket, a champagne toast at landing, and hotel drop-off by mid-morning.",
    descriptionAr:
      "قابل الطيار قبل الفجر، شاهد المظلة تنتفخ في الهواء البارد، ثم الإقلاع مع أول ضوء يلامس الكثبان. ساعة في السلة، نخب بالشمبانيا عند الهبوط، وعودة إلى الفندق بحلول منتصف الصباح.",
    durationMinutes: 300,
    location: "Al Khatim Desert",
    featured: true,
    images: [
      {
        url: img("balloon-sunrise", "1507003211169-0a1dd7228f2d"),
        altEn: "Hot air balloon above dunes at sunrise",
        altAr: "منطاد هواء ساخن فوق الكثبان عند الشروق",
      },
      {
        url: img("balloon-basket", "1507525428034-b723cf961d3e"),
        altEn: "Basket view over desert floor",
        altAr: "إطلالة من السلة على أرضية الصحراء",
      },
      {
        url: img("balloon-shadow", "1495344517868-8ebaf0a2044a"),
        altEn: "Shadow of balloon on sand",
        altAr: "ظل المنطاد على الرمال",
      },
    ],
    variants: [
      {
        nameEn: "Shared flight",
        nameAr: "رحلة مشتركة",
        basePriceAED: 1395,
        maxPax: 16,
        includes: ["Pre-dawn pickup", "60min flight", "Champagne toast", "Hotel drop"],
      },
      {
        nameEn: "Private basket for two",
        nameAr: "سلة خاصة لشخصين",
        basePriceAED: 5200,
        maxPax: 2,
        includes: ["Private pickup", "60min flight", "Breakfast hamper", "Drop-off"],
      },
    ],
  },
  {
    slug: "falconry-masterclass",
    categorySlug: "desert",
    titleEn: "Falconry Masterclass with a Master Falconer",
    titleAr: "دورة صقارة مع خبير صقّار",
    summaryEn:
      "Handle a saker falcon, learn the UNESCO-listed Emirati sport, and fly one yourself on the lure.",
    summaryAr:
      "امسك صقراً من نوع الصقر الحر، تعلّم الرياضة الإماراتية المدرجة في اليونسكو، وأطلقه بنفسك.",
    descriptionEn:
      "Falconry is woven into Emirati identity — recognized by UNESCO as living heritage. At this working mews outside the city, a master falconer walks you through the tools (glove, hood, lure, perch), the history, and a hands-on flying demonstration. Ends with the legendary falcon hospital visit.",
    descriptionAr:
      "الصقارة منسوجة في الهوية الإماراتية — معترف بها من اليونسكو كتراث حي. في هذه المزرعة خارج المدينة، يأخذك صقّار خبير في جولة حول الأدوات (القفاز، الغطاء، الطعم، المجثم)، والتاريخ، وعرض تحليق عملي. تنتهي بزيارة أسطورية لمستشفى الصقور.",
    durationMinutes: 210,
    location: "Al Forsan Falconry Centre",
    featured: false,
    images: [
      {
        url: img("falcon-hood", "1551085254-e96b210db58a"),
        altEn: "Saker falcon with hood on handler's glove",
        altAr: "صقر حرّ بقبعة على قفاز المربي",
      },
      {
        url: img("falcon-flight", "1506197603052-3cc9c3a201bd"),
        altEn: "Falcon in flight over desert",
        altAr: "صقر يحلق فوق الصحراء",
      },
      {
        url: img("falcon-hospital", "1548391350-968f58dedaed"),
        altEn: "Falcon hospital examination room",
        altAr: "غرفة فحص في مستشفى الصقور",
      },
    ],
    variants: [
      {
        nameEn: "Group session",
        nameAr: "جلسة جماعية",
        basePriceAED: 495,
        maxPax: 8,
        includes: ["2h session", "Hands-on flying", "Hospital visit", "Certificate"],
      },
    ],
  },

  // ─── Theme parks ─────────────────────────────────────────────
  {
    slug: "ferrari-world-all-rides",
    categorySlug: "theme-parks",
    titleEn: "Ferrari World All-Rides Pass",
    titleAr: "بطاقة جميع الألعاب في عالم فيراري",
    summaryEn: "Formula Rossa, the world's fastest roller coaster, plus 39 other rides.",
    summaryAr: "فورمولا روسا، أسرع أفعوانية في العالم، بالإضافة إلى 39 لعبة أخرى.",
    descriptionEn:
      "Formula Rossa hits 240 km/h in under 5 seconds — hold onto the safety goggles. Beyond it, 39 rides spread under the world's largest indoor theme-park roof: Fiorano GT Challenge, Karting Academy, and kid-friendly Bell'Italia mini-tours. One-day unlimited pass.",
    descriptionAr:
      "تصل سرعة فورمولا روسا إلى 240 كم/س في أقل من 5 ثوانٍ — امسك نظارات الأمان. وإلى جانبها، 39 لعبة موزعة تحت أكبر سقف لحديقة ترفيهية داخلية في العالم: فيورانو GT تشالنج، وأكاديمية الكارتينج، وجولات بيل إيتاليا الصغيرة للأطفال. تصريح غير محدود ليوم واحد.",
    durationMinutes: 540,
    location: "Yas Island",
    featured: true,
    images: [
      {
        url: img("ferrari-world-exterior", "1503416997304-7f8bf166c121"),
        altEn: "Red Ferrari World roof from outside",
        altAr: "سقف عالم فيراري الأحمر من الخارج",
      },
      {
        url: img("formula-rossa", "1553440569-bcc63803a83d"),
        altEn: "Formula Rossa roller coaster track",
        altAr: "مسار أفعوانية فورمولا روسا",
      },
      {
        url: img("fiorano-gt", "1597764690472-ec054e34d9b8"),
        altEn: "Fiorano GT car at the start line",
        altAr: "سيارة فيورانو GT عند خط البداية",
      },
    ],
    variants: [
      {
        nameEn: "Single day pass",
        nameAr: "تذكرة يوم واحد",
        basePriceAED: 345,
        maxPax: 20,
        includes: ["All rides", "All shows"],
      },
      {
        nameEn: "2-park combo (+ Yas Waterworld)",
        nameAr: "تذكرة حديقتين (+ ياس ووتروورلد)",
        basePriceAED: 490,
        maxPax: 20,
        includes: ["Ferrari World", "Yas Waterworld", "Inter-park shuttle"],
      },
    ],
  },
  {
    slug: "yas-waterworld-ticket",
    categorySlug: "theme-parks",
    titleEn: "Yas Waterworld Full-Day Ticket",
    titleAr: "تذكرة ياس ووتروورلد ليوم كامل",
    summaryEn: "43 slides, a pearl-diving story, and a six-person tornado slide in the desert.",
    summaryAr: "43 زلاجة، وقصة الغوص على اللؤلؤ، وزلاجة إعصار لستة أشخاص في الصحراء.",
    descriptionEn:
      "Dawwama is the Middle East's first and biggest tornado water slide — six people go up, the funnel goes down. Liwa Loop is a translucent AquaLoop with a trap-door drop. Gentler rivers and kid zones keep families happy for a full day.",
    descriptionAr:
      "دواما هي أول وأكبر زلاجة مياه إعصار في الشرق الأوسط — يصعد ستة أشخاص، وينزل القمع. ليوا لوب هو حلقة مائية شفافة مع باب سقوط. أنهار أكثر لطفاً وأماكن للأطفال تبقي العائلات سعيدة يوماً كاملاً.",
    durationMinutes: 540,
    location: "Yas Island",
    featured: false,
    images: [
      {
        url: img("waterworld", "1519235106638-30b2e99d8b2f"),
        altEn: "Waterpark slides from above",
        altAr: "منزلقات الحديقة المائية من الأعلى",
      },
      {
        url: img("dawwama", "1582719508461-905c673771fd"),
        altEn: "Dawwama tornado slide",
        altAr: "منزلق دواما الإعصاري",
      },
      {
        url: img("lazy-river", "1511316695145-4992006ffddb"),
        altEn: "Lazy river with palm trees",
        altAr: "النهر الكسول مع أشجار النخيل",
      },
    ],
    variants: [
      {
        nameEn: "Day ticket",
        nameAr: "تذكرة نهارية",
        basePriceAED: 255,
        maxPax: 20,
        includes: ["All slides", "All shows", "Towel"],
      },
    ],
  },
  {
    slug: "warner-bros-world",
    categorySlug: "theme-parks",
    titleEn: "Warner Bros. World Indoor Theme Park",
    titleAr: "حديقة وارنر بروس وورلد الترفيهية المغلقة",
    summaryEn: "29 rides across Gotham City, Metropolis, Cartoon Junction — all air-conditioned.",
    summaryAr: "29 لعبة عبر مدينة جوثام وميتروبوليس وكارتون جنكشن — كلها مكيّفة.",
    descriptionEn:
      "The world's first fully-indoor Warner Bros. park. Six themed lands, 29 rides, 3D shows, and character meet-and-greets with Batman, Bugs Bunny, and Scooby-Doo. A cool-weather option on scorching summer days.",
    descriptionAr:
      "أول حديقة مغلقة بالكامل لوارنر بروس في العالم. ست أراضٍ مواضيعية، و29 لعبة، وعروض ثلاثية الأبعاد، ولقاءات مع باتمان، وبوغز باني، وسكوبي دو. خيار ممتاز في أيام الصيف الحارة.",
    durationMinutes: 540,
    location: "Yas Island",
    featured: false,
    images: [
      {
        url: img("warner-gotham", "1509023464722-18d996393ca8"),
        altEn: "Gotham City themed zone",
        altAr: "منطقة مدينة جوثام المخصصة",
      },
      {
        url: img("warner-cartoon", "1514823517-7d0a6abb4f4e"),
        altEn: "Cartoon Junction with Bugs Bunny",
        altAr: "كارتون جنكشن مع بوغز باني",
      },
      {
        url: img("warner-metropolis", "1507919909716-c8262e491cde"),
        altEn: "Superman ride exterior",
        altAr: "واجهة لعبة سوبرمان",
      },
    ],
    variants: [
      {
        nameEn: "Day ticket",
        nameAr: "تذكرة نهارية",
        basePriceAED: 345,
        maxPax: 20,
        includes: ["All rides", "All shows", "Character meets"],
      },
    ],
  },
  {
    slug: "seaworld-abu-dhabi",
    categorySlug: "theme-parks",
    titleEn: "SeaWorld Abu Dhabi Premium Entry",
    titleAr: "دخول مميز إلى سي وورلد أبوظبي",
    summaryEn:
      "Realm of the Abyss, marine research centre, and eight distinct themed worlds on Yas Island.",
    summaryAr: "عالم الهاوية، ومركز الأبحاث البحرية، وثمانية عوالم مواضيعية في جزيرة ياس.",
    descriptionEn:
      "The largest marine-life theme park outside the US. Ride the Manta, watch rescued sea turtles glide through the 58-million-liter main aquarium, and meet researchers at SeaWorld Yas Island's animal research and rescue centre.",
    descriptionAr:
      "أكبر حديقة ترفيهية للحياة البحرية خارج الولايات المتحدة. اركب مانتا، شاهد السلاحف البحرية المُنقَذة تحلق عبر الحوض الرئيسي الذي يتسع لـ 58 مليون لتر، والتقِ بالباحثين في مركز الأبحاث وإنقاذ الحيوانات.",
    durationMinutes: 540,
    location: "Yas Island",
    featured: false,
    images: [
      {
        url: img("seaworld-aquarium", "1567607229-79d1f317eba0"),
        altEn: "Large aquarium tunnel with rays",
        altAr: "نفق حوض كبير مع لافات",
      },
      {
        url: img("seaworld-exterior", "1580519542036-c47de6196ba5"),
        altEn: "SeaWorld Abu Dhabi spherical exterior",
        altAr: "الواجهة الكروية لسي وورلد أبوظبي",
      },
      {
        url: img("seaworld-manta", "1559386484-97dfc0e15539"),
        altEn: "Manta roller coaster over water",
        altAr: "أفعوانية مانتا فوق الماء",
      },
    ],
    variants: [
      {
        nameEn: "Day ticket",
        nameAr: "تذكرة نهارية",
        basePriceAED: 375,
        maxPax: 20,
        includes: ["All zones", "Research centre", "All shows"],
      },
    ],
  },

  // ─── Nature ─────────────────────────────────────────────────
  {
    slug: "mangrove-kayaking",
    categorySlug: "nature",
    titleEn: "Mangrove Kayaking at Jubail Park",
    titleAr: "التجديف في أشجار المانغروف بمنتزه جبيل",
    summaryEn:
      "Paddle transparent kayaks through UNESCO-protected mangroves alongside herons and baby sharks.",
    summaryAr:
      "جدّف في قوارب كاياك شفافة عبر أشجار المانغروف المحمية واليونسكو بجانب مالك الحزين وأسماك القرش الصغيرة.",
    descriptionEn:
      "Jubail Mangrove Park protects 1.8 sq km of tidal mangroves — home to blue herons, flamingos in winter, and juvenile blacktip reef sharks. You'll tour with a marine biologist, paddle through cut channels, and learn how the mangrove roots filter pollutants from the Gulf.",
    descriptionAr:
      "يحمي منتزه جبيل للمانغروف 1.8 كم مربع من غابات المانغروف المديّة — موطن لمالك الحزين الأزرق، والفلامنغو في الشتاء، وصغار أسماك قرش الشعاب المرجانية ذات الطرف الأسود. ستتجول برفقة عالم بحار، وتجدّف عبر قنوات مقطوعة، وتتعلّم كيف تصفي جذور المانغروف الملوثات من مياه الخليج.",
    durationMinutes: 150,
    location: "Jubail Mangrove Park",
    featured: true,
    images: [
      {
        url: img("mangrove-kayak", "1503454537195-1dcabb73ffb9"),
        altEn: "Transparent kayak in mangrove channel",
        altAr: "كاياك شفاف في قناة المانغروف",
      },
      {
        url: img("mangrove-heron", "1518732714860-b62714ce0c59"),
        altEn: "Blue heron on mangrove root",
        altAr: "مالك الحزين الأزرق على جذر المانغروف",
      },
      {
        url: img("mangrove-boardwalk", "1500375592092-40eb2168fd21"),
        altEn: "Boardwalk through mangrove forest",
        altAr: "ممشى خشبي عبر غابة المانغروف",
      },
    ],
    variants: [
      {
        nameEn: "Transparent kayak tour",
        nameAr: "جولة كاياك شفافة",
        basePriceAED: 210,
        maxPax: 10,
        includes: ["Kayak + gear", "Marine biologist guide", "Water"],
      },
      {
        nameEn: "Sunset stand-up paddle",
        nameAr: "تزلج الوقوف عند الغروب",
        basePriceAED: 240,
        maxPax: 6,
        includes: ["SUP board", "Guide", "Sunset timing", "Snacks"],
      },
    ],
  },
  {
    slug: "saadiyat-beach-club-day",
    categorySlug: "nature",
    titleEn: "Saadiyat Beach Club Day Pass",
    titleAr: "تذكرة يوم لنادي شاطئ السعديات",
    summaryEn:
      "The beach where hawksbill turtles nest in April. Sun beds, 50m pool, Mediterranean kitchen.",
    summaryAr:
      "الشاطئ الذي تبني فيه السلاحف منقارية المنقار أعشاشها في أبريل. مقاعد شمسية، ومسبح 50 متر، ومطبخ متوسطي.",
    descriptionEn:
      "Saadiyat Beach is protected nesting ground for hawksbill turtles; if you visit April-June, volunteer marshals will point out the nests at sunset. The club itself has a 50m infinity pool, rentable cabanas, and a Turkish-Greek kitchen by a Michelin-trained chef.",
    descriptionAr:
      "شاطئ السعديات هو منطقة تعشيش محمية للسلاحف منقارية المنقار؛ إذا زرت في الفترة من أبريل إلى يونيو، سيشير لك المراقبون المتطوعون إلى الأعشاش عند الغروب. يحتوي النادي نفسه على مسبح لانهائي بطول 50 متر، وأكواخ للإيجار، ومطبخ تركي-يوناني على يد طاهٍ مدرب لدى ميشلان.",
    durationMinutes: 540,
    location: "Saadiyat Island",
    featured: false,
    images: [
      {
        url: img("saadiyat-beach", "1507525428034-b723cf961d3e"),
        altEn: "Empty white-sand beach with umbrellas",
        altAr: "شاطئ رملي أبيض فارغ مع مظلات",
      },
      {
        url: img("saadiyat-pool", "1501117716987-c8e1ecb210ae"),
        altEn: "Infinity pool facing the Gulf",
        altAr: "مسبح لانهائي يواجه الخليج",
      },
      {
        url: img("turtle-nest", "1562077772-3bd90403f7f0"),
        altEn: "Hawksbill turtle hatchling on sand",
        altAr: "صغير سلحفاة منقارية المنقار على الرمال",
      },
    ],
    variants: [
      {
        nameEn: "Weekday pass",
        nameAr: "تذكرة أيام الأسبوع",
        basePriceAED: 175,
        maxPax: 1,
        includes: ["Sun bed", "Pool access", "Towel", "Welcome drink"],
      },
      {
        nameEn: "Weekend cabana (up to 4)",
        nameAr: "كابانا عطلة نهاية الأسبوع (حتى 4 أشخاص)",
        basePriceAED: 1100,
        maxPax: 4,
        includes: ["Private cabana", "Pool access", "Towels", "Bottle service"],
      },
    ],
  },
  {
    slug: "corniche-sunset-dhow",
    categorySlug: "nature",
    titleEn: "Corniche Sunset Cruise on a Private Dhow",
    titleAr: "رحلة بحرية عند الغروب على سفينة خاصة",
    summaryEn:
      "90 minutes along the Corniche skyline on a restored wooden dhow. Tea, dates, call to prayer.",
    summaryAr: "90 دقيقة على طول واجهة الكورنيش على سفينة خشبية مرممة. شاي، وتمر، وأذان المغرب.",
    descriptionEn:
      "A wooden pearl-diving dhow, polished and electrified, now carries guests past the Presidential Palace, the Etihad Towers, and the Emirates Palace at golden hour. Arabic coffee and dates served on board; coincides with the maghrib call to prayer from the shore mosques.",
    descriptionAr:
      "سفينة خشبية تاريخية للغوص على اللؤلؤ، تم تلميعها وتزويدها بالكهرباء، تنقل الضيوف الآن بمحاذاة قصر الرئاسة، وأبراج الاتحاد، وقصر الإمارات في ساعة ذهبية. تُقدَّم القهوة العربية والتمر على متنها؛ بالتزامن مع أذان المغرب من مساجد الشاطئ.",
    durationMinutes: 90,
    location: "Corniche, Abu Dhabi",
    featured: true,
    images: [
      {
        url: img("dhow-sunset", "1507525428034-b723cf961d3e"),
        altEn: "Wooden dhow on water at sunset",
        altAr: "سفينة خشبية على الماء عند الغروب",
      },
      {
        url: img("corniche-skyline", "1512453979-8ed44d2a3b07"),
        altEn: "Abu Dhabi Corniche skyline",
        altAr: "أفق كورنيش أبوظبي",
      },
      {
        url: img("arabic-coffee", "1504432842672-1a79f78e4084"),
        altEn: "Arabic coffee served with dates",
        altAr: "قهوة عربية تقدَّم مع التمر",
      },
    ],
    variants: [
      {
        nameEn: "Shared sunset cruise",
        nameAr: "رحلة غروب مشتركة",
        basePriceAED: 195,
        maxPax: 24,
        includes: ["90min cruise", "Arabic coffee & dates", "Guide"],
      },
      {
        nameEn: "Private dhow charter",
        nameAr: "تأجير سفينة خاصة",
        basePriceAED: 2800,
        maxPax: 12,
        includes: ["Private 90min charter", "Crew", "Welcome platter"],
      },
    ],
  },

  // ─── Dining ─────────────────────────────────────────────────
  {
    slug: "dhow-dinner-cruise",
    categorySlug: "dining",
    titleEn: "Traditional Dhow Dinner Cruise",
    titleAr: "عشاء على سفينة تقليدية",
    summaryEn: "Four-course Levantine menu, live oud player, two hours along the Marina skyline.",
    summaryAr: "قائمة طعام شامية من أربعة أطباق، عازف عود مباشر، ساعتان على امتداد واجهة المارينا.",
    descriptionEn:
      "Board a two-deck wooden dhow at Abu Dhabi Marina, cast off at 8pm. A four-course set menu (Levantine mezze → grilled catch → lamb ouzi → Umm Ali) is plated on the upper deck while an oud player circulates. Returns by 10pm.",
    descriptionAr:
      "استقل سفينة تقليدية من طابقين في مارينا أبوظبي، تنطلق في الساعة 8 مساءً. تقدم قائمة طعام من أربعة أطباق (مزة شامية → سمك مشوي → أوزي لحم → أم علي) على السطح العلوي بينما يتجول عازف عود. تعود بحلول الساعة 10 مساءً.",
    durationMinutes: 120,
    location: "Abu Dhabi Marina",
    featured: false,
    images: [
      {
        url: img("dhow-dinner", "1528605105345-5344ea20e269"),
        altEn: "Dhow deck set for dinner",
        altAr: "سطح السفينة معدّ للعشاء",
      },
      {
        url: img("mezze", "1490818387583-1baba5e638af"),
        altEn: "Levantine mezze spread",
        altAr: "مزة شامية متنوعة",
      },
      {
        url: img("marina-night", "1540541338287-41700207dee6"),
        altEn: "Abu Dhabi Marina at night",
        altAr: "مارينا أبوظبي ليلاً",
      },
    ],
    variants: [
      {
        nameEn: "Standard set menu",
        nameAr: "قائمة طعام قياسية",
        basePriceAED: 285,
        maxPax: 40,
        includes: ["4-course dinner", "Soft drinks", "Live music"],
      },
      {
        nameEn: "Upper deck premium",
        nameAr: "السطح العلوي المميز",
        basePriceAED: 425,
        maxPax: 20,
        includes: ["Priority seating", "4-course dinner", "Select wine pairing"],
      },
    ],
  },
  {
    slug: "emirates-palace-high-tea",
    categorySlug: "dining",
    titleEn: "Emirates Palace High Tea",
    titleAr: "شاي بعد الظهر في قصر الإمارات",
    summaryEn:
      "Gold-flake cappuccino, Sidr honey scones, and a string quartet under the palace dome.",
    summaryAr: "كابتشينو مُذهّب، وسكونز بعسل السدر، ورباعية وترية تحت قبة القصر.",
    descriptionEn:
      "Le Café at Emirates Palace Mandarin Oriental is where the palace's famed 24-karat gold cappuccino is served. The high-tea set pairs it with Emirati-inspired pastries (dates, camel-milk caramel, saffron cardamom cake) and a live string quartet from 3-5pm.",
    descriptionAr:
      "مقهى لو كافيه في قصر الإمارات ماندارين أورينتال هو المكان الذي يُقدَّم فيه الكابتشينو الشهير المُذهَّب بـ24 قيراطاً. تقدم مجموعة شاي بعد الظهر المعجنات المستوحاة إماراتياً (التمر، كراميل حليب الإبل، وكعك الزعفران بالهيل) ورباعية وترية حية من 3 إلى 5 مساءً.",
    durationMinutes: 120,
    location: "Emirates Palace, Abu Dhabi",
    featured: false,
    images: [
      {
        url: img("emirates-palace", "1571003123894-1f0594d2b5d9"),
        altEn: "Emirates Palace golden facade",
        altAr: "الواجهة الذهبية لقصر الإمارات",
      },
      {
        url: img("gold-cappuccino", "1498804103079-a6351b050096"),
        altEn: "Gold-flake cappuccino with pastries",
        altAr: "كابتشينو مذهّب مع حلويات",
      },
      {
        url: img("high-tea-set", "1514733670139-4d87a1941d55"),
        altEn: "Three-tier high tea stand",
        altAr: "حامل شاي ثلاثي الطبقات",
      },
    ],
    variants: [
      {
        nameEn: "Classic high tea",
        nameAr: "شاي بعد الظهر كلاسيكي",
        basePriceAED: 350,
        maxPax: 2,
        includes: ["3-tier pastry set", "Coffee/tea", "Live music"],
      },
      {
        nameEn: "Palace tea with prosecco",
        nameAr: "شاي القصر مع البروسيكو",
        basePriceAED: 520,
        maxPax: 2,
        includes: ["3-tier pastry set", "Glass of prosecco", "Palace tour pass"],
      },
    ],
  },

  // ─── Tours ──────────────────────────────────────────────────
  {
    slug: "abu-dhabi-city-highlights",
    categorySlug: "tours",
    titleEn: "Half-Day Abu Dhabi City Highlights",
    titleAr: "جولة نصف يوم في معالم أبوظبي",
    summaryEn:
      "Four-hour air-conditioned loop: Mosque → Corniche → Etihad Towers → Heritage Village.",
    summaryAr: "جولة مكيّفة لمدة أربع ساعات: الجامع → الكورنيش → أبراج الاتحاد → القرية التراثية.",
    descriptionEn:
      "A compact introduction for first-time visitors. Hotel pickup, English/Arabic-speaking driver-guide, and stops at the Grand Mosque (30min), the Corniche viewpoint, Etihad Towers observation deck (at 300m), and the Heritage Village. Bottled water throughout.",
    descriptionAr:
      "مقدمة مضغوطة للزوار لأول مرة. استقبال من الفندق، سائق-مرشد يتحدث الإنجليزية/العربية، وتوقفات عند الجامع الكبير (30 دقيقة)، ونقطة مراقبة الكورنيش، ومنصة مراقبة أبراج الاتحاد (على ارتفاع 300 متر)، والقرية التراثية. مياه معبأة طوال الوقت.",
    durationMinutes: 240,
    location: "Abu Dhabi (hotel pickup)",
    featured: false,
    images: [
      {
        url: img("corniche-aerial", "1547036967-23d11aacaee0"),
        altEn: "Corniche aerial view",
        altAr: "إطلالة جوية على الكورنيش",
      },
      {
        url: img("etihad-towers", "1505142468610-359e7d316be0"),
        altEn: "Etihad Towers five towers",
        altAr: "أبراج الاتحاد الخمسة",
      },
      {
        url: img("grand-mosque-wide", "1529590003495-14c16c4a8b5d"),
        altEn: "Sheikh Zayed Grand Mosque panorama",
        altAr: "بانوراما جامع الشيخ زايد الكبير",
      },
    ],
    variants: [
      {
        nameEn: "Shared minibus",
        nameAr: "حافلة صغيرة مشتركة",
        basePriceAED: 195,
        maxPax: 12,
        includes: ["Hotel pickup", "Guide", "All entries", "Water"],
      },
      {
        nameEn: "Private SUV",
        nameAr: "سيارة دفع رباعي خاصة",
        basePriceAED: 890,
        maxPax: 4,
        includes: ["Private hotel pickup", "Private guide", "All entries", "Water"],
      },
    ],
  },
];
