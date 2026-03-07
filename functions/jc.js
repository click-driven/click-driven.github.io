// Send anonymous page load performance data
const TRACKING_URL = 'https://page-load-wrkr.adam-342.workers.dev';

function triggerPageView() {
    // encodeURIComponent ensures special characters like / and ? don't break the URL
    const currentFullUrl = encodeURIComponent(window.location.href);

    fetch(`${TRACKING_URL}?page_url=${currentFullUrl}`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-store'
    })
        .then(res => console.log('PageView sent successfully'))
        .catch(err => console.error('Tracking Error:', err));
}

// Only fire ONCE when the window is fully loaded
window.addEventListener('load', triggerPageView, { once: true });