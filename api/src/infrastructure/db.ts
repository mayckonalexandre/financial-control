import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const entitiesPath = join(__dirname, '../domain/entities/*.{js,ts}');

export default async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  const data = configService.get('database');
  return {
    type: 'mysql',
    host: data.host,
    port: data.port,
    username: data.username,
    password: data.password,
    database: data.database,
    entities: [entitiesPath],
    synchronize: true,
  };
};
