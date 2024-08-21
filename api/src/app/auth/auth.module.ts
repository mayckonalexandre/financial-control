import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { LoggerModule } from 'src/infrastructure/log/log.module';
import { BcryptService } from 'src/util/bcrypt';
import { Authentication } from 'src/domain/use.case/auth/authentication';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt_secret'),
        signOptions: { expiresIn: '30m' },
        global: true,
      }),
    }),
    UserModule,
    LoggerModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, Authentication, BcryptService],
  exports: [JwtModule],
})
export class AuthModule {}
