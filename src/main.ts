import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import { JwtAuthGuard } from './auth/jwt-auth-guards';
import { ValidationPipe } from '@nestjs/common';
async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
  .setTitle('Lesson about advanced backend/nestJS')
  .setDescription('Documentation')
  .setVersion('1.0.0')
  .addTag('KAna')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app,document);
  // app.useGlobalGuards(JwtAuthGuard);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT, () =>
    console.log(`server is running on 'http://localhost:${PORT}'`),
  );
}
start();
