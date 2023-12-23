import {Module} from '@nestjs/common';
import {SeederModule} from "nestjs-seeder/dist/seeder/seeder.module";
import {FilmSeeder, PeopleSeeder} from "@seeders";

@Module({
	imports: [
		SeederModule,
	],
	providers: [
		PeopleSeeder,
		FilmSeeder,
	],
})
export class SeederCustomModule {}
