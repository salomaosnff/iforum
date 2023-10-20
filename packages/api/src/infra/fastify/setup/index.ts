import { FastifyInstance } from 'fastify';
import setupCookies from './cookies';
import setupErrorHandler from './error';
import setupSerialization from './serialization';
import setupSwagger from './swagger';
import { setupCors } from './cors';

export function setupFastify(fastify: FastifyInstance) {
  setupCors(fastify);
  setupSwagger(fastify);
  setupCookies(fastify);
  setupSerialization(fastify);
  setupErrorHandler(fastify);
}