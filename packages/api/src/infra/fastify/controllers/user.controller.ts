import { RegisterUserStory, RegisterUserStoryInput } from '../../../application/user/stories/register_user.story';
import { FastifyPluginCallback } from 'fastify';
import { KnexUserRepository } from '../../knex/user/user.repository';
import { BcryptHashAdapter } from '../../bcrypt/hash.adapter';
import * as UserPresenter from '@/application/user/user.presenter';
import { LoginStory, LoginStoryInput } from '@/application/user/stories/login_user.story';
import { GetMeStory } from '@/application/user/stories/get_me.story';
import { getLoggedUserId } from '../util';
import { LogoutStory } from '@/application/user/stories/logout.story';

export const UserController: FastifyPluginCallback = async (fastify) => {
  const userRepository = new KnexUserRepository();
  const bcryptHashAdapter = new BcryptHashAdapter();
  const loginStory = new LoginStory(userRepository, bcryptHashAdapter);
  const logoutStory = new LogoutStory();


  fastify.get('/me',async (request, reply) => {
    const getMe = new GetMeStory(userRepository);
    const result = await getMe.execute({ userId: getLoggedUserId(request) },
    );
    reply.code(200);
    return result.map(UserPresenter.publicPresenter);
  });

  fastify.post<{
    Body: RegisterUserStoryInput;
  }>('/users', async (request, reply) => {
    const registerUser = new RegisterUserStory(userRepository, bcryptHashAdapter, loginStory);
    const result = await registerUser.execute({
      ...request.body,
      setCookie(name, value) {
        reply.setCookie(name,value,{
          httpOnly: true,
          maxAge: Number(process.env.COOKIE_MAX_AGE ?? 0),
          signed: true,
        });
      },
    });
    
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
    const result = await loginStory.execute({
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

  fastify.delete('/logout', async (request, reply) => {
    await logoutStory.execute((name) => {
      reply.clearCookie(name);
    });

    reply.code(204);
  });
};