import { Get, Injectable, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import * as promClient from 'prom-client';

@Injectable()
export class AppController {
  @Get('metrics')
  async metrics(@Res() res: FastifyReply) {
    res.header('Content-Type', promClient.register.contentType);
    res.send(await promClient.register.metrics());
  }
}
