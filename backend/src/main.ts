import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'https://southern-aryn-freetour-1a204637.koyeb.app',
    credentials: true, // si usas cookies
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
