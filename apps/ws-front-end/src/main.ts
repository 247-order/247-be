import { NestFactory } from '@nestjs/core';
import { WsFrontEndModule } from './ws-front-end.module';

async function bootstrap() {
  const app = await NestFactory.create(WsFrontEndModule);
  await app.listen(3000);
}
bootstrap();
