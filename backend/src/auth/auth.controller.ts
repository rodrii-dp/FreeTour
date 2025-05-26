import { Controller, Post, Body, Query, Get, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 🔐 Paso 1: El usuario introduce su email para recibir el link de verificación
  @Post('send-verification-email')
  async sendVerification(
    @Body('email') email: string,
    @Body('name') name: string,
    @Body('password') password: string,
    @Body('role') role: string,
  ) {
    if (!email || !name || !password) throw new BadRequestException('Faltan datos');
    return this.authService.sendVerificationEmail(email, name, password, role);
  }

  // ✅ Paso 2: El usuario hace clic en el email recibido (link con JWT)
  @Get('verify-email')
  async verifyEmail(@Query('token') token: string) {
    if (!token) throw new BadRequestException('Token no proporcionado');
    return this.authService.verifyEmail(token);
  }

  // 🔒 Login clásico
  @Post('login')
  async login(@Body() body: any) {
    return this.authService.login(body);
  }
}
