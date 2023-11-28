import { CommentRepository } from '../comment.repository';
import { Result } from '@/@shared/result';
import { InvalidUUID4Error } from '@/@shared/vo/UUID4.vo';
import { Paged } from '@/@shared/paged';
import { CommentEntity } from '@/core/comment/comment.entity';
import { TopicRepository } from '@/application/topic/topic.repository';
import { Slug } from '@/@shared/vo/slug.vo';
import { Option } from '@/@shared/option';
import { TopicNotFound } from '@/application/topic/error/topic_not_found';

export interface FindCommentsByTopicInput {
  topicSlug: string;
  page?: number
  size?: number
}

export class FindCommentsByTopicStory {
  constructor (
    private readonly commentRepository: CommentRepository, private readonly topicRepository: TopicRepository,
  ) {}

  async execute(input: FindCommentsByTopicInput): Promise<Result<Paged<CommentEntity>, InvalidUUID4Error>> {
    const topic = await this.topicRepository.findBySlug(Slug.ofText(input.topicSlug).unwrap());
    if (Option.isNone(topic)) {
      return Result.fail(new TopicNotFound);
    }

    return this.commentRepository.findByTopicId(topic.unwrap().id, {
      page: input.page ?? 1,
      size: input.size ?? 20,
    });
  }
}






