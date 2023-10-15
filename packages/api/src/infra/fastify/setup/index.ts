import { FastifyInstance } from 'fastify';
import setupCookies from './cookies';
import setupErrorHandler from './error';
import setupSerialization from './serialization';
import setupSwagger from './swagger';

export function setupFastify(fastify: FastifyInstance) {
  setupSwagger(fastify);
  setupCookies(fastify);
  setupSerialization(fastify);
  setupErrorHandler(fastify);
}