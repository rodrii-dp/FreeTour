import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

<<<<<<< HEAD
  await app.listen(3000);

  console.log(app.getHttpServer()._events.request._router.stack
    .filter(r => r.route)
    .map(r => r.route.path));
=======
  app.enableCors({
    origin: 'https://desperate-joan-freetour-ab6f618a.koyeb.app',
    credentials: true, // si usas cookies
  });

  await app.listen(process.env.PORT ?? 3000);
>>>>>>> a5f696c8645b40e142cd326e96fab76126091749
}
bootstrap();
