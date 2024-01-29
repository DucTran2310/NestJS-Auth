import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3002);
}
bootstrap();

// How to generate a module:
// nest g module ...
// We have 2 entities: User and Note, 1 User can write many Notes
// controller is where to receive request to client
// controller will call service to do implementations
