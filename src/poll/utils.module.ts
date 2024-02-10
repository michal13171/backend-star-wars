import { Module } from '@nestjs/common';
import {
  AppController,
  FilmController,
  PlanetController,
  SpeciesController,
  StarshipController,
  VehicleController,
} from '@controllers';
import { Repository } from 'typeorm';
import {
  AppService,
  FilmService,
  PeopleService,
  PlanetService,
  SpeciesService,
  StarshipService,
  VehicleService,
} from '@services';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { RedisOptions } from '../config/cache';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PeopleModule } from './people/people.module';

@Module({
  controllers: [
    AppController,
    PlanetController,
    VehicleController,
    FilmController,
    SpeciesController,
    StarshipController,
  ],
  imports: [CacheModule.registerAsync(RedisOptions), PeopleModule],
  providers: [
    Repository,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    AppService,
    PeopleService,
    VehicleService,
    SpeciesService,
    FilmService,
    StarshipService,
    PlanetService,
  ],
  exports: [UtilsModule],
})
export class UtilsModule {}
