import {Module} from '@nestjs/common';
import {CacheInterceptor, CacheModule} from "@nestjs/cache-manager";
import {RedisOptions} from "../config/cache";
import {ConfigModule} from "@nestjs/config";
import {APP_INTERCEPTOR} from "@nestjs/core";
import {AppController} from "@controllers";
import {
	AppService,
	FilmService,
	PeopleService,
	PlanetService,
	SpeciesService,
	StarshipService,
	VehicleService
} from "@services";

@Module({
	controllers: [AppController],
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		CacheModule.registerAsync(RedisOptions),
	],
	providers: [
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
