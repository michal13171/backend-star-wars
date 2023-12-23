import {Module} from '@nestjs/common';
import {PeopleSeeder} from "./seeders/people-seeder";
import {SeederModule} from "nestjs-seeder/dist/seeder/seeder.module";

@Module({
	imports: [
		SeederModule,
	],
	providers: [
		PeopleSeeder,
	],
})
export class SeederCustomModule {}
