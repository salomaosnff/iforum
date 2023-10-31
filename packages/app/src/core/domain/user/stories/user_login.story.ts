import { Services } from 'swagger:iforum';

export interface UserLoginInput {
  login: string
  password: string
}

export class UserLoginStory {
  constructor(private readonly authService: Services.Auth) {}

  async execute(input: UserLoginInput) {
    return this.authService.login({
      login: input.login,
      password: input.password,
    }).then((response) => response.data);
  }
}
