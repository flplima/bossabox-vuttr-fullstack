import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';

@Module({
  imports: [DbModule]
})
export class AppModule {}
