import {MiddlewareRequest, NextRequest} from '@netlify/next';

export async function middleware(request: NextRequest) {
  const netlifyMiddlewareRequest = new MiddlewareRequest(request);

  // Coming to page, rewrite to homepage but change content
  if (request.nextUrl.pathname.startsWith('/page')) {
    const res = await netlifyMiddlewareRequest.rewrite(new URL('/', request.url));

    const message = `This was static but has been transformed in ${request.geo.city} - you came to the page route but are shown the homepage`;

    res.setPageProp('message', message);
    res.replaceText('#message', message);

    return res;
  }
}
