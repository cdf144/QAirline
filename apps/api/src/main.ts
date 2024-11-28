import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('QAirline API')
    .setDescription('The QAirline API description')
    .setVersion('1.0')
    .addTag('airline')
    .build();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.use(bodyParser.json());
  SwaggerModule.setup('api', app, () =>
    SwaggerModule.createDocument(app, config),
  );

  const port = configService.get<number>('PORT');
  await app.listen(port);
}
bootstrap();
