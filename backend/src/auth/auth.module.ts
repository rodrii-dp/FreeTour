import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GeneralModule } from '../mongodb/all.module';
import { JwtStrategy } from './jwt.strategy';
import { MailModule } from './mail.module';

@Module({
  imports: [
    GeneralModule,
    MailModule,
    PassportModule,
    JwtModule.register({
      secret: 'SECRET_JWT_KEY',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
