import { Option } from '@/@shared/option';
import { Result } from '@/@shared/result';
import { FastifyInstance } from 'fastify';

export default function setupSerialization(fastify: FastifyInstance) {
  fastify.addHook('preSerialization', async (request, reply, payload) => {
    if (Result.is(payload)) {
      return payload.unwrap();
    }

    if (Option.is(payload)) {
      return Option.isSome(payload) ? payload.unwrap() : null;
    }

    return payload;
  });
}