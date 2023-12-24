import {Module} from '@nestjs/common';
import {SeederModule} from "nestjs-seeder/dist/seeder/seeder.module";
import {FilmSeeder, PeopleSeeder, PlanetSeeder, SpeciesSeeder, StarshipSeeder, VehicleSeeder} from "@seeders";

@Module({
	imports: [
		SeederModule,
	],
	providers: [
		PeopleSeeder,
		FilmSeeder,
		VehicleSeeder,
		StarshipSeeder,
		SpeciesSeeder,
		PlanetSeeder,
	],
})
export class SeederCustomModule {}
