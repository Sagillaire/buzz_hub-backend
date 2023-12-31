import 'dotenv/config';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common/pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(4001);
}

bootstrap();
