import { Module } from '@nestjs/common';
import { PeopleController } from './controllers/people.controller';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { RedisOptions } from '../../config/cache';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PeopleService } from './services/people.service';

@Module({
  imports: [CacheModule.registerAsync(RedisOptions), PeopleModule],
  controllers: [PeopleController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    PeopleService,
  ],
  exports: [PeopleModule],
})
export class PeopleModule {}
