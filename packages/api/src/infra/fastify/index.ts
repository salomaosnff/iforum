import '../dotenv';
import Fastify from 'fastify';
import { AsyncFunction } from 'fastify/types/instance';
import setupControllers from './controllers';
import setupInit from './setup/init';
import { setupFastify } from './setup';

export async function init(initFunction?: AsyncFunction) {
  const fastify = Fastify({ ignoreTrailingSlash: true });

  setupInit(fastify, initFunction);
  setupFastify(fastify);
  setupControllers(fastify);

  await fastify.listen({ port: Number(process.env.PORT ?? 3000) });

  console.log('Server listening on port 3000');
}