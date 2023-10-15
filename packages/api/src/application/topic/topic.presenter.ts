import { TopicEntity } from '@/core/topic/topic.entity';
import * as UserPresenter from '../user/user.presenter';
import { Option } from '@/@shared/option';

export function publicPresenter (topic: TopicEntity) {
  return {
    id: topic.id.value,
    title: topic.title,
    slug: topic.slug.value,
    body: topic.body,
    rate: topic.rate,
    author: UserPresenter.publicPresenter(topic.author),
    tags: topic.tags,
    createdAt: topic.createdAt,
    editedAt: Option.isSome(topic.editedAt) ? topic.editedAt.unwrap() : null,
  };
}