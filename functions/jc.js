// 1. Replace this with your actual Cloudflare Worker URL
const TRACKING_URL = 'https://meta-pixel-wk.adam-342.workers.dev';

function triggerMetaPageView() {
    // 1. Define the variable
    const currentFullUrl = window.location.href;

    // 2. Use that SAME variable name below
    fetch(TRACKING_URL, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            landing_page: currentFullUrl // This now matches the variable above
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