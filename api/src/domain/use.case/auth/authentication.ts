import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoggerService } from 'src/infrastructure/log/log.service';
import { UserRepository } from 'src/repositories/user.repository';
import { BcryptService } from 'src/util/bcrypt';

@Injectable()
export class Authentication {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
    private readonly loggerService: LoggerService,
  ) {}

  async execute(email: string, password: string) {
    const user = await this.userRepository.getByEmail(email);

    if (!user || !(await this.bcryptService.compare(password, user.password))) {
      this.loggerService.logError(`Authentication failed for email: ${email}`);
      return null;
    }

    const payload = { sub: user.id_user };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
