export abstract class ApplicationError extends Error{
  name = 'ApplicationError';
  statusCode = 500;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  abstract info?: Record<string,any>;
}