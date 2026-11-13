const originalFetch = window.fetch;

const LOCAL_API = 'http://localhost:5000';
const GITHUB_DB_URL = 'https://githubusercontent.com';

let cachedDb = null;

window.fetch = async (url, options) => {
  // فقط در نسخه آنلاین (GitHub Pages) درخواست‌های پورت ۵۰۰۰ را رهگیری می‌کنیم
  if (import.meta.env.PROD && typeof url === 'string' && url.startsWith(LOCAL_API)) {
    // اگر فایل db.json هنوز دانلود نشده، یک بار از گیت‌هاب می‌گیریم
    if (!cachedDb) {
      const response = await originalFetch(GITHUB_DB_URL);
      cachedDb = await response.json();
    }

    // استخراج نام بخش درخواستی از آدرس (مثلاً homepageContent از http://localhost:5000/homepageContent)
    const endpoint = url.replace(`${LOCAL_API}/`, '').split('?')[0];
    const data = cachedDb[endpoint] || {};

    // ساخت یک پاسخ شبیه‌سازی‌شده دقیقاً شبیه json-server
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return originalFetch(url, options);
};
