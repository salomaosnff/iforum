import { AcademicEmail } from '@/@shared/vo/academic_email.vo';
import { UserRepository } from '../user.repository';
import { Result } from '@/@shared/result';
import { Option } from '@/@shared/option';
import { InvalidUserCredentialsError } from '../error/invalid_user_credentials.error';
import { HashPort } from '@/@shared/ports/hash.port';

export interface LoginStoryInput {
  login: string,
  password: string,
  setCookie(name: string, value: string): void
}

export class LoginStory {
  constructor(private readonly userRepository: UserRepository,
    private readonly hashAdapter: HashPort){

  }

  async execute(data: LoginStoryInput) {
    if (!data?.login || !data?.password){
      return Result.fail(new InvalidUserCredentialsError);
    }
    const emailResult = AcademicEmail.of(data.login);

    if (Result.isFail(emailResult)){
      return emailResult;
    }

    const userResult = await this.userRepository.findByEmail(emailResult.unwrap());

    if (Option.isNone(userResult)){
      return Result.fail(new InvalidUserCredentialsError());
    }

    const user = userResult.unwrap();

    if (!(await this.hashAdapter.compare(user.password, data.password))) {
      return Result.fail(new InvalidUserCredentialsError());
    }

    data.setCookie('user_id', user.id.value);

    return Result.ok(user);
    
  }
}