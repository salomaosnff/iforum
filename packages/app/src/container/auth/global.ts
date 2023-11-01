import { createResolver, type Token } from '@injets/functional';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const HTTP_REQUEST: Token<any> = Symbol('HTTP_REQUEST');

export const useGlobalContainer = createResolver('Global', ({
  global, singleton, 
}) => {
  global();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  singleton(HTTP_REQUEST, () => async (request: any) => {
    const response = await fetch(request.url, {
      credentials: 'include',
      ...request,
    });

    return {
      status: response.status,
      headers: response.headers,
      data: await response.json(),
    };
  }, true);
});