import { Injectable } from '@nestjs/common';
import { NewUser } from './types';
import { UserRepository } from 'src/repositories/user.repository';
import { BcryptService } from 'src/util/bcrypt';
import { CreateWallet } from '../wallet/create.wallet';

@Injectable()
export class CreateUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptService: BcryptService,
    private readonly createWallet: CreateWallet,
  ) {}
  async execute(data: NewUser) {
    const checkEmail = await this.userRepository.getByEmail(data.email);
    if (checkEmail)
      throw new Error(
        'Este e-mail já está registrado. Tente outro e-mail ou recupere a senha.',
      );

    const hashPassword = await this.bcryptService.generateHash(data.password);

    const user = await this.userRepository.create({
      ...data,
      password: hashPassword,
    });

    this.createWallet.create(user.id_user);

    return;
  }
}
