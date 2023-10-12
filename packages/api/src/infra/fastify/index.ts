import '../dotenv';
import fastify from 'fastify';
import { AsyncFunction } from 'fastify/types/instance';
import { TopicController } from './topic.controller';
import { Result } from '@/@shared/result';
import { ApplicationError } from '@/@shared/error/application.error';
import { UserController } from './user.controller';
import fastifyCookie from '@fastify/cookie';
import { CommentController } from './comment.controller';

const server = fastify();

export async function init(initFunction?: AsyncFunction) {

  // Inicializa o banco de dados e a API
  if (initFunction) {
    let ready = false;
    let error: Error | undefined;

    initFunction().then(() => {
      ready = true;
    }).catch((err) => {
      error = err;
      console.error(err);
    });

    server.register(fastifyCookie,{
      secret: process.env.COOKIE_SECRET,
      hook: 'onRequest',
      parseOptions: {},
    });

    server.addHook('onRequest', async (_, reply) => {
      if (error) {
        reply.code(500).send('Internal Server Error');
        return;
      }

      if (!ready) {
        reply.code(503).send('Service Unavailable');
        return;
      }
    });
  }
  server.addHook('preSerialization',async (request,reply,payload) => {
    if (!Result.is(payload)){
      return payload;
    }
    
    return payload.unwrap();
  });

  server.setErrorHandler(async (error, request, reply) => {
    if (!(error instanceof ApplicationError)){
      reply.code(500);
      return {
        error: error.name,
        message: error.message,
        status: 500,
      };
    }
    reply.code(error.statusCode);
    return {
      error: error.name,
      message: error.message,
      status: error.statusCode,
      info: error.info,
    };
  });
  server.register(TopicController);
  server.register(UserController);
  server.register(CommentController);
  
  await server.listen({
    port: Number(process.env.PORT ?? 3000),
    host: '0.0.0.0',
  });

  console.log('Server listening on port 3000');
}