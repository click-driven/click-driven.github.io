export async function onRequest(context) {
    const { request, env } = context;

    // 1. Get the pixel data from your environment variables (Safe & Hidden)
    const PIXEL_ID = env.FB_PIXEL_ID;
    const ACCESS_TOKEN = env.FB_ACCESS_TOKEN;

    // 2. Prepare the data for Meta
    const payload = {
        data: [{
            event_name: 'PageView',
            event_time: Math.floor(Date.now() / 1000),
            action_source: 'website',
            user_data: {
                // We leave out IP and Cookies! 
                // We only send the Browser User Agent so Meta knows it's a real person.
                client_user_agent: request.headers.get('user-agent'),
            },
        }],
    };

    // 3. Send it to Meta
    await fetch(`https://graph.facebook.com/v18.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    return new Response(JSON.stringify({ status: 'sent_anonymously' }), {
        headers: { 'Content-Type': 'application/json' },
    });
}