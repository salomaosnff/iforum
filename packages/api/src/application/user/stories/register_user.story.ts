import { UserEntity } from '@/core/user/user.entity';
import { UserRepository } from '../user.repository';
import { ValidationError } from '@/@shared/error/validation.error';
import { Result } from '@/@shared/result';
import { Option } from '@/@shared/option';
import { UserEmailAlreadyRegisteredError } from '../error/user_email_already_registered.error';
import { AcademicEmail, InvalidAcademicEmailError } from '@/@shared/vo/academic_email.vo';
import { HashPort } from '@/@shared/ports/hash.port';
import { LoginStory } from './login_user.story';

export interface RegisterUserStoryInput{
  name: string;
  password: string;
  email: string;
  setCookie(name: string, value: string): void
}
export class RegisterUserStory{
  constructor(private readonly userRepository: UserRepository,
    private readonly hashPort: HashPort,
    private readonly userLoginStory: LoginStory){

  }

  async execute(data: RegisterUserStoryInput): Promise<Result<UserEntity, ValidationError | UserEmailAlreadyRegisteredError | InvalidAcademicEmailError>>{
    if (!data){
      return Result.fail(new ValidationError('Missing user info!'));
    }
    if (!data.password){
      return Result.fail(new ValidationError('password is required!'));
    }
    
    const password = await this.hashPort.digest(data.password);

    const userResult = AcademicEmail.of(data.email).map((email) => UserEntity.of({
      ...data,
      password,
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
    
    return this.userLoginStory.execute({
      login: data.email,
      password: data.password,
      setCookie: data.setCookie,
    });
  }
}

