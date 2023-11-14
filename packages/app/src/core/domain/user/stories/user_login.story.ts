import { Models, Services } from 'swagger:iforum';

export interface UserLoginInput {
  login?: string
  password?: string
}

export class UserLoginStory {
  constructor(private readonly authService: Services.Auth) {}

  async execute(input: UserLoginInput) {
    if (input.login && input.password) {
      return this.authService.login({
        login: input.login,
        password: input.password,
      }).then((response) => response.data as Models.User);
    }    

    return this.authService.getMe().then((response) => response.data as Models.User).catch(() => undefined);
  }
}
