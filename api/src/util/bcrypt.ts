import { Injectable } from '@nestjs/common';
const bcrypt = require('bcrypt');

@Injectable()
export class BcryptService {
  async generateHash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
