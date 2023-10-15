import fastifyCookie from '@fastify/cookie';
import { FastifyInstance } from 'fastify';

export default function setupCookies(fastify: FastifyInstance) {
  fastify.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET,
    hook: 'onRequest',
    parseOptions: {},
  });
}