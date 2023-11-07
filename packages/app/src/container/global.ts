import { type Token } from '@injets/core';
import { createResolver } from '@injets/functional';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const HTTP_REQUEST: Token<any> = Symbol('HTTP_REQUEST');

class HttpError extends Error {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(public readonly response: any) {
    super();

    if (response.status >= 400) {
      this.message = `Server responded is ${response.status}`;
    }
  }

}

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

    const mappedResponse = {
      status: response.status,
      headers: response.headers,
      data: await response.json(),
    };

    if (mappedResponse.status >= 200 && mappedResponse.status < 300) {
      return mappedResponse;
    }

    throw new HttpError(mappedResponse);
  }, true);
});