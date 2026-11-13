// ذخیره تابع اصلی fetch مرورگر
const originalFetch = window.fetch;

// آدرس لوکال و آدرس سرور آنلاین
const LOCAL_API = 'http://localhost:5000';
const PROD_API = 'https://typicode.com';

// بازنویسی تابع fetch به صورت سراسری
window.fetch = async (url, options) => {
  // اگر در محیط آنلاین (Production) هستیم و آدرس با localhost:5000 شروع می‌شود
  if (import.meta.env.PROD && typeof url === 'string' && url.startsWith(LOCAL_API)) {
    const onlineUrl = url.replace(LOCAL_API, PROD_API);
    return originalFetch(onlineUrl, options);
  }

  // در محیط لوکال (Development) بدون تغییر اجرا می‌شود
  return originalFetch(url, options);
};
