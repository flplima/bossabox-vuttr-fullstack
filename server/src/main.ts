import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';

import { AppModule } from './app.module';
import { setupSwagger } from './utils/setup-swagger';
import { setupSentry } from './utils/setup-sentry';

NestFactory.create(AppModule).then(app => {
  app.enableCors();
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  setupSwagger(app);
  setupSentry(app);

  app.listen(process.env.HTTP_PORT);
});
