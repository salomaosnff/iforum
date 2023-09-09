export class UserEmailAlreadyRegisteredError extends Error{
  name = 'UserEmailAlreadyRegisteredError';
  message = 'Email already registered';
}