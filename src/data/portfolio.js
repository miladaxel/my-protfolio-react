// All content is fictional demo data. Replace it here to personalize the site.
// Asset paths are relative to public/. No database or API is involved.
export const profile = {
  name: { en: 'Alex', fa: 'الکس' },
  initials: 'A',
  role: { en: 'Python & web developer', fa: 'توسعه‌دهنده پایتون و وب' },
  shortBio: {
    en: 'I turn ideas into maintainable web applications and thoughtful digital experiences, with Python, Django, and React.',
    fa: 'ایده‌ها را با پایتون، جنگو و React به اپلیکیشن‌های قابل نگه‌داری و تجربه‌های دقیق و روشن تبدیل می‌کنم.',
  },
  bio: {
    en: ['I enjoy working where clear data models meet useful interfaces. My approach starts with understanding the problem, then building the smallest dependable solution.', 'These sample projects explore the kind of work I like: thoughtful backend systems, predictable APIs, and interfaces that make everyday tasks easier.'],
    fa: ['به ساخت محصولاتی علاقه دارم که مدل داده روشن و رابط کاربردی دارند. ابتدا مسئله را می‌شناسم و بعد کوچک‌ترین راه‌حل قابل‌اعتماد را می‌سازم.', 'این پروژه‌های نمایشی، حوزه‌های موردعلاقه‌ام را نشان می‌دهند: سیستم‌های بک‌اند، APIهای قابل پیش‌بینی و رابط‌هایی که کارهای روزمره را ساده می‌کنند.'],
  },
  experience: { en: '4y', fa: '۴ سال' },
  // Set real URLs/email before publishing a personal version. Null hides links.
  email: null,
  githubUrl: null,
  linkedinUrl: null,
  resume: 'resume.txt',
};

export const skillGroups = [
  { id: 'backend', title: { en: 'Backend', fa: 'بک‌اند' }, skills: [
    { title: 'Python', mark: 'Py' }, { title: 'Django', mark: 'dj' }, { title: 'REST APIs', mark: '{}' },
  ] },
  { id: 'frontend', title: { en: 'Frontend', fa: 'فرانت‌اند' }, skills: [
    { title: 'React', mark: 'Re' }, { title: 'JavaScript', mark: 'JS' }, { title: 'Tailwind CSS', mark: 'Tw' },
  ] },
  { id: 'tools', title: { en: 'Data & tools', fa: 'داده و ابزارها' }, skills: [
    { title: 'PostgreSQL', mark: 'Pg' }, { title: 'Git', mark: 'Gt' }, { title: 'Docker', mark: 'Dk' },
  ] },
];

export const projects = [
  {
    slug: 'northstar-commerce',
    title: { en: 'Northstar commerce', fa: 'فروشگاه نورث‌استار' },
    shortDescription: { en: 'A sample shop dashboard that brings orders, products, and inventory into one clear workspace.', fa: 'داشبورد نمایشی فروشگاه برای مدیریت سفارش‌ها، محصولات و موجودی در یک فضای روشن.' },
    description: {
      en: ['Northstar is an illustrative commerce project built around a simple question: how can a small shop manage its day without juggling separate tools?', 'The proposed architecture separates catalog, order, and inventory logic. A dashboard surfaces useful summaries while keeping everyday actions easy to find. All figures and previews shown here are fictional.'],
      fa: ['نورث‌استار یک پروژه نمایشی فروشگاهی است با این پرسش: یک فروشگاه کوچک چطور می‌تواند بدون چند ابزار جداگانه، کارهای روزانه‌اش را مدیریت کند؟', 'در معماری پیشنهادی، منطق کاتالوگ، سفارش و موجودی جدا شده است. داشبورد خلاصه‌های کاربردی را در کنار کارهای روزمره نشان می‌دهد. همه اعداد و تصاویر این مطالعه موردی ساختگی‌اند.'],
    },
    year: '2026', status: 'completed', featured: true,
    skills: ['Python', 'Django', 'PostgreSQL', 'React'],
    thumbnail: 'images/commerce.svg',
    features: [
      { title: { en: 'Order workspace', fa: 'فضای سفارش‌ها' }, description: { en: 'Review order status and customer details in one place.', fa: 'بررسی وضعیت سفارش و اطلاعات مشتری در یک صفحه.' } },
      { title: { en: 'Inventory overview', fa: 'نمای موجودی' }, description: { en: 'Highlight low-stock products before they interrupt sales.', fa: 'نمایش محصولات کم‌موجودی پیش از ایجاد وقفه در فروش.' } },
      { title: { en: 'Clear reporting', fa: 'گزارش‌های روشن' }, description: { en: 'Simple daily summaries rather than overwhelming charts.', fa: 'خلاصه‌های روزانه ساده برای تصمیم‌گیری بهتر.' } },
    ],
    images: [
      { src: 'images/commerce.svg', caption: { en: 'Illustrative overview with fictional sales and orders.', fa: 'نمای کلی نمونه با سفارش‌ها و فروش ساختگی.' } },
      { src: 'images/commerce-orders.svg', caption: { en: 'A sample order list with fictional customer records.', fa: 'فهرست سفارش‌های نمایشی با مشتری‌های ساختگی.' } },
    ],
    githubUrl: null, linkedinUrl: null,
  },
  {
    slug: 'focus-workspace',
    title: { en: 'Focus workspace', fa: 'فضای کار فوکوس' },
    shortDescription: { en: 'An illustrative team board that makes priorities, owners, and next steps easy to see.', fa: 'برد نمایشی تیم برای مشاهده آسان اولویت‌ها، مسئولیت‌ها و قدم‌های بعدی.' },
    description: {
      en: ['Focus explores a calmer way to coordinate a small team. Tasks move through a few clear stages, with ownership and context visible on each card.', 'This sample case study describes a possible product design, not a live service. The board and task records are static mock content.'],
      fa: ['فوکوس راهی ساده‌تر برای هماهنگی یک تیم کوچک را بررسی می‌کند. هر کار از چند مرحله مشخص عبور می‌کند و مسئول و توضیحات آن روی کارت دیده می‌شود.', 'این مطالعه موردی نمونه‌ای از طراحی یک محصول است. برد و اطلاعات کارها نمایشی و ثابت هستند و سرویس زنده‌ای پشت آن وجود ندارد.'],
    },
    year: '2026', status: 'completed', featured: true,
    skills: ['React', 'JavaScript', 'Tailwind CSS'], thumbnail: 'images/workspace.svg',
    features: [
      { title: { en: 'Readable task cards', fa: 'کارت‌های خوانا' }, description: { en: 'Show the task, owner, and priority at a glance.', fa: 'نمایش کار، مسئول و اولویت در یک نگاه.' } },
      { title: { en: 'Small, clear stages', fa: 'مراحل ساده و روشن' }, description: { en: 'A lightweight workflow from planning to completion.', fa: 'گردش کار سبک از برنامه‌ریزی تا تکمیل.' } },
      { title: { en: 'Responsive layout', fa: 'چیدمان واکنش‌گرا' }, description: { en: 'Keep the same context on desktop and mobile.', fa: 'حفظ اطلاعات مهم در دسکتاپ و موبایل.' } },
    ],
    images: [{ src: 'images/workspace.svg', caption: { en: 'A sample board; cards and team members are fictional.', fa: 'برد نمونه؛ اعضای تیم و کارت‌ها ساختگی‌اند.' } }],
    githubUrl: null, linkedinUrl: null,
  },
  {
    slug: 'pulse-api-monitor',
    title: { en: 'Pulse API monitor', fa: 'پایشگر API پالس' },
    shortDescription: { en: 'A sample monitoring interface for understanding endpoint health and response times.', fa: 'رابط نمایشی پایش سلامت سرویس‌ها و زمان پاسخ‌گویی API.' },
    description: {
      en: ['Pulse is a concept for making service health easier to understand. Instead of burying signals in logs, it groups availability, latency, and recent events into one view.', 'The sample design uses clear status labels and a compact endpoint list. Metrics and incident history are fictional examples; no services are monitored by this portfolio.'],
      fa: ['پالس یک ایده برای فهم آسان‌تر وضعیت سرویس‌هاست. دسترس‌پذیری، زمان پاسخ و رویدادهای اخیر به‌جای پراکندگی در لاگ‌ها، در یک نما جمع می‌شوند.', 'طراحی نمونه از وضعیت‌های روشن و فهرستی فشرده از endpointها استفاده می‌کند. معیارها و رویدادها ساختگی‌اند و این پورتفولیو هیچ سرویسی را پایش نمی‌کند.'],
    },
    year: '2025', status: 'in-progress', featured: true,
    skills: ['Python', 'REST APIs', 'Docker'], thumbnail: 'images/monitor.svg',
    features: [
      { title: { en: 'Endpoint overview', fa: 'نمای endpointها' }, description: { en: 'Bring response time and availability into one list.', fa: 'نمایش زمان پاسخ و دسترس‌پذیری در یک فهرست.' } },
      { title: { en: 'Useful status labels', fa: 'وضعیت‌های کاربردی' }, description: { en: 'Pair color with text so status never relies on color alone.', fa: 'ترکیب متن و رنگ برای فهم وضعیت بدون وابستگی به رنگ.' } },
      { title: { en: 'Event timeline', fa: 'خط زمانی رویدادها' }, description: { en: 'Give recent changes enough context to investigate.', fa: 'نمایش تغییرات اخیر با جزئیات لازم برای بررسی.' } },
    ],
    images: [{ src: 'images/monitor.svg', caption: { en: 'Fictional service metrics in an illustrative dashboard.', fa: 'معیارهای ساختگی سرویس‌ها در یک داشبورد نمایشی.' } }],
    githubUrl: null, linkedinUrl: null,
  },
];

export const services = [
  { mark: '{ }', title: { en: 'Backend systems', fa: 'سیستم‌های بک‌اند' }, description: { en: 'Django applications with clear data models, reliable business logic, and maintainable admin workflows.', fa: 'اپلیکیشن‌های جنگو با مدل داده روشن، منطق کسب‌وکار قابل‌اعتماد و فرایندهای مدیریتی قابل نگه‌داری.' } },
  { mark: 'API', title: { en: 'APIs & integrations', fa: 'API و یکپارچه‌سازی' }, description: { en: 'Practical APIs and service connections built around predictable contracts and useful errors.', fa: 'APIهای کاربردی و اتصال سرویس‌ها با قراردادهای قابل پیش‌بینی و خطاهای راهگشا.' } },
  { mark: 'UI', title: { en: 'Web interfaces', fa: 'رابط‌های وب' }, description: { en: 'Responsive, accessible interfaces that make complex workflows feel direct on every screen.', fa: 'رابط‌های واکنش‌گرا و دسترس‌پذیر که فرایندهای پیچیده را در هر صفحه ساده می‌کنند.' } },
];

export function assetUrl(path) {
  return `${import.meta.env.BASE_URL}${path}`;
}

export function localized(value, language) {
  return value?.[language] ?? value?.en ?? '';
}
