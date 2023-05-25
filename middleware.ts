import {MiddlewareRequest, NextRequest} from '@netlify/next';

export async function middleware(request: NextRequest) {
  const netlifyMiddlewareRequest = new MiddlewareRequest(request);

  // This works just rewriting the request to the index page
  if (request.nextUrl.pathname.startsWith('/rewrites')) {
    const res = await netlifyMiddlewareRequest.rewrite(new URL('/', request.url));

    return res;
  }

  // This works just updatng the page props and content
  if (request.nextUrl.pathname.startsWith('/changes-props')) {
    const page = await netlifyMiddlewareRequest.next();

    const message = `This was static but has been transformed in ${request.geo.city} - you came to the page route but are shown the homepage`;

    page.setPageProp('message', message);
    page.replaceText('#message', message);

    return page;
  }

  // This fails with error about not setPageProp
  // based on the docs https://docs.netlify.com/integrations/frameworks/next-js/middleware/?_gl=1%2ahuuwhy%2a_gcl_au%2aNDUwNjY0MjU3LjE2ODQxNjgzNzU.&_ga=2.145646900.1046593485.1685028022-945217984.1668549303#middlewareresponse-object
  // this res should be a MiddlewareResponse and behave the same as .next()
  if (request.nextUrl.pathname.startsWith('/both')) {
    const res = await netlifyMiddlewareRequest.rewrite(new URL('/', request.url));

    const message = `This was static but has been transformed in ${request.geo.city} - you came to the page route but are shown the homepage`;

    res.setPageProp('message', message);

    return res;
  }

  // This 404s because the rewrite is not returned
  if (request.nextUrl.pathname.startsWith('/alternative-both')) {
    const res = await netlifyMiddlewareRequest.rewrite(new URL('/', request.url));
    // trying to use next before setting props
    const finalRes = await netlifyMiddlewareRequest.next();

    const message = `This was static but has been transformed in ${request.geo.city} - you came to the page route but are shown the homepage`;

    finalRes.setPageProp('message', message);

    return finalRes;
  }
}
