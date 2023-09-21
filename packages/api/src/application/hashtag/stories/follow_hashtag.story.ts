import { UserRepository } from "@/application/user/user.repository";
import { HashtagRepository } from "../hashtag.repository";
import { UserEntity } from "@/core/user/user.entity";
import { Result } from "@/@shared/result";
import { Option } from "@/@shared/option";
import { UserNotAuthenticatedError } from "@/application/user/error/user_not_authenticated.error";

export interface FollowHashtagInput {
  hashtag: string
  userId: UserEntity['id']
}

export class FollowHashtagStory {
  constructor(private readonly userRepository: UserRepository, private readonly hashtagRepository: HashtagRepository) { }

  async execute(input: FollowHashtagInput): Promise<Result<void, UserNotAuthenticatedError>> {
    const userResult = await this.userRepository.findById(input.userId);

    if (Option.isNone(userResult)) {
      return Result.fail(new UserNotAuthenticatedError())
    }

    await this.hashtagRepository.follow(input.hashtag, userResult.unwrap())

    return Result.ok()
  }
}