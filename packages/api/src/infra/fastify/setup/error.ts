import { ApplicationError } from '@/@shared/error/application.error';
import { FastifyInstance } from 'fastify';

export default function setupErrorHandler(fastify: FastifyInstance) {
  fastify.setErrorHandler(async (error, request, reply) => {
    if (!(error instanceof ApplicationError)) {
      console.log(error);

      reply.code(500);

      return {
        error: 'InternalServerError',
        message: 'Internal Server Error',
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
}