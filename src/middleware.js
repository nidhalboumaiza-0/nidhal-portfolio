// Vercel Edge Middleware for Agent Content Negotiation
// Handles requests with Accept: text/markdown before static files are served

export const config = {
  matcher: ['/', '/index.html']
};

export default async function middleware(request) {
  const accept = request.headers.get('accept') || '';
  
  if (accept.includes('text/markdown')) {
    const markdownUrl = new URL('/api/markdown', request.url);
    const response = await fetch(markdownUrl);
    const text = await response.text();
    const tokens = response.headers.get('x-markdown-tokens') || Math.round(text.length / 4).toString();
    
    return new Response(text, {
      status: 200,
      headers: {
        'content-type': 'text/markdown; charset=utf-8',
        'x-markdown-tokens': tokens,
        'vary': 'accept',
        'access-control-allow-origin': '*',
        'access-control-allow-methods': 'GET, OPTIONS'
      }
    });
  }
}
