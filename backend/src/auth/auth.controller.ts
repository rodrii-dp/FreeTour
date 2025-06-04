import {
  Controller,
  Post,
  Body,
  Query,
  Get,
  BadRequestException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() req) {
    return this.authService.me(req.user);
  }

  @Post('register')
  async register(@Body() body: any) {
    return this.authService.register(body);
  }

  @Get('verify')
  async verifyEmail(@Query('token') token: string) {
    if (!token) throw new BadRequestException('Token no proporcionado');
    return this.authService.verifyEmail(token);
  }

  @Post('login')
  async login(@Body() body: any) {
    return this.authService.login(body);
  }

  @Post('refresh')
  async refresh(@Body('refresh_token') refreshToken: string) {
    if (!refreshToken) throw new BadRequestException('Refresh token no proporcionado');
    return this.authService.refreshToken(refreshToken);
  }
}
