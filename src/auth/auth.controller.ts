import { Body, Controller, Post, InternalServerErrorException } from '@nestjs/common';
import { AuthService } from './auth.service';

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
      throw new InternalServerErrorException('Registration failed');
    }
  }

  @Post('login')
  async login(@Body() dto: { email: string; password: string }) {
    try {
      return await this.authService.login(dto);
    } catch (error) {
      throw new InternalServerErrorException('Login failed');
    }
  }
}
