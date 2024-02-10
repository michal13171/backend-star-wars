import { Module } from '@nestjs/common';
import { AppService } from './services';
import { AppController } from './controllers';

@Module({
  controllers: [AppController],
  providers: [AppService],
  exports: [UtilsModule],
})
export class UtilsModule {}
