import { ApplicationError } from './application.error';

export class ValidationError extends ApplicationError {
  name = 'ValidationError';
  statusCode = 422;
  info = {};
}