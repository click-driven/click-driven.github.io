// 1. Replace this with your actual Cloudflare Worker URL
const TRACKING_URL = 'https://meta-pixel-wk.adam-342.workers.dev';

function triggerMetaPageView() {
    // window.location.href captures the EXACT full URL in the browser bar
    const fullUrl = (window.location.href);

    // We use a simple fetch to "ping" the worker
    fetch(TRACKING_URL, {
        method: 'POST', // Switched to POST to send data cleanly
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            landing_page: currentFullUrl
        })
    })
        .then(res => console.log('Meta PageView sent for:', currentFullUrl))
        .catch(err => console.error('Tracking Error:', err));
}


// 2. Run the function when the page is fully loaded
if (document.readyState === 'complete') {
    triggerMetaPageView();
} else {
    window.addEventListener('load', triggerMetaPageView);
}