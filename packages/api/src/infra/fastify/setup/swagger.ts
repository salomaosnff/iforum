import { FastifyInstance } from 'fastify';
import FastifySwagger from '@fastify/swagger';
import FastifySwaggerUI from '@fastify/swagger-ui';

export default function setupSwagger(fastify: FastifyInstance) {
  fastify.register(FastifySwagger, {
    prefix: '/docs',
    mode: 'static',
    specification: {
      path: 'openapi.yaml',
      baseDir: '../../../../', 
    },
  });

  fastify.register(FastifySwaggerUI, { routePrefix: '/docs' });
}