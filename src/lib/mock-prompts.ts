import type { Prompt } from "@/types/prompt";

export type MockCategory = {
  name: string;
  slug: string;
  description: string;
  count: number;
};

export const prompts: Prompt[] = [
  {
    slug: "luxury-perfume-product-photo",
    title: "عکس محصول عطر لوکس",
    description: "چیدمان استودیویی برای نمایش یک بطری عطر با حس برند لوکس و نورپردازی سینمایی.",
    category: "عکس محصول",
    tags: ["luxury", "product", "realistic"],
    access: "free",
    difficulty: "beginner",
    models: ["ChatGPT Image", "Midjourney", "Flux"],
    coverImage: "/mock/perfume.svg",
    imageAlt: "تصویر نمونه عطر لوکس روی سطح تیره",
    promptText:
      "Create a realistic studio product photograph of {product}, placed on a {background}, with {lighting} lighting, premium commercial photography style, sharp focus, natural shadows, high-end advertising composition, 85mm lens look, ultra-detailed texture, clean background, no text, no watermark.",
    negativePrompt:
      "blurry, low quality, distorted bottle, extra labels, watermark, text overlay, messy background",
    variables: [
      { key: "product", labelFa: "محصول", example: "luxury perfume bottle" },
      { key: "background", labelFa: "پس‌زمینه", example: "black marble surface" },
      { key: "lighting", labelFa: "نورپردازی", example: "soft cinematic studio lighting" },
    ],
    usageGuide: [
      "نام محصول و جنس سطح را دقیق جایگزین کن تا خروجی تبلیغاتی‌تر شود.",
      "برای عطر، جواهرات و محصولات کوچک از نور نرم و سایه طبیعی استفاده کن.",
      "اگر تصویر شلوغ شد، در بخش منفی روی حذف متن، واترمارک و پس‌زمینه شلوغ تاکید کن.",
    ],
    bestFor: "عکس محصول لوکس، بنر فروش، پست معرفی محصول",
  },
  {
    slug: "handmade-date-box",
    title: "باکس خرمای دست‌ساز",
    description: "تصویر محصول گرم و واقعی برای فروشگاه‌های خوراکی، هدیه و بسته‌بندی‌های مناسبتی.",
    category: "غذا و رستوران",
    tags: ["food", "ecommerce", "warm"],
    access: "free",
    difficulty: "beginner",
    models: ["ChatGPT Image", "Gemini", "Midjourney"],
    coverImage: "/mock/date-box.svg",
    imageAlt: "تصویر نمونه باکس خرمای دست ساز",
    promptText:
      "Create a realistic commercial product photo of {product}, arranged neatly in premium packaging on a {surface}, warm natural lighting, appetizing texture, elegant gift presentation, shallow depth of field, clean composition, high detail, no text, no watermark.",
    variables: [
      { key: "product", labelFa: "محصول", example: "handmade date gift box" },
      { key: "surface", labelFa: "سطح", example: "dark walnut wooden table" },
    ],
    usageGuide: [
      "نوع بسته‌بندی و جنس سطح را متناسب با برند خودت بنویس.",
      "برای حس لوکس‌تر از عبارت premium gift presentation استفاده کن.",
      "اگر غذا غیرواقعی شد، realistic texture و natural lighting را پررنگ‌تر کن.",
    ],
    bestFor: "فروشگاه خوراکی، هدیه سازمانی، محتوای مناسبتی",
  },
  {
    slug: "minimal-skincare-product",
    title: "اسکین‌کر مینیمال",
    description: "تصویر تمیز و مدرن برای محصولات مراقبت پوست با فضای روشن، ساده و قابل استفاده در کاتالوگ.",
    category: "عکس محصول",
    tags: ["minimal", "skincare", "catalog"],
    access: "free",
    difficulty: "beginner",
    models: ["ChatGPT Image", "Firefly", "Flux"],
    coverImage: "/mock/skincare.svg",
    imageAlt: "تصویر نمونه محصول مراقبت پوست مینیمال",
    promptText:
      "Create a clean minimalist product photograph of {product}, centered on a {background}, soft diffused daylight, subtle shadows, premium skincare advertising style, balanced negative space, realistic material texture, editorial catalog composition, no text, no watermark.",
    variables: [
      { key: "product", labelFa: "محصول", example: "white skincare serum bottle" },
      { key: "background", labelFa: "پس‌زمینه", example: "warm off-white stone background" },
    ],
    usageGuide: [
      "برای کاتالوگ، پس‌زمینه را ساده و رنگ محصول را دقیق توصیف کن.",
      "فضای خالی برای قرار دادن متن تبلیغاتی خارج از تصویر مناسب است.",
      "اگر خروجی بیش از حد فانتزی شد، realistic material texture را اضافه نگه دار.",
    ],
    bestFor: "کاتالوگ، صفحه محصول، کمپین مراقبت پوست",
  },
  {
    slug: "restaurant-burger-ad",
    title: "شات تبلیغاتی برگر",
    description: "تصویر اشتهابرانگیز برای تبلیغات رستوران و پست‌های فروش غذا در شبکه‌های اجتماعی.",
    category: "تبلیغات اینستاگرام",
    tags: ["food", "instagram", "cinematic"],
    access: "free",
    difficulty: "intermediate",
    models: ["Midjourney", "ChatGPT Image", "Leonardo"],
    coverImage: "/mock/burger.svg",
    imageAlt: "تصویر نمونه برگر تبلیغاتی",
    promptText:
      "Create a cinematic advertising photo of {product}, juicy and appetizing, placed on a dark rustic table, dramatic side lighting, fresh ingredients, visible steam, shallow depth of field, premium restaurant campaign style, high contrast, no text, no watermark.",
    variables: [{ key: "product", labelFa: "محصول", example: "gourmet beef burger" }],
    usageGuide: [
      "مواد اصلی غذا را مشخص کن تا تصویر اشتهابرانگیزتر شود.",
      "برای تبلیغ شبانه یا فست‌فود، dramatic side lighting نتیجه قوی‌تری می‌دهد.",
      "اگر بخار یا مواد اضافه غیرواقعی شد، عبارت clean realistic food styling را اضافه کن.",
    ],
    bestFor: "رستوران، کافه، کمپین فروش غذا",
  },
  {
    slug: "fashion-editorial-streetwear",
    title: "ادیتوریال استریت‌ور",
    description: "عکس مد خیابانی با حس مجله‌ای برای معرفی کالکشن پوشاک و برندهای آنلاین.",
    category: "مد و پوشاک",
    tags: ["fashion", "editorial", "streetwear"],
    access: "free",
    difficulty: "intermediate",
    models: ["Midjourney", "Flux", "Leonardo"],
    coverImage: "/mock/streetwear.svg",
    imageAlt: "تصویر نمونه مد خیابانی",
    promptText:
      "Create a high-end fashion editorial photograph of a model wearing {outfit}, standing in {location}, modern streetwear styling, confident pose, natural urban light, magazine cover quality, realistic fabric detail, cinematic color grading, no logos, no text.",
    variables: [
      { key: "outfit", labelFa: "لباس", example: "oversized beige jacket and black trousers" },
      { key: "location", labelFa: "لوکیشن", example: "minimal concrete urban street" },
    ],
    usageGuide: [
      "استایل لباس و لوکیشن را با زبان دقیق جایگزین کن.",
      "برای فروش لباس، realistic fabric detail را حذف نکن.",
      "برای جلوگیری از برندهای ناخواسته، no logos را در انتهای پرامپت نگه دار.",
    ],
    bestFor: "معرفی کالکشن، بنر پوشاک، پست ادیتوریال",
  },
  {
    slug: "instagram-sale-story-background",
    title: "پس‌زمینه استوری فروش",
    description: "پس‌زمینه حرفه‌ای و خلوت برای کمپین‌های تخفیف و استوری فروش اینستاگرام.",
    category: "پس‌زمینه پست و استوری",
    tags: ["instagram", "sale", "background"],
    access: "free",
    difficulty: "beginner",
    models: ["ChatGPT Image", "Firefly", "Gemini"],
    coverImage: "/mock/story.svg",
    imageAlt: "تصویر نمونه پس زمینه استوری فروش",
    promptText:
      "Create a vertical 9:16 premium Instagram story background for a {campaign} campaign, elegant abstract product display space, dark clean surface, subtle purple and blue accent lighting, large empty area for text, modern commercial design, no text, no watermark.",
    variables: [{ key: "campaign", labelFa: "کمپین", example: "seasonal sale" }],
    usageGuide: [
      "نوع کمپین را کوتاه و روشن بنویس؛ مثلا seasonal sale یا new collection.",
      "برای جا دادن متن فارسی، large empty area for text را حفظ کن.",
      "این پرامپت خروجی بدون متن می‌دهد تا متن را بعدا در ابزار طراحی اضافه کنی.",
    ],
    bestFor: "استوری تخفیف، معرفی محصول، کمپین اینستاگرام",
  },
  {
    slug: "premium-packaging-mockup",
    title: "موکاپ بسته‌بندی پریمیوم",
    description: "نمایش حرفه‌ای جعبه، پاکت یا بسته محصول برای برندینگ و معرفی هویت بصری.",
    category: "بسته‌بندی",
    tags: ["packaging", "branding", "premium"],
    access: "pro",
    difficulty: "advanced",
    models: ["Midjourney", "Flux", "ChatGPT Image"],
    coverImage: "/mock/packaging.svg",
    imageAlt: "تصویر نمونه موکاپ بسته بندی پریمیوم",
    promptText:
      "Create a premium packaging mockup scene for {product_type}, featuring a clean unbranded box with refined material texture, placed on {surface}, elegant studio lighting, luxury brand presentation, realistic shadows, commercial catalog composition, no readable text, no watermark.",
    variables: [
      { key: "product_type", labelFa: "نوع محصول", example: "artisan chocolate brand" },
      { key: "surface", labelFa: "سطح", example: "matte charcoal stone" },
    ],
    usageGuide: [
      "برای جلوگیری از متن اشتباه، no readable text را نگه دار.",
      "جنس بسته‌بندی را دقیق بنویس؛ مثلا matte paper یا glossy rigid box.",
      "برای پرزنت برند، از خروجی به عنوان موکاپ مفهومی استفاده کن.",
    ],
    bestFor: "برندینگ، ارائه بسته‌بندی، کاتالوگ محصول",
  },
  {
    slug: "corporate-founder-portrait",
    title: "پرتره حرفه‌ای بنیان‌گذار",
    description: "پرتره جدی و قابل اعتماد برای صفحه درباره ما، لینکدین و معرفی برند شخصی.",
    category: "پرتره حرفه‌ای",
    tags: ["portrait", "corporate", "realistic"],
    access: "pro",
    difficulty: "intermediate",
    models: ["ChatGPT Image", "Midjourney", "Flux"],
    coverImage: "/mock/portrait.svg",
    imageAlt: "تصویر نمونه پرتره حرفه‌ای",
    promptText:
      "Create a professional corporate portrait of {person_description}, wearing {outfit}, photographed in a modern office environment, confident approachable expression, soft window light, realistic skin texture, premium business photography style, shallow depth of field, no text, no watermark.",
    variables: [
      { key: "person_description", labelFa: "توصیف فرد", example: "a middle-aged startup founder" },
      { key: "outfit", labelFa: "پوشش", example: "navy blazer and white shirt" },
    ],
    usageGuide: [
      "سن، استایل و فضای کاری را بدون اشاره به فرد واقعی بنویس.",
      "برای حس قابل اعتماد، confident approachable expression را حفظ کن.",
      "اگر پوست مصنوعی شد، realistic skin texture و soft window light را تقویت کن.",
    ],
    bestFor: "برند شخصی، درباره ما، تصویر لینکدین",
  },
  {
    slug: "coffee-shop-product-shot",
    title: "شات سینمایی کافه",
    description: "تصویر گرم و سینمایی برای قهوه، نوشیدنی و محصولات کافه‌ای.",
    category: "غذا و رستوران",
    tags: ["coffee", "cinematic", "product"],
    access: "free",
    difficulty: "intermediate",
    models: ["Midjourney", "ChatGPT Image", "Gemini"],
    coverImage: "/mock/coffee.svg",
    imageAlt: "تصویر نمونه قهوه سینمایی",
    promptText:
      "Create a cinematic coffee shop product photo of {product}, placed near a window on a dark wooden table, warm morning light, soft steam, cozy premium cafe atmosphere, realistic ceramic and liquid texture, shallow depth of field, no text, no watermark.",
    variables: [{ key: "product", labelFa: "محصول", example: "iced latte in a clear glass" }],
    usageGuide: [
      "نوع نوشیدنی و ظرف را دقیق بنویس تا خروجی قابل استفاده‌تر شود.",
      "برای حس صبحگاهی، warm morning light مناسب‌تر از نور استودیویی است.",
      "اگر تصویر بیش از حد تیره شد، soft natural highlights را اضافه کن.",
    ],
    bestFor: "کافه، منوی نوشیدنی، پست اینستاگرام",
  },
  {
    slug: "jewelry-macro-product",
    title: "ماکرو جواهرات",
    description: "نمای نزدیک دقیق برای جواهرات، اکسسوری و محصولات ظریف با تاکید روی درخشش و جنس.",
    category: "تصاویر لوکس",
    tags: ["jewelry", "macro", "luxury"],
    access: "pro",
    difficulty: "advanced",
    models: ["Midjourney", "Flux", "Leonardo"],
    coverImage: "/mock/jewelry.svg",
    imageAlt: "تصویر نمونه ماکرو جواهرات",
    promptText:
      "Create an ultra-realistic macro product photograph of {jewelry}, placed on {surface}, precise gemstone reflections, premium luxury lighting, crisp metal texture, elegant dark background, commercial jewelry campaign style, 100mm macro lens look, no text, no watermark.",
    variables: [
      { key: "jewelry", labelFa: "جواهر", example: "minimal gold ring with a small gemstone" },
      { key: "surface", labelFa: "سطح", example: "black velvet surface" },
    ],
    usageGuide: [
      "نوع فلز و سنگ را دقیق بنویس تا انعکاس‌ها طبیعی‌تر شود.",
      "برای محصولات کوچک، 100mm macro lens look به خروجی جزئیات بیشتری می‌دهد.",
      "اگر درخشش بیش از حد شد، balanced reflections را به پرامپت اضافه کن.",
    ],
    bestFor: "جواهرات، اکسسوری لوکس، کمپین فروش",
  },
  {
    slug: "real-estate-interior-hero",
    title: "نمای داخلی ملک",
    description: "تصویر هیرو برای املاک، طراحی داخلی و معرفی فضاهای مدرن و لوکس.",
    category: "برندینگ",
    tags: ["interior", "real-estate", "luxury"],
    access: "free",
    difficulty: "intermediate",
    models: ["ChatGPT Image", "Midjourney", "Firefly"],
    coverImage: "/mock/interior.svg",
    imageAlt: "تصویر نمونه فضای داخلی لوکس",
    promptText:
      "Create a realistic luxury interior hero image of {space}, featuring {style} design, balanced natural and ambient lighting, clean architectural composition, high-end real estate photography, wide angle lens look, realistic materials, no people, no text, no watermark.",
    variables: [
      { key: "space", labelFa: "فضا", example: "modern living room" },
      { key: "style", labelFa: "سبک", example: "minimal warm contemporary" },
    ],
    usageGuide: [
      "نوع فضا و سبک دکوراسیون را مشخص کن.",
      "برای صفحه اول سایت املاک، wide angle lens look نمای بازتری ایجاد می‌کند.",
      "اگر تصویر غیرواقعی شد، realistic materials را نزدیک ابتدای پرامپت بیاور.",
    ],
    bestFor: "املاک، معماری داخلی، صفحه فرود پروژه",
  },
  {
    slug: "persian-luxury-brand-visual",
    title: "ویژوال برند لوکس ایرانی",
    description: "تصویر برندینگ با حس ایرانی، مدرن و لوکس برای کمپین‌های مناسبتی و معرفی برند.",
    category: "برندینگ",
    tags: ["branding", "luxury", "persian"],
    access: "pro",
    difficulty: "advanced",
    models: ["Midjourney", "Flux", "ChatGPT Image"],
    coverImage: "/mock/persian-brand.svg",
    imageAlt: "تصویر نمونه ویژوال برند لوکس ایرانی",
    promptText:
      "Create a premium visual identity scene for {brand_type}, inspired by refined Persian geometric motifs, modern luxury advertising style, elegant product display area, deep charcoal background, subtle indigo and violet accents, realistic materials, no text, no watermark.",
    variables: [{ key: "brand_type", labelFa: "نوع برند", example: "premium handmade gift brand" }],
    usageGuide: [
      "نوع برند را دقیق بنویس اما از نام برندهای واقعی استفاده نکن.",
      "برای حس ایرانی، refined Persian geometric motifs کافی است و تصویر را شلوغ نمی‌کند.",
      "اگر نقش‌ها زیاد شدند، subtle motifs و clean composition را اضافه کن.",
    ],
    bestFor: "برندینگ، کمپین لوکس، هویت بصری ایرانی",
  },
];

export function getPromptBySlug(slug: string) {
  return prompts.find((prompt) => prompt.slug === slug);
}

export function getRelatedPrompts(currentSlug: string) {
  const current = getPromptBySlug(currentSlug);

  if (!current) {
    return prompts.slice(0, 3);
  }

  return prompts
    .filter((prompt) => prompt.slug !== currentSlug && prompt.category === current.category)
    .concat(prompts.filter((prompt) => prompt.slug !== currentSlug && prompt.category !== current.category))
    .slice(0, 3);
}

export const categorySlugs: Record<string, string> = {
  "عکس محصول": "product-photography",
  "غذا و رستوران": "food-restaurant",
  "تبلیغات اینستاگرام": "instagram-ads",
  "مد و پوشاک": "fashion",
  "پس‌زمینه پست و استوری": "story-backgrounds",
  "بسته‌بندی": "packaging",
  "پرتره حرفه‌ای": "professional-portrait",
  "تصاویر لوکس": "luxury-visuals",
  "برندینگ": "branding",
};

export function getCategorySlug(categoryName: string) {
  return categorySlugs[categoryName] ?? categoryName.toLowerCase().replace(/\s+/g, "-");
}

export function getCategories(): MockCategory[] {
  const categoryNames = Array.from(new Set(prompts.map((prompt) => prompt.category)));

  return categoryNames.map((name) => ({
    name,
    slug: getCategorySlug(name),
    count: prompts.filter((prompt) => prompt.category === name).length,
    description: `پرامپت‌های آماده برای ساخت تصاویر حرفه‌ای در حوزه ${name}.`,
  }));
}

export function getCategoryBySlug(slug: string) {
  return getCategories().find((category) => category.slug === slug);
}

export function getPromptsByCategorySlug(slug: string) {
  const category = getCategoryBySlug(slug);

  if (!category) {
    return [];
  }

  return prompts.filter((prompt) => prompt.category === category.name);
}
