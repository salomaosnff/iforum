import fastify from 'fastify';
export interface User {
  username: string
  password: string
}

export interface UserRepository {
  findByUsername(username: string): User | null
}

export interface LoginInput {
  username: string
  password: string
}

export interface LoginUseCaseRequest {
  data: LoginInput
  setCookie (name: string, data: string ): void

}

export class LoginUseCase {

  constructor(private readonly userRepository: UserRepository) {}

  execute(request:LoginUseCaseRequest) {
    const result = this.userRepository.findByUsername(request.data.username);
    if (!result) {
      return;
    }

    if (request.data.password != result.password){
      return;
    }

    // seta cookie
    request.setCookie('access_token', 'hkjhfdkjhgakjhgakjhg');
    request.setCookie('refresh_token', 'jlkjldsahgoupasdhgkuhadsgiuh');

    return result;

  }
}


const app = fastify();
app.post('/login', (request) => {
  const userRepository: UserRepository = {
    findByUsername(username) {
      if ( username === 'Eris'){
        return {
          username: 'Eris',
          password: '123',
        };
      }
    },
  };
  
  new LoginUseCase(userRepository).execute({
    data: request.body,
    setCookie(name, data) {
      console.log('setando cookie', name, data);
    },
  });
});

