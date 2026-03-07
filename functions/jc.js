// 1. Replace this with your actual Cloudflare Worker URL
const TRACKING_URL = 'https://meta-pixel-wk.adam-342.workers.dev';

function triggerMetaPageView() {
    // encodeURIComponent ensures special characters like / and ? don't break the URL
    const currentFullUrl = encodeURIComponent(window.location.href);

    fetch(`${TRACKING_URL}?page_url=${currentFullUrl}`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-store'
    })
        .then(res => console.log('Meta PageView sent successfully'))
        .catch(err => console.error('Tracking Error:', err));
}

// Only fire ONCE when the window is fully loaded
window.addEventListener('load', triggerMetaPageView, { once: true });