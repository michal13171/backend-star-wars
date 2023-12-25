import {Seeder} from "nestjs-seeder";
import {Inject, Injectable, Logger} from "@nestjs/common";
import {StarshipEntity} from "@entities";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CACHE_MANAGER} from "@nestjs/cache-manager";
import {Cache} from "cache-manager";
import {UL_SWAPI} from "@environments";
import {AppService} from "@services";

@Injectable()
export class StarshipSeeder implements Seeder {
	
	constructor(
		@InjectRepository(StarshipEntity) private starshipEntityRepository: Repository<StarshipEntity>,
		@Inject(CACHE_MANAGER) private cacheManager: Cache,
		private appService: AppService
	) {}
	
	async drop(): Promise<any> {
		await this.starshipEntityRepository.clear();
	}
	
	async seed(): Promise<any> {
		const cacheKey = `starship`;
		let nextPageUrl = `${UL_SWAPI}starships/?page=1&format=json`;
		
		do {
			const storeStarshipsCacheAndDatabase = await this.appService.fetchData(nextPageUrl);
			
			await this.cacheManager.set(cacheKey, storeStarshipsCacheAndDatabase['results']);
			
			Logger.log(storeStarshipsCacheAndDatabase['results'].length, 'Bootstrap');
			
			await this.starshipEntityRepository.upsert(storeStarshipsCacheAndDatabase['results'], {
				skipUpdateIfNoValuesChanged: true,
				upsertType: 'on-duplicate-key-update',
				conflictPaths: ['name'],
			});
			
			nextPageUrl = storeStarshipsCacheAndDatabase.next;
		} while (nextPageUrl !== null);
	}
	
}
