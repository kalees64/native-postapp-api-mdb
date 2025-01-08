import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:4200', 'http://localhost:5173'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type:Authorization',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
  console.debug(
    `[Nest] Live - App running on localhost ${process.env.PORT || 3000}`,
  );
}
bootstrap();
