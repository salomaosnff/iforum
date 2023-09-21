import { Option } from "@/@shared/option";
import { Paged } from "@/@shared/paged";
import { Result } from "@/@shared/result";
import { TopicRepository } from "@/application/topic/topic.repository";
import { UserNotAuthenticatedError } from "@/application/user/error/user_not_authenticated.error";
import { UserRepository } from "@/application/user/user.repository";
import { TopicEntity } from "@/core/topic/topic.entity";
import { UserEntity } from "@/core/user/user.entity";

export interface GetFeedInput {
  userId: UserEntity['id']
}

export class GetFeedStory {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly topicRepository: TopicRepository
  ) { }

  async execute(input: GetFeedInput): Promise<Result<Paged<TopicEntity>, UserNotAuthenticatedError>> {
    const userResult = await this.userRepository.findById(input.userId);

    if (Option.isNone(userResult)) {
      return Result.fail(new UserNotAuthenticatedError())
    }

    return Result.ok(await this.topicRepository.findByUserFeed(userResult.unwrap()))
  }
}