import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {TypeOrmService} from "./config/typeorm";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UtilsModule} from './poll/utils.module';
import {AppService} from "./poll/services/app.service";
import {APP_INTERCEPTOR} from "@nestjs/core";
import {CacheInterceptor} from "@nestjs/cache-manager";
import {FilmEntity, PeopleEntity, PlanetEntity, SpecieEntity, StarshipEntity, VehicleEntity} from "@entities";
import {FilmSeeder, PeopleSeeder} from "@seeders";
import {VehicleSeeder} from "./poll/seeders/vehicle-seeder";
import {StarshipSeeder} from "./poll/seeders/starship-seeder";
import {SpeciesSeeder} from "./poll/seeders/species-seeder";
import {PlanetSeeder} from "./poll/seeders/planet-seeder";

@Module({
	imports: [
		UtilsModule,
		ConfigModule.forRoot({
			envFilePath: '.env',
		}),
		TypeOrmModule.forRootAsync({
			useClass: TypeOrmService,
		}),
		TypeOrmModule.forFeature([PeopleEntity, FilmEntity, VehicleEntity, StarshipEntity, SpecieEntity, PlanetEntity])
	],
	providers: [
		PeopleSeeder,
		FilmSeeder,
		VehicleSeeder,
		StarshipSeeder,
		SpeciesSeeder,
		PlanetSeeder,
		AppService,
		{
			provide: APP_INTERCEPTOR,
			useClass: CacheInterceptor,
		},
	],
})
export class AppModule {}
