// 1. Replace this with your actual Cloudflare Worker URL
const TRACKING_URL = 'https://meta-pixel-wk.adam-342.workers.dev';

function triggerMetaPageView() {
    // window.location.href captures the EXACT full URL in the browser bar
    const fullUrl = encodeURIComponent(window.location.href);

    // We use a simple fetch to "ping" the worker
    fetch(`${TRACKING_URL}?page_url=${fullUrl}`, {
        method: 'GET',
        mode: 'cors',    // Required to allow the browser to talk to a different domain
        cache: 'no-store'
    })
        .then(response => {
            if (response.ok) {
                console.log('✅ Meta PageView successfully triggered via Cloudflare');
            }
        })
        .catch(error => {
            // This will catch if an ad-blocker stops the request
            console.error('❌ Tracking failed:', error);
        });
}

// 2. Run the function when the page is fully loaded
if (document.readyState === 'complete') {
    triggerMetaPageView();
} else {
    window.addEventListener('load', triggerMetaPageView);
}