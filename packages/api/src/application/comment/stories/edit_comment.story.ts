import { UserRepository } from '@/application/user/user.repository';
import { CommentRepository } from '../comment.repository';
import { Result } from '@/@shared/result';
import { UUID4 } from '@/@shared/vo/UUID4.vo';
import { Option } from '@/@shared/option';
import { UserNotAuthenticatedError } from '@/application/user/error/user_not_authenticated.error';
import { CommentNotFoundError } from '../error/comment_not_found.error';
import { UserIsNotAuthorOfComment } from '../error/user_is_not_author_of_comment.error';

export interface EditCommentInput {
  body: string;
  userId: string;
  commentId: string;
}

export class EditCommentStory {
  constructor (
    private readonly commentRepository: CommentRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(input: EditCommentInput) {
    
    const userIdResult = UUID4.of(input.userId);
    
    if (Result.isFail(userIdResult)) {
      return userIdResult;
    }
    
    const commentIdResult = UUID4.of(input.commentId);

    if (Result.isFail(commentIdResult)) {
      return commentIdResult;
    }

    const commentResult = await this.commentRepository.findById(commentIdResult.unwrap());

    if (Option.isNone(commentResult)) {
      return Result.fail(new CommentNotFoundError());
    }

    const userResult = await this.userRepository.findById(userIdResult.unwrap());

    if (Option.isNone(userResult)) {
      return Result.fail(new UserNotAuthenticatedError());
    }

    const author = userResult.unwrap();
    const comment = commentResult.unwrap();

    if (author.id.value !== comment.author.id.value) {
      return Result.fail(new UserIsNotAuthorOfComment());
    }

    const commentUpdateResult = comment.edit(input.body);

    if (Result.isFail(commentUpdateResult)) {
      return commentUpdateResult;
    }

    await this.commentRepository.update(comment);

    return Result.ok(comment);

  }
}






