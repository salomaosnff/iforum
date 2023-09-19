import { UserEntity } from '@/core/user/user.entity';
import { UserRepository } from '../user.repository';
import { ValidationError } from '@/@shared/error/validation.error';
import { Result } from '@/@shared/result';
import { Option } from '@/@shared/option';
import { UserEmailAlreadyRegisteredError } from '../error/user_email_already_registered.error';
import { AcademicEmail, InvalidAcademicEmailError } from '@/@shared/vo/academic_email.vo';


export class RegisterUserStory{
  constructor(private readonly userRepository: UserRepository){

  }

  async execute(data: RegisterUserStoryInput): Promise<Result<UserEntity, ValidationError | UserEmailAlreadyRegisteredError | InvalidAcademicEmailError>>{
    const userResult = AcademicEmail.of(data.email).map((email) => UserEntity.of({
      ...data,
      email, 
    }));

    if (Result.isFail(userResult)){
      return userResult;
    }

    const user = userResult.unwrap();
    const existingUserResult = await this.userRepository.findByEmail(user.email);

    if (Option.isSome(existingUserResult)){
      return Result.fail(new UserEmailAlreadyRegisteredError());
    }

    await this.userRepository.create(user);
    
    return Result.ok(user);
  }
}

export interface RegisterUserStoryInput{
  name: string;
  password: string;
  email: string;
}