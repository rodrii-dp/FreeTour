import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ProviderService, UserService } from '../mongodb/services/all.service';
import { MailService } from './mail.service';
import { isValidEmail, isValidPassword } from './validations';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private providerService: ProviderService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  // Registro de usuario
  async register(data: any) {
    const { email, name, password, role = 'cliente', providerData } = data;

    if (!isValidEmail(email)) throw new BadRequestException('Email inválido');
    if (!isValidPassword(password)) throw new BadRequestException('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial');

    const existing = await this.userService.findByEmail(email);
    if (existing) throw new BadRequestException('Ya registrado');

    // Crear el usuario sin marcarlo como verificado
    const user = await this.userService.create({
      email,
      name,
      password,
      role,
      verified: false,
    });

    // Si es proveedor y hay providerData, crear el proveedor asociado
    if (role === 'proveedor' && providerData) {
      await this.providerService.create({
        userId: user._id,
        name: providerData.name,
        direction: providerData.direction || '',
        contact: providerData.contact || '',
        tours: [],
        verificationStatus: 'pendiente',
      });
    }

    // Enviar email de verificación
    const token = this.jwtService.sign({ email, name, password, role, providerData });
    await this.mailService.sendVerificationEmail(email, token);

    return {
      message: 'Registro exitoso. Verifica tu correo para completar el proceso.',
    };
  }

  async verifyEmail(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const { email, name, password, role, providerData } = payload;

      const existing = await this.userService.findByEmail(email);
      if (existing) {
        if (!existing.verified) {
          await this.userService.update(existing._id.toString(), { verified: true });
        }

        // Si es proveedor y no tiene provider asociado, créalo
        if (role === 'proveedor' && providerData) {
          const existingProvider = await this.providerService.findByUserId(existing._id.toString());
          if (!existingProvider) {
            await this.providerService.create({
              userId: existing._id,
              name: providerData.name,
              direction: providerData.direction || '',
              contact: providerData.contact || '',
              tours: [],
              verificationStatus: 'pendiente',
            });
          }
        }

        return { message: 'Cuenta verificada correctamente' };
      }

      // Crear el usuario y el provider si no existe
      const user = await this.userService.create({
        email,
        name,
        password,
        role,
        verified: true,
      });

      if (role === 'proveedor' && providerData) {
        await this.providerService.create({
          userId: user._id,
          name: providerData.name,
          direction: providerData.direction || '',
          contact: providerData.contact || '',
          tours: [],
          verificationStatus: 'pendiente',
        });
      }

      return { message: 'Cuenta verificada correctamente' };
    } catch (e) {
      throw new BadRequestException('Token inválido o expirado');
    }
  }

  private isValidContact(contact: string): boolean {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return phoneRegex.test(contact) || emailRegex.test(contact);
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

    let provider = undefined;
    if (user.role === 'proveedor') {
      provider = await this.providerService.findByUserId(user._id.toString());
    }

    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '15m' }),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
      user: { ...user.toObject(), password: undefined },
      provider,
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
