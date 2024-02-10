import { Module } from '@nestjs/common';
import { PeopleController } from './controllers/people.controller';

@Module({
  controllers: [PeopleController],
})
export class PeopleModule {}
