import { ApplicationError } from '@/@shared/error/application.error';

export class UserNotAuthenticatedError extends ApplicationError {
  name = 'UserNotAuthenticatedError';
  message = 'User Not Authenticated!';
  statusCode = 401;
  info = {};
}