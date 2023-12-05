import { createResolver } from '@injets/functional'; 
import { Services } from 'swagger:iforum';
import { HTTP_REQUEST } from './global';
import { CreateTopicStory } from '@/core/domain/topic/stories/create_topic.story';
import { FindTopicBySlug } from '@/core/domain/topic/stories/find_topic_by_slug.story';
import { GetFeedUseCase } from '@/core/domain/topic/stories/get_feed.story';
import { RateTopicStory } from '@/core/domain/topic/stories/rate_topic.story';

export const useTopicContainer = createResolver('create', ({
  singleton,inject,
}) => {
  singleton(Services.Topics, () => new Services.Topics(inject(HTTP_REQUEST))),
  singleton(CreateTopicStory, () => new CreateTopicStory(inject(Services.Topics)));
  singleton(FindTopicBySlug, () => new FindTopicBySlug(inject(Services.Topics)));
  singleton(GetFeedUseCase, () => new GetFeedUseCase(inject(Services.Topics)));
  singleton(RateTopicStory, () => new RateTopicStory(inject(Services.Topics)));
});