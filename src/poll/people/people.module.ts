import { Module } from '@nestjs/common';
import { PeopleController } from './controllers/people.controller';
import { PeopleService } from './services/people.service';
import { AppService } from '../../config/services/app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { REDIS } from '@environments';
import { CacheModule } from '@nestjs/common/cache';
import { RedisOptions } from '../../config/cache';

@Module({
  imports: [
    CacheModule.registerAsync(RedisOptions),
    ClientsModule.register([
      {
        name: 'GLOBAL_PEOPLE_SERVICE',
        transport: Transport.REDIS,
        options: REDIS,
      },
    ]),
    PeopleModule,
  ],
  controllers: [PeopleController],
  providers: [AppService, PeopleService],
  exports: [PeopleModule],
})
export class PeopleModule {}
