import { createResolver } from '@injets/functional';
import { Services } from 'swagger:iforum';
import { HTTP_REQUEST } from './global';
import { CreateTopicStory } from '@/core/domain/topic/stories/create_topic.story';
import { FindTopicBySlug } from '@/core/domain/topic/stories/find_topic_by_slug.story';

export const useTopicContainer = createResolver('create', ({
  singleton,inject,
}) => {
  singleton(Services.Topics, () => new Services.Topics(inject(HTTP_REQUEST))),
  singleton(CreateTopicStory, () => new CreateTopicStory(inject(Services.Topics)));
  singleton(FindTopicBySlug, () => new FindTopicBySlug(inject(Services.Topics)));
});