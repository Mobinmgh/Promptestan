insert into public.categories (name_fa, name_en, slug, description, sort_order) values
  ('عکس محصول', 'Product Photography', 'product-photography', 'پرامپت‌های آماده برای عکس محصول و فروشگاه آنلاین.', 1),
  ('تبلیغات اینستاگرام', 'Instagram Ads', 'instagram-ads', 'تصاویر تبلیغاتی برای پست، استوری و کمپین فروش.', 2),
  ('غذا و رستوران', 'Food and Restaurant', 'food-restaurant', 'پرامپت‌های تصویری برای غذا، نوشیدنی و رستوران.', 3),
  ('مد و پوشاک', 'Fashion', 'fashion', 'تصاویر ادیتوریال و فروشگاهی برای پوشاک.', 4),
  ('پس‌زمینه پست و استوری', 'Story Backgrounds', 'story-backgrounds', 'پس‌زمینه‌های آماده برای کمپین و محتوای شبکه اجتماعی.', 5),
  ('بسته‌بندی', 'Packaging', 'packaging', 'موکاپ و پرزنت حرفه‌ای بسته‌بندی محصول.', 6),
  ('پرتره حرفه‌ای', 'Professional Portrait', 'professional-portrait', 'پرتره‌های حرفه‌ای برای برند شخصی و کسب‌وکار.', 7),
  ('تصاویر لوکس', 'Luxury Visuals', 'luxury-visuals', 'تصاویر سطح بالا برای برندهای لوکس.', 8),
  ('برندینگ', 'Branding', 'branding', 'تصاویر هویت بصری و کمپین برند.', 9)
on conflict (slug) do update set
  name_fa = excluded.name_fa,
  name_en = excluded.name_en,
  description = excluded.description,
  sort_order = excluded.sort_order;

insert into public.tags (name, slug) values
  ('luxury', 'luxury'), ('minimal', 'minimal'), ('realistic', 'realistic'),
  ('cinematic', 'cinematic'), ('ecommerce', 'ecommerce'), ('instagram', 'instagram'),
  ('food', 'food'), ('fashion', 'fashion'), ('product', 'product'),
  ('packaging', 'packaging'), ('portrait', 'portrait'), ('branding', 'branding'),
  ('macro', 'macro'), ('interior', 'interior'), ('persian', 'persian')
on conflict (slug) do update set name = excluded.name;

insert into public.prompts (
  title, slug, description, prompt_text, negative_prompt, variables,
  usage_notes_fa, best_for, model_compatibility, difficulty, access_level,
  category_id, cover_image_url, is_published
) values
  (
    'عکس محصول عطر لوکس',
    'luxury-perfume-product-photo',
    'چیدمان استودیویی برای نمایش یک بطری عطر با حس برند لوکس و نورپردازی سینمایی.',
    'Create a realistic studio product photograph of {product}, placed on a {background}, with {lighting} lighting, premium commercial photography style, sharp focus, natural shadows, high-end advertising composition, 85mm lens look, ultra-detailed texture, clean background, no text, no watermark.',
    'blurry, low quality, distorted bottle, extra labels, watermark, text overlay, messy background',
    '[{"key":"product","label_fa":"محصول","example":"luxury perfume bottle"},{"key":"background","label_fa":"پس‌زمینه","example":"black marble surface"},{"key":"lighting","label_fa":"نورپردازی","example":"soft cinematic studio lighting"}]'::jsonb,
    '- نام محصول و جنس سطح را دقیق جایگزین کن.\n- برای عطر، جواهرات و محصولات کوچک از نور نرم استفاده کن.\n- اگر تصویر شلوغ شد، متن و واترمارک را در پرامپت منفی حذف کن.',
    'عکس محصول لوکس، بنر فروش، پست معرفی محصول',
    array['ChatGPT Image','Midjourney','Flux'], 'beginner', 'free',
    (select id from public.categories where slug = 'product-photography'), '/mock/perfume.svg', true
  ),
  (
    'باکس خرمای دست‌ساز',
    'handmade-date-box',
    'تصویر محصول گرم و واقعی برای فروشگاه‌های خوراکی، هدیه و بسته‌بندی‌های مناسبتی.',
    'Create a realistic commercial product photo of {product}, arranged neatly in premium packaging on a {surface}, warm natural lighting, appetizing texture, elegant gift presentation, shallow depth of field, clean composition, high detail, no text, no watermark.',
    null,
    '[{"key":"product","label_fa":"محصول","example":"handmade date gift box"},{"key":"surface","label_fa":"سطح","example":"dark walnut wooden table"}]'::jsonb,
    '- نوع بسته‌بندی و جنس سطح را متناسب با برند خودت بنویس.\n- برای حس لوکس‌تر از premium gift presentation استفاده کن.',
    'فروشگاه خوراکی، هدیه سازمانی، محتوای مناسبتی',
    array['ChatGPT Image','Gemini','Midjourney'], 'beginner', 'free',
    (select id from public.categories where slug = 'food-restaurant'), '/mock/date-box.svg', true
  ),
  (
    'اسکین‌کر مینیمال',
    'minimal-skincare-product',
    'تصویر تمیز و مدرن برای محصولات مراقبت پوست با فضای روشن و ساده.',
    'Create a clean minimalist product photograph of {product}, centered on a {background}, soft diffused daylight, subtle shadows, premium skincare advertising style, balanced negative space, realistic material texture, editorial catalog composition, no text, no watermark.',
    null,
    '[{"key":"product","label_fa":"محصول","example":"white skincare serum bottle"},{"key":"background","label_fa":"پس‌زمینه","example":"warm off-white stone background"}]'::jsonb,
    '- برای کاتالوگ، پس‌زمینه را ساده و رنگ محصول را دقیق توصیف کن.\n- فضای خالی برای قرار دادن متن تبلیغاتی مناسب است.',
    'کاتالوگ، صفحه محصول، کمپین مراقبت پوست',
    array['ChatGPT Image','Firefly','Flux'], 'beginner', 'free',
    (select id from public.categories where slug = 'product-photography'), '/mock/skincare.svg', true
  ),
  (
    'شات تبلیغاتی برگر',
    'restaurant-burger-ad',
    'تصویر اشتهابرانگیز برای تبلیغات رستوران و پست‌های فروش غذا.',
    'Create a cinematic advertising photo of {product}, juicy and appetizing, placed on a dark rustic table, dramatic side lighting, fresh ingredients, visible steam, shallow depth of field, premium restaurant campaign style, high contrast, no text, no watermark.',
    null,
    '[{"key":"product","label_fa":"محصول","example":"gourmet beef burger"}]'::jsonb,
    '- مواد اصلی غذا را مشخص کن.\n- برای تبلیغ شبانه از dramatic side lighting استفاده کن.',
    'رستوران، کافه، کمپین فروش غذا',
    array['Midjourney','ChatGPT Image','Leonardo'], 'intermediate', 'free',
    (select id from public.categories where slug = 'instagram-ads'), '/mock/burger.svg', true
  ),
  (
    'ادیتوریال استریت‌ور',
    'fashion-editorial-streetwear',
    'عکس مد خیابانی با حس مجله‌ای برای معرفی کالکشن پوشاک.',
    'Create a high-end fashion editorial photograph of a model wearing {outfit}, standing in {location}, modern streetwear styling, confident pose, natural urban light, magazine cover quality, realistic fabric detail, cinematic color grading, no logos, no text.',
    null,
    '[{"key":"outfit","label_fa":"لباس","example":"oversized beige jacket and black trousers"},{"key":"location","label_fa":"لوکیشن","example":"minimal concrete urban street"}]'::jsonb,
    '- استایل لباس و لوکیشن را دقیق جایگزین کن.\n- برای فروش لباس realistic fabric detail را نگه دار.',
    'معرفی کالکشن، بنر پوشاک، پست ادیتوریال',
    array['Midjourney','Flux','Leonardo'], 'intermediate', 'free',
    (select id from public.categories where slug = 'fashion'), '/mock/streetwear.svg', true
  ),
  (
    'پس‌زمینه استوری فروش',
    'instagram-sale-story-background',
    'پس‌زمینه حرفه‌ای و خلوت برای کمپین‌های تخفیف و استوری فروش.',
    'Create a vertical 9:16 premium Instagram story background for a {campaign} campaign, elegant abstract product display space, dark clean surface, subtle purple and blue accent lighting, large empty area for text, modern commercial design, no text, no watermark.',
    null,
    '[{"key":"campaign","label_fa":"کمپین","example":"seasonal sale"}]'::jsonb,
    '- نوع کمپین را کوتاه و روشن بنویس.\n- برای جا دادن متن فارسی large empty area for text را حفظ کن.',
    'استوری تخفیف، معرفی محصول، کمپین اینستاگرام',
    array['ChatGPT Image','Firefly','Gemini'], 'beginner', 'free',
    (select id from public.categories where slug = 'story-backgrounds'), '/mock/story.svg', true
  ),
  (
    'شات سینمایی کافه',
    'coffee-shop-product-shot',
    'تصویر گرم و سینمایی برای قهوه، نوشیدنی و محصولات کافه‌ای.',
    'Create a cinematic coffee shop product photo of {product}, placed near a window on a dark wooden table, warm morning light, soft steam, cozy premium cafe atmosphere, realistic ceramic and liquid texture, shallow depth of field, no text, no watermark.',
    null,
    '[{"key":"product","label_fa":"محصول","example":"iced latte in a clear glass"}]'::jsonb,
    '- نوع نوشیدنی و ظرف را دقیق بنویس.\n- اگر تصویر تیره شد، soft natural highlights را اضافه کن.',
    'کافه، منوی نوشیدنی، پست اینستاگرام',
    array['Midjourney','ChatGPT Image','Gemini'], 'intermediate', 'free',
    (select id from public.categories where slug = 'food-restaurant'), '/mock/coffee.svg', true
  ),
  (
    'نمای داخلی ملک',
    'real-estate-interior-hero',
    'تصویر هیرو برای املاک، طراحی داخلی و معرفی فضاهای مدرن.',
    'Create a realistic luxury interior hero image of {space}, featuring {style} design, balanced natural and ambient lighting, clean architectural composition, high-end real estate photography, wide angle lens look, realistic materials, no people, no text, no watermark.',
    null,
    '[{"key":"space","label_fa":"فضا","example":"modern living room"},{"key":"style","label_fa":"سبک","example":"minimal warm contemporary"}]'::jsonb,
    '- نوع فضا و سبک دکوراسیون را مشخص کن.\n- برای صفحه اول سایت املاک، wide angle lens look نمای بازتری ایجاد می‌کند.',
    'املاک، معماری داخلی، صفحه فرود پروژه',
    array['ChatGPT Image','Midjourney','Firefly'], 'intermediate', 'free',
    (select id from public.categories where slug = 'branding'), '/mock/interior.svg', true
  ),
  (
    'موکاپ بسته‌بندی پریمیوم',
    'premium-packaging-mockup',
    'نمایش حرفه‌ای جعبه، پاکت یا بسته محصول برای برندینگ.',
    'Create a premium packaging mockup scene for {product_type}, featuring a clean unbranded box with refined material texture, placed on {surface}, elegant studio lighting, luxury brand presentation, realistic shadows, commercial catalog composition, no readable text, no watermark.',
    null,
    '[{"key":"product_type","label_fa":"نوع محصول","example":"artisan chocolate brand"},{"key":"surface","label_fa":"سطح","example":"matte charcoal stone"}]'::jsonb,
    '- برای جلوگیری از متن اشتباه، no readable text را نگه دار.\n- جنس بسته‌بندی را دقیق بنویس.',
    'برندینگ، ارائه بسته‌بندی، کاتالوگ محصول',
    array['Midjourney','Flux','ChatGPT Image'], 'advanced', 'pro',
    (select id from public.categories where slug = 'packaging'), '/mock/packaging.svg', true
  ),
  (
    'پرتره حرفه‌ای بنیان‌گذار',
    'corporate-founder-portrait',
    'پرتره جدی و قابل اعتماد برای صفحه درباره ما و برند شخصی.',
    'Create a professional corporate portrait of {person_description}, wearing {outfit}, photographed in a modern office environment, confident approachable expression, soft window light, realistic skin texture, premium business photography style, shallow depth of field, no text, no watermark.',
    null,
    '[{"key":"person_description","label_fa":"توصیف فرد","example":"a middle-aged startup founder"},{"key":"outfit","label_fa":"پوشش","example":"navy blazer and white shirt"}]'::jsonb,
    '- سن، استایل و فضای کاری را بدون اشاره به فرد واقعی بنویس.\n- برای حس قابل اعتماد confident approachable expression را حفظ کن.',
    'برند شخصی، درباره ما، تصویر لینکدین',
    array['ChatGPT Image','Midjourney','Flux'], 'intermediate', 'pro',
    (select id from public.categories where slug = 'professional-portrait'), '/mock/portrait.svg', true
  ),
  (
    'ماکرو جواهرات',
    'jewelry-macro-product',
    'نمای نزدیک دقیق برای جواهرات و اکسسوری با تاکید روی درخشش.',
    'Create an ultra-realistic macro product photograph of {jewelry}, placed on {surface}, precise gemstone reflections, premium luxury lighting, crisp metal texture, elegant dark background, commercial jewelry campaign style, 100mm macro lens look, no text, no watermark.',
    null,
    '[{"key":"jewelry","label_fa":"جواهر","example":"minimal gold ring with a small gemstone"},{"key":"surface","label_fa":"سطح","example":"black velvet surface"}]'::jsonb,
    '- نوع فلز و سنگ را دقیق بنویس.\n- برای محصولات کوچک، 100mm macro lens look جزئیات بیشتری می‌دهد.',
    'جواهرات، اکسسوری لوکس، کمپین فروش',
    array['Midjourney','Flux','Leonardo'], 'advanced', 'pro',
    (select id from public.categories where slug = 'luxury-visuals'), '/mock/jewelry.svg', true
  ),
  (
    'ویژوال برند لوکس ایرانی',
    'persian-luxury-brand-visual',
    'تصویر برندینگ با حس ایرانی، مدرن و لوکس برای کمپین‌ها.',
    'Create a premium visual identity scene for {brand_type}, inspired by refined Persian geometric motifs, modern luxury advertising style, elegant product display area, deep charcoal background, subtle indigo and violet accents, realistic materials, no text, no watermark.',
    null,
    '[{"key":"brand_type","label_fa":"نوع برند","example":"premium handmade gift brand"}]'::jsonb,
    '- نوع برند را دقیق بنویس اما از نام برندهای واقعی استفاده نکن.\n- refined Persian geometric motifs برای حس ایرانی کافی است.',
    'برندینگ، کمپین لوکس، هویت بصری ایرانی',
    array['Midjourney','Flux','ChatGPT Image'], 'advanced', 'pro',
    (select id from public.categories where slug = 'branding'), '/mock/persian-brand.svg', true
  )
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  prompt_text = excluded.prompt_text,
  negative_prompt = excluded.negative_prompt,
  variables = excluded.variables,
  usage_notes_fa = excluded.usage_notes_fa,
  best_for = excluded.best_for,
  model_compatibility = excluded.model_compatibility,
  difficulty = excluded.difficulty,
  access_level = excluded.access_level,
  category_id = excluded.category_id,
  cover_image_url = excluded.cover_image_url,
  is_published = excluded.is_published;

insert into public.prompt_tags (prompt_id, tag_id)
select p.id, t.id
from public.prompts p
join lateral unnest(
  case p.slug
    when 'luxury-perfume-product-photo' then array['luxury','product','realistic']
    when 'handmade-date-box' then array['food','ecommerce','realistic']
    when 'minimal-skincare-product' then array['minimal','product','realistic']
    when 'restaurant-burger-ad' then array['food','instagram','cinematic']
    when 'fashion-editorial-streetwear' then array['fashion','cinematic']
    when 'instagram-sale-story-background' then array['instagram']
    when 'coffee-shop-product-shot' then array['food','cinematic','product']
    when 'real-estate-interior-hero' then array['interior','luxury']
    when 'premium-packaging-mockup' then array['packaging','branding','luxury']
    when 'corporate-founder-portrait' then array['portrait','realistic']
    when 'jewelry-macro-product' then array['macro','luxury','product']
    when 'persian-luxury-brand-visual' then array['persian','branding','luxury']
    else array[]::text[]
  end
) tag_slug on true
join public.tags t on t.slug = tag_slug
on conflict do nothing;
