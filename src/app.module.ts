import { Module } from '@nestjs/common';
import { UtilsModule } from './poll/utils.module';
import { AppController } from './config/controllers/app.controller';

@Module({
  imports: [UtilsModule],
  controllers: [AppController],
})
export class AppModule {}
