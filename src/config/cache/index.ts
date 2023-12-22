import {CacheModuleAsyncOptions} from "@nestjs/common/cache";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {redisStore} from "cache-manager-redis-store";
import {REDIS} from "@environments";

export const RedisOptions: CacheModuleAsyncOptions = {
	isGlobal: true,
	imports: [ConfigModule],
	useFactory: async () => {
		const store = await redisStore({
			socket: REDIS,
			ttl: 24 * 60 * 60,
		});
		return {
			store: () => store,
		};
	},
	inject: [ConfigService],
};
