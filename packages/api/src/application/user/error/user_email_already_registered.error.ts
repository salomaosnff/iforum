import { ApplicationError } from '@/@shared/error/application.error';

export class UserEmailAlreadyRegisteredError extends ApplicationError{
  name = 'UserEmailAlreadyRegisteredError';
  message = 'Email already registered';
  statusCode = 409;
  info = {};
}