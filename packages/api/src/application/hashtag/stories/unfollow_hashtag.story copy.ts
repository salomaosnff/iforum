import { UserRepository } from '@/application/user/user.repository';
import { HashtagRepository } from '../hashtag.repository';
import { Result } from '@/@shared/result';
import { Option } from '@/@shared/option';
import { UserNotAuthenticatedError } from '@/application/user/error/user_not_authenticated.error';
import { ValidationError } from '@/@shared/error/validation.error';
import { InvalidUUID4Error, UUID4 } from '@/@shared/vo/UUID4.vo';

export interface UnFollowHashtagInput {
  hashtag: string
  userId: string
}

export class UnFollowHashtagStory {
  constructor(private readonly userRepository: UserRepository, private readonly hashtagRepository: HashtagRepository) { }

  async execute(input: UnFollowHashtagInput): Promise<Result<void, InvalidUUID4Error | UserNotAuthenticatedError>> {
    if (!input) {
      return Result.fail(new ValidationError('missing input'));
    }

    const userIdResult = UUID4.of(input.userId);

    if (Result.isFail(userIdResult)) {
      return Result.fail(userIdResult.error);
    }

    if (!input.hashtag) {
      return Result.fail(new ValidationError('missing hashtag'));
    }

    const userResult = await this.userRepository.findById(userIdResult.unwrap());

    if (Option.isNone(userResult)) {
      return Result.fail(new UserNotAuthenticatedError());
    }

    await this.hashtagRepository.unfollow(input.hashtag, userResult.unwrap());

    return Result.ok();
  }
}