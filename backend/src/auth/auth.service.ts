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

  // 1. Enviar email de verificación

  async sendVerificationEmail(email: string) {
    const token = this.jwtService.sign({ email }, { expiresIn: '10m' });
    const url = `http://localhost:3000/auth/verify-email?token=${token}`;
  
    await this.mailService.sendVerificationEmail(email, url);
  
    return { message: 'Correo de verificación enviado' };
  }

  // 2. Verificar el email desde el link
  async verifyEmail(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      const existing = await this.userService.findByEmail(decoded.email);
      if (existing) throw new BadRequestException('Ya registrado');

      const hashedPassword = await bcrypt.hash(decoded.password, 10);

      const user = await this.userService.create({
        email: decoded.email,
        name: decoded.name,
        password: hashedPassword,
        role: decoded.role || 'cliente',
      });

      const plainUser = user.toObject();
      delete plainUser.password;
      return { message: 'Usuario verificado y registrado', user: plainUser };
    } catch (err) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }

  // 3. Login normal
  async login(data: any) {
    const { email, password } = data;
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Credenciales inválidas');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Credenciales inválidas');

    const payload = { sub: user._id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
