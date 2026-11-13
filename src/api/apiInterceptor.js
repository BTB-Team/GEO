const originalFetch = window.fetch;
const LOCAL_API = 'http://localhost:5000';

let cachedDb = null;

window.fetch = async (url, options) => {
  if (import.meta.env.PROD && typeof url === 'string' && url.startsWith(LOCAL_API)) {
    if (!cachedDb) {
      const response = await originalFetch(`${import.meta.env.BASE_URL}db.json`);
      cachedDb = await response.json();
    }

    const path = url.replace(`${LOCAL_API}/`, '').split('?');
    const parts = path.split('/');
    
    let data = cachedDb[parts];

    if (Array.isArray(data) && parts) {
      data = data.find((item) => String(item.id) === String(parts)) || {};
    }

    return new Response(JSON.stringify(data || {}), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return originalFetch(url, options);
};
