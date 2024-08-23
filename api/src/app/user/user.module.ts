import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUser } from 'src/domain/use.case/user/create.user';
import { UserRepository } from 'src/repositories/user.repository';
import { BcryptService } from 'src/util/bcrypt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user';
import { WalletModule } from '../wallet/wallet.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), WalletModule],
  controllers: [UserController],
  providers: [UserService, CreateUser, BcryptService, UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
