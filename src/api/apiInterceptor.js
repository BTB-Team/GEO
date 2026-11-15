const originalFetch = window.fetch;
const LOCAL_API = 'http://localhost:5000';

let cachedDb = null;

window.fetch = async (url, options) => {
  if (import.meta.env.PROD && typeof url === 'string' && url.startsWith(LOCAL_API)) {
    if (!cachedDb) {
      const response = await originalFetch(`${import.meta.env.BASE_URL}db.json`);
      cachedDb = await response.json();
    }

    // اضافه شدن [0] و [1] برای دسترسی دقیق به نام بخش و شناسه
    const path = url.replace(`${LOCAL_API}/`, '').split('?')[0];
    const parts = path.split('/');
    
    let data = cachedDb[parts[0]];

    if (Array.isArray(data) && parts[1]) {
      data = data.find((item) => String(item.id) === String(parts[1])) || {};
    }

    return new Response(JSON.stringify(data || {}), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return originalFetch(url, options);
};
