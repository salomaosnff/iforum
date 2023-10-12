import { FastifyRequest } from 'fastify';

export function getLoggedUserId(request: FastifyRequest){
  return (request.cookies.user_id && request.unsignCookie(request.cookies.user_id).value)?? '';
}