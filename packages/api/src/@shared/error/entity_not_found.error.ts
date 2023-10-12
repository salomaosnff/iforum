import { ApplicationError } from './application.error';

export class EntityNotFound extends ApplicationError {
  name = 'EntityNotFound';
  entity = 'Entidade';
  statusCode = 404;
  get message(){
    return `${this.entity} not found!`;
  }
  get info(){
    return { entity: this.entity };
  }
}