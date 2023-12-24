import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {TypeOrmService} from "./config/typeorm";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UtilsModule} from './poll/utils.module';
import {AppService} from "./poll/services/app.service";
import {APP_INTERCEPTOR} from "@nestjs/core";
import {CacheInterceptor} from "@nestjs/cache-manager";
import {FilmEntity, PeopleEntity, VehicleEntity} from "@entities";
import {PeopleSeeder, FilmSeeder} from "@seeders";
import {VehicleSeeder} from "./poll/seeders/vehicle-seeder";

@Module({
	imports: [
		UtilsModule,
		ConfigModule.forRoot({
			envFilePath: '.env',
		}),
		TypeOrmModule.forRootAsync({
			useClass: TypeOrmService,
		}),
		TypeOrmModule.forFeature([PeopleEntity, FilmEntity, VehicleEntity])
	],
	providers: [
		PeopleSeeder,
		FilmSeeder,
		VehicleSeeder,
		AppService,
		{
			provide: APP_INTERCEPTOR,
			useClass: CacheInterceptor,
		},
	],
})
export class AppModule {}
