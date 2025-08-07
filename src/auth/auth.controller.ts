import { Body, Controller, Post, InternalServerErrorException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MESSAGES } from 'src/common/constants';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body() dto: { name: string; email: string; password: string },
  ) {
    try {
      return await this.authService.register(dto);
    } catch (error) {
      throw new InternalServerErrorException(MESSAGES.AUTH.REGISTER);
    }
  }

  @Post('login')
  async login(@Body() dto: { email: string; password: string }) {
    try {
      return await this.authService.login(dto);
    } catch (error) {
      throw new InternalServerErrorException(MESSAGES.AUTH.LOGIN_SUCCESS);
    }
  }
}
