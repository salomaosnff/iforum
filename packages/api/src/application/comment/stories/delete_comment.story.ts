import { UserRepository } from '@/application/user/user.repository';
import { CommentRepository } from '../comment.repository';
import { Result } from '@/@shared/result';
import { UUID4 } from '@/@shared/vo/UUID4.vo';
import { Option } from '@/@shared/option';
import { CommentNotFoundError } from '../error/comment_not_found.error';
import { UserNotAuthenticatedError } from '@/application/user/error/user_not_authenticated.error';

export interface DeleteCommentInput {
  commentId: string;
  userId: string;
}

export class DeleteCommentStory {
  constructor (
    private readonly commentRepository: CommentRepository,
    private readonly userRepository: UserRepository,
  ) {}


  async execute(input: DeleteCommentInput) {

    const commentId = UUID4.of(input.commentId);

    if (Result.isFail(commentId)) {
      return commentId;
    }

    const userId = UUID4.of(input.userId);

    if (Result.isFail(userId)) {
      return userId;
    }

    const userResult = await this.userRepository.findById(userId.unwrap());

    if (Option.isNone(userResult)) {
      return Result.fail(new UserNotAuthenticatedError());
    }

    const commentResult = await this.commentRepository.findById(commentId.unwrap());

    if (Option.isNone(commentResult)) {
      return Result.fail(new CommentNotFoundError());
    }
    
    const deleteResult = await this.commentRepository.delete(commentResult.unwrap());

    if (Result.isFail(deleteResult)) {
      return deleteResult;
    }

    return Result.ok();

  }
}
