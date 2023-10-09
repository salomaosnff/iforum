import '../dotenv';
import fastify from 'fastify';
import { AsyncFunction } from 'fastify/types/instance';

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

  await server.listen({
    port: Number(process.env.PORT ?? 3000),
    host: '0.0.0.0',
  });

  console.log('Server listening on port 3000');
}