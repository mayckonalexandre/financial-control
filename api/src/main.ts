import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { metricsMiddleware } from './infrastructure/metrics/config';
import { configSwagger } from './infrastructure/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );
  app.useGlobalPipes(new ValidationPipe());

  app.use(metricsMiddleware);

  configSwagger(app);

  const port = app.get(ConfigService).get<number>('port');
  app.enableCors();
  await app.listen(port);
}

bootstrap();
