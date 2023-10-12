import { EntityNotFound } from '@/@shared/error/entity_not_found.error';

export class TopicNotFound extends EntityNotFound {
  entity = 'Topic';
}