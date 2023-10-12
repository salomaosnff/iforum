import { TopicEntity } from '@/core/topic/topic.entity';
import * as UserPresenter from '../user/user.presenter';

export function publicPresenter (topic: TopicEntity) {
  return {
    id: topic.id.value,
    title: topic.title,
    slug: topic.slug.value,
    body: topic.body,
    rate: topic.rate,
    author: UserPresenter.publicPresenter(topic.author),
  };
}