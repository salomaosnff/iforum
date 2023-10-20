import { FastifyInstance } from 'fastify';
import FastifyCors from '@fastify/cors';

export function setupCors(fastify: FastifyInstance) {
  fastify.register(FastifyCors, {
    credentials: true,
    maxAge: Number(process.env.CORS_MAX_AGE ?? 0),
    origin: process.env.CORS_ORIGIN?.split(/[,;]\s*/),
    methods: [
      'GET',
      'POST',
      'PATCH',
      'DELETE',
    ],
  });
}