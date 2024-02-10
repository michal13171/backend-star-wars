import { Module } from '@nestjs/common';
import { PeopleModule } from './people/people.module';
import { FilmModule } from './film/film.module';
import { PlanetModule } from './planet/planet.module';
import { SpeciesModule } from './species/species.module';
import { StarshipModule } from './starship/starship.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    PeopleModule,
    FilmModule,
    PlanetModule,
    SpeciesModule,
    StarshipModule,
    VehicleModule,
  ],
  controllers: [AppController],
  exports: [UtilsModule],
})
export class UtilsModule {}
