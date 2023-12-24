import {Module} from '@nestjs/common';
import {SeederModule} from "nestjs-seeder/dist/seeder/seeder.module";
import {FilmSeeder, PeopleSeeder} from "@seeders";
import {VehicleSeeder} from "./seeders/vehicle-seeder";
import {StarshipSeeder} from "./seeders/starship-seeder";

@Module({
	imports: [
		SeederModule,
	],
	providers: [
		PeopleSeeder,
		FilmSeeder,
		VehicleSeeder,
		StarshipSeeder,
	],
})
export class SeederCustomModule {}
