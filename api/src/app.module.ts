import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionsFilter } from './filters/http-exception.filter';
import { LoggingInterceptor } from './logging.interceptor';
import { AuthGuard } from './app/auth/auth.guard';
//Config
import configurationDataBase from './infrastructure/db';
import configuration from './infrastructure/env';
import configurationCache from './infrastructure/cache';
//Module
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './app/auth/auth.module';
import { UserModule } from './app/user/user.module';
import { RevenueModule } from './app/revenues/revenue.module';
import { CategoryModule } from './app/category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: configurationDataBase,
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: configurationCache,
    }),
    AuthModule,
    UserModule,
    RevenueModule,
    CategoryModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
