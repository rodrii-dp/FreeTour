import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../mongodb/services/all.service';
import { MailService } from './mail.service';
import {isValidEmail, isValidPassword} from "./validations";

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

    if (!isValidEmail(email)) throw new BadRequestException('Email inválido');
    if (!isValidPassword(password)) throw new BadRequestException('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial');

    const existing = await this.userService.findByEmail(email);
    if (existing) throw new BadRequestException('Ya registrado');

    const verifyToken = this.jwtService.sign(
      { email, name, password, role },
      { expiresIn: '1d' },
    );
    const verifyUrl = `https://hollow-lucretia-rodrigo-de-prat-9197ad55.koyeb.app/auth/verify?token=${verifyToken}`;
    await this.mailService.sendVerificationEmail(email, verifyUrl);

    return {
      message: 'Verifica tu correo para activar la cuenta.'
    };
  }

  async verifyEmail(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const { email, name, password, role } = payload;
      const existing = await this.userService.findByEmail(email);
      if (existing) {
        if (!existing.verified) {
          await this.userService.update(existing._id, { verified: true });
          return { message: 'Cuenta verificada correctamente' };
        }
        return { message: 'Ya verificado' };
      }

      const user = await this.userService.create({
        email,
        name,
        password,
        role,
        verified: true,
      });
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
