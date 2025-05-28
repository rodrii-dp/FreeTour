// src/mail/mail.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'oscar.haotian.ceb@immune.institute', // Tu Gmail
      pass: 'rjrfgpefjafdwgou', // Contraseña o App Password
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

  async sendBookingConfirmationEmail(email: string, bookingDetails: any) {
    const info = await this.transporter.sendMail({
      from: `"Mi Proyecto" <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'Confirmación de reserva',
      html: `
        <h2>¡Reserva confirmada!</h2>
        <p>Gracias por reservar con nosotros.</p>
        <p><b>Tour:</b> ${bookingDetails.tourTitle}</p>
        <p><b>Fecha:</b> ${bookingDetails.date}</p>
        <p><b>Hora:</b> ${bookingDetails.hour}</p>
        <p><b>Personas:</b> ${bookingDetails.people}</p>
      `,
    });

    console.log('Correo de reserva enviado: %s', info.messageId);
  }
}
