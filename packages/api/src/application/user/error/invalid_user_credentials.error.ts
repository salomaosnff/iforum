import { ApplicationError } from '@/@shared/error/application.error';

export class InvalidUserCredentialsError extends ApplicationError{
  name = 'InvalidUserCredentialsError';
  message = 'Invalid user credentials';
  statusCode = 401;
  info = {};
}