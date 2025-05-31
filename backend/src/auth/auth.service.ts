import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../mongodb/services/all.service';
import { MailService } from './mail.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  // Registro de usuario
  async register(data: any) {
    const { email, name, password, role = 'cliente' } = data;
    const existing = await this.userService.findByEmail(email);
    if (existing) throw new BadRequestException('Ya registrado');

    // const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userService.create({
      email,
      name,
      password,
      role,
      verified: false,
    });

    const verifyToken = this.jwtService.sign(
      { sub: user._id, email: user.email },
      { expiresIn: '1d' },
    );
    const verifyUrl = `https://hollow-lucretia-rodrigo-de-prat-9197ad55.koyeb.app/auth/verify?token=${verifyToken}`;
    await this.mailService.sendVerificationEmail(user.email, verifyUrl);

    return {
      message: 'Usuario registrado. Verifica tu correo para activar la cuenta.',
      user: { ...user.toObject(), password: undefined },
    };
  }

  async verifyEmail(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.userService.findByEmail(payload.email);
      if (!user) throw new BadRequestException('Usuario no encontrado');
      if (user.verified) return { message: 'Ya verificado' };

      user.verified = true;
      await user.save();
      return { message: 'Cuenta verificada correctamente' };
    } catch (e) {
      throw new BadRequestException('Token inválido o expirado');
    }
  }

  // Login normal
  async login(data: any) {
    const { email, password } = data;
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Usuario no encontrado');

    if (!user.verified)
      throw new UnauthorizedException(
        'Verifica tu correo antes de iniciar sesión',
      );

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Credenciales inválidas');

    const payload = { sub: user._id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '15m' }),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
      user: { ...user.toObject(), password: undefined },
    };
  }

  async me(userPayload: any) {
    const user = await this.userService.findByEmail(userPayload.email);
    if (!user) throw new UnauthorizedException('Usuario no encontrado');
    return { ...user.toObject(), password: undefined };
  }

  // Refrescar token
  async refreshToken(refreshToken: string) {
    try {
      const decoded = this.jwtService.verify(refreshToken);
      const user = await this.userService.findByEmail(decoded.email);
      if (!user) throw new UnauthorizedException('Usuario no encontrado');

      const payload = { sub: user._id, email: user.email, role: user.role };
      return {
        access_token: this.jwtService.sign(payload, { expiresIn: '15m' }),
        refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
      };
    } catch (err) {
      throw new UnauthorizedException('Refresh token inválido o expirado');
    }
  }
}
