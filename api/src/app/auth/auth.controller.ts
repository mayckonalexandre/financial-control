import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthDto } from './dtos/auth.dto';
import { Public } from './constants/constants';
import { AuthService } from './auth.service';

@ApiTags('user')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post()
  @ApiBody({ type: AuthDto })
  @HttpCode(200)
  async signIn(@Body() body: AuthDto) {
    const { email, password } = body;
    return await this.authService.signIn(email, password);
  }
}
