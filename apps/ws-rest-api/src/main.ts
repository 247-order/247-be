import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { WsRestApiModule } from './ws-rest-api.module';

async function bootstrap() {
  const app = await NestFactory.create(WsRestApiModule); // Use expressjs adapter
  // const app = await NestFactory.create<NestFastifyApplication>(
  //   WsRestApiModule,
  //   new FastifyAdapter()
  // );

  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle('247-order API docs')
    .setDescription('247-order API docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.enableCors();

  await app.listen(3000);
}

bootstrap();
