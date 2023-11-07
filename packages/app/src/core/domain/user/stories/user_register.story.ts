import { Services } from 'swagger:iforum';

export interface UserRegisterInput{
  name: string,
  email: string,
  password: string,
}

export class UserRegisterStory {
  constructor(private readonly registerService: Services.Users){}

  async execute (input: UserRegisterInput){
    return this.registerService.createUser({
      name: input.name,
      email: input.email,
      password: input.password,
    }).then((response) => response.data);
  }
}