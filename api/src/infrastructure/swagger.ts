import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RawServerDefault } from 'fastify';

export function configSwagger(app: NestFastifyApplication<RawServerDefault>) {
  const config = new DocumentBuilder()
    .setTitle('API para Controle Financeiro')
    .setDescription(
      'API para o gerenciamento de finanças pessoais, permitindo o controle detalhado de receitas, despesas e investimentos.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/swagger', app, document);
}
