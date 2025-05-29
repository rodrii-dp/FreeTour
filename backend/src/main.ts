import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(3000);

  console.log(app.getHttpServer()._events.request._router.stack
    .filter(r => r.route)
    .map(r => r.route.path));
}
bootstrap();
