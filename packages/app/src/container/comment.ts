import { createResolver } from '@injets/functional';
import { Services } from 'swagger:iforum';
import { HTTP_REQUEST } from './global';
import { GetCommentsUseCase } from '@/core/domain/comments/stories/get_comment.story';
import { FindCommentsByTopic } from '@/core/domain/comments/stories/find_comments_by_topic.story';
import { CreateCommentStory } from '../core/domain/comments/stories/create_comment.stories';

export const useCommentContainer = createResolver('comment', ({
  singleton,inject,
}) => {
  singleton(Services.Comments, () => new Services.Comments(inject(HTTP_REQUEST)));
  singleton(CreateCommentStory, () => new CreateCommentStory(inject(Services.Comments)));
  singleton(FindCommentsByTopic, () => new FindCommentsByTopic(inject(Services.Comments)));
  singleton(GetCommentsUseCase, () => new GetCommentsUseCase(inject(Services.Comments)));
});