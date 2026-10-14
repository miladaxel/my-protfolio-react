import content from './content.json';

// Static snapshot of the public portfolio content. No runtime API or database.
export const { profile, skillGroups, projects } = content;

export const services = [
  { mark: '{ }', title: { en: 'Backend systems', fa: 'سیستم‌های بک‌اند' }, description: { en: 'Django applications with clear data models, reliable business logic, authentication, and maintainable admin workflows.', fa: 'اپلیکیشن‌های جنگو با مدل دادهٔ روشن، منطق کسب‌وکار قابل‌اعتماد، احراز هویت و فرایندهای مدیریتی قابل نگه‌داری.' } },
  { mark: 'API', title: { en: 'APIs & integrations', fa: 'API و یکپارچه‌سازی' }, description: { en: 'Practical APIs and service connections built around predictable contracts, useful errors, and secure data flow.', fa: 'APIهای کاربردی و اتصال سرویس‌ها با قراردادهای قابل پیش‌بینی، خطاهای راهگشا و جریان امن داده.' } },
  { mark: 'UI', title: { en: 'Web interfaces', fa: 'رابط‌های وب' }, description: { en: 'Responsive, accessible interfaces that make complex workflows feel direct on desktop, tablet, and mobile.', fa: 'رابط‌های واکنش‌گرا و دسترس‌پذیر که فرایندهای پیچیده را در دسکتاپ، تبلت و موبایل ساده و مستقیم می‌کنند.' } },
];

export function assetUrl(path) {
  return `${import.meta.env.BASE_URL}${path}`;
}

export function localized(value, language) {
  return value?.[language] ?? value?.en ?? '';
}
