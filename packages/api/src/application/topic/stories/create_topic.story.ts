import { TopicEntity } from '@/core/topic/topic.entity';
import { TopicRepository } from '../topic.repository';
import { UserRepository } from '@/application/user/user.repository';
import { Result } from '@/@shared/result';
import { Option } from '@/@shared/option';
import { UserNotAuthenticatedError } from '@/application/user/error/user_not_authenticated.error';
import { Slug } from '@/@shared/vo/slug.vo';
import { UUID4 } from '@/@shared/vo/UUID4.vo';
import { ValidationError } from '@/@shared/error/validation.error';


export interface CreateTopicStoryInput {
    title: string;
    body: string;
    slug?: string;
    authorId: string;
    tags?: string[];
}

export class CreateTopicStory {
  constructor(
        private readonly topicRepository: TopicRepository,
        private readonly userRepository: UserRepository,
  ) {}

  async execute(input: CreateTopicStoryInput): Promise<Result<TopicEntity, UserNotAuthenticatedError | ValidationError> >{
    if (!input) {
      return Result.fail(new ValidationError('missing topic fields!'));
    }
    
    if (!input.authorId){
      return Result.fail(new UserNotAuthenticatedError());
    }
    
    if (!input.title){
      return Result.fail(new ValidationError('missing title!'));
    }

    const userResult = await this.userRepository.findById(UUID4.of(input.authorId).unwrap());
        
    if (Option.isNone(userResult)) {
      return Result.fail(new UserNotAuthenticatedError());
    }

    const slugResult = input.slug ? Slug.of(input.slug) : Slug.ofText(input.title);

    if (Result.isFail(slugResult)) {
      return Result.fail(slugResult.error);
    }

    const topicResult = TopicEntity.of({
      author: userResult.unwrap(),
      slug: slugResult.unwrap(),
      title: input.title,
      body: input.body,
      tags: input.tags,
    });

    if (Result.isFail(topicResult)) {
      return Result.fail(topicResult.error);
    }

    const topic = topicResult.unwrap();

    await this.topicRepository.create(topic);

    return Result.ok(topic);
  }
}