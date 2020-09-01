import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

NestFactory.create(AppModule).then(app => {
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.listen(process.env.HTTP_PORT);
});
