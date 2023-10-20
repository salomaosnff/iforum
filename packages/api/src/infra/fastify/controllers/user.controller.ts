import { RegisterUserStory, RegisterUserStoryInput } from '../../../application/user/stories/register_user.story';
import { FastifyPluginCallback } from 'fastify';
import { KnexUserRepository } from '../../knex/user/user.repository';
import { BcryptHashAdapter } from '../../bcrypt/hash.adapter';
import * as UserPresenter from '@/application/user/user.presenter';
import { LoginStory, LoginStoryInput } from '@/application/user/stories/login_user.story';

export const UserController: FastifyPluginCallback = async (fastify) => {
  const userRepository = new KnexUserRepository();
  const bcryptHashAdapter = new BcryptHashAdapter();

  fastify.post<{
    Body: RegisterUserStoryInput;
  }>('/users', async (request, reply) => {
    const registerUser = new RegisterUserStory(userRepository, bcryptHashAdapter);
    const result = await registerUser.execute(request.body);
    
    reply.code(201);
    return result.map(UserPresenter.publicPresenter);
  });


  fastify.post<{
    Body: LoginStoryInput; 
  }>('/login', {
    schema: {
      description: 'Realiza o login do usuário',
      body: {
        type: 'object',
        properties: {
          login: { type: 'string' },
          password: { type: 'string' },
        },
        required: [
          'login',
          'password',
        ],
      },
    },
  }, async (request,reply) => {
    const login = new LoginStory(userRepository, bcryptHashAdapter);
    const result = await login.execute({
      ...request.body,
      setCookie(name, value) {
        reply.setCookie(name,value,{
          httpOnly: true,
          maxAge: Number(process.env.COOKIE_MAX_AGE ?? 0),
          signed: true,
        });
      },
    });

    return result.map(UserPresenter.publicPresenter);
  });
};