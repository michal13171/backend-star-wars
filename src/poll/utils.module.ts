import {Module} from '@nestjs/common';
import {
	AppController,
	FilmController,
	PeopleController,
	PlanetController,
	SpeciesController,
	StarshipController,
	VehicleController
} from "@controllers";
import {Repository} from "typeorm";
import {
	AppService,
	FilmService,
	PeopleService,
	PlanetService,
	SpeciesService,
	StarshipService,
	VehicleService
} from "@services";
import {TypeOrmModule} from "@nestjs/typeorm";
import {FilmEntity, PeopleEntity, PlanetEntity, SpecieEntity, StarshipEntity, VehicleEntity} from "@entities";
import {CacheInterceptor, CacheModule} from "@nestjs/cache-manager";
import {RedisOptions} from "../config/cache";
import {APP_INTERCEPTOR} from "@nestjs/core";
import {FilmSeeder, PeopleSeeder, PlanetSeeder, SpeciesSeeder, StarshipSeeder, VehicleSeeder} from "@seeders";
import {SeederModule} from "nestjs-seeder/dist/seeder/seeder.module";
import {FilmRelationPeopleSeeder} from "./seeders/film-relation-people-seeder";

@Module({
	controllers: [
		AppController,
		PlanetController,
		VehicleController,
		FilmController,
		SpeciesController,
		StarshipController,
		PeopleController
	],
	imports:
		[
			SeederModule,
			TypeOrmModule.forFeature([
				PeopleEntity,
				FilmEntity,
				VehicleEntity,
				StarshipEntity,
				SpecieEntity,
				PlanetEntity,
			]),
			CacheModule.registerAsync(RedisOptions),
		],
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
		PeopleSeeder,
		VehicleSeeder,
		StarshipSeeder,
		SpeciesSeeder,
		PlanetSeeder,
		FilmSeeder,
		FilmRelationPeopleSeeder,
	],
	exports: [
		UtilsModule
	]
})
export class UtilsModule {}
