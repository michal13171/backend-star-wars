import { Module } from '@nestjs/common';
import { AppController } from './controllers';
import { PeopleModule } from './people/people.module';

@Module({
  imports: [PeopleModule],
  controllers: [AppController],
  exports: [UtilsModule],
})
export class UtilsModule {}
