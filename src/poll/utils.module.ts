import {Module} from '@nestjs/common';
import {AppService} from "./services/app.service";
import {AppController} from "./controllers/app.controller";
import {CacheInterceptor, CacheModule} from "@nestjs/cache-manager";
import {RedisOptions} from "../config/cache";
import {ConfigModule} from "@nestjs/config";
import {APP_INTERCEPTOR} from "@nestjs/core";


@Module({
	controllers: [AppController],
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		CacheModule.registerAsync(RedisOptions),
	],
	providers: [
		AppService,
		{
			provide: APP_INTERCEPTOR,
			useClass: CacheInterceptor,
		},
	],
	exports: [UtilsModule],
})
export class UtilsModule {}
