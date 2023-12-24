import {Module} from '@nestjs/common';
import {SeederModule} from "nestjs-seeder/dist/seeder/seeder.module";
import {FilmSeeder, PeopleSeeder} from "@seeders";
import {VehicleSeeder} from "./seeders/vehicle-seeder";

@Module({
	imports: [
		SeederModule,
	],
	providers: [
		PeopleSeeder,
		FilmSeeder,
		VehicleSeeder,
	],
})
export class SeederCustomModule {}
