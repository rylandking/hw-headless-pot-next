export async function GET(req) {   
    return new Response(JSON.stringify({ uptime: process.uptime(), status: 'success' }), {
        status: 200,        
        headers: {
            'Content-Type': 'application/json',
        },
    });
}