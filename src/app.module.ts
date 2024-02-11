import { Module } from '@nestjs/common';
import { UtilsModule } from './poll/utils.module';

@Module({
  imports: [UtilsModule],
})
export class AppModule {}
