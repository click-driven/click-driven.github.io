// 1. Replace this with your actual Cloudflare Worker URL
const TRACKING_URL = 'https://meta-pixel-wk.adam-342.workers.dev';

function triggerMetaPageView() {
    const currentFullUrl = window.location.href;

    fetch(TRACKING_URL, {
        method: 'GET', // GET is faster and simpler for headers
        mode: 'cors',
        headers: {
            'x-landing-page': currentFullUrl // Send the URL here
        }
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