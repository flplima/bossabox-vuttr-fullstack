import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

NestFactory.create(AppModule).then(app => {
  app.useGlobalPipes(new ValidationPipe());
  app.listen(process.env.HTTP_PORT);
});
