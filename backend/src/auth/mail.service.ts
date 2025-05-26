// src/mail/mail.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "oscar.haotian.ceb@immune.institute", // Tu Gmail
      pass: "rjrfgpefjafdwgou", // Contraseña o App Password
    },
  });

  async sendVerificationEmail(email: string, url: string) {
    const info = await this.transporter.sendMail({
      from: `"Mi Proyecto" <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'Verifica tu correo',
      html: `<p>Haz clic en el siguiente enlace para verificar tu correo:</p><a href="${url}">${url}</a>`,
    });

    console.log('Correo enviado: %s', info.messageId);
  }
}
