import { FastifyInstance } from 'fastify';
import { AsyncFunction } from 'fastify/types/instance';

export default function setupInit(fastify: FastifyInstance, initFunction?: AsyncFunction) {
  if (!initFunction) {
    return;
  }

  let ready = false;
  let error: Error | undefined;

  initFunction().then(() => {
    ready = true;
  }).catch((err) => {
    error = err;
    console.error(err);
  });

  fastify.addHook('onRequest', async (_, reply) => {
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