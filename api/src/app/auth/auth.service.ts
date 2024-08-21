import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Authentication } from 'src/domain/use.case/auth/authentication';

@Injectable()
export class AuthService {
  constructor(private readonly authentication: Authentication) {}

  async signIn(email: string, password: string) {
    const access: { access_token: string } | null =
      await this.authentication.execute(email, password);

    if (!access) throw new UnauthorizedException();

    return access;
  }
}
