import { CacheModuleOptions } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-ioredis';

export default (configService: ConfigService): CacheModuleOptions => ({
  store: redisStore,
  host: configService.get<string>('redis.host'),
  port: configService.get<number>('redis.port'),
});
