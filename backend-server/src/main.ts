import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from "dotenv";
import * as path from 'path';
import { UsersModule } from './users/users.module';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create<NestExpressApplication>(UsersModule);
  app.useStaticAssets(path.join(__dirname,"../uploads"));
  app.enableCors();
  await app.listen(3002);
}
bootstrap();
