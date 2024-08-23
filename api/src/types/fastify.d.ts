import 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    user?: {
      sub: string;
      iat: string;
      exp: string;
    };
  }
}
