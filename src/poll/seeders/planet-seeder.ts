import {Seeder} from "nestjs-seeder";
import {Inject, Injectable, Logger} from "@nestjs/common";
import {PlanetEntity} from "@entities";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CACHE_MANAGER} from "@nestjs/cache-manager";
import {Cache} from "cache-manager";
import {UL_SWAPI} from "@environments";
import {AppService} from "@services";

@Injectable()
export class PlanetSeeder implements Seeder {
	
	constructor(
		@InjectRepository(PlanetEntity) private planetEntityRepository: Repository<PlanetEntity>,
		@Inject(CACHE_MANAGER) private cacheManager: Cache,
		private appService: AppService
	) {}
	
	async drop(): Promise<any> {
		await this.planetEntityRepository.clear();
	}
	
	async seed(): Promise<any> {
		const cacheKey = `planet`;
		let nextPageUrl = `${UL_SWAPI}planets/?page=1&format=json`;
		
		do {
			const storePlanetsCacheAndDatabase = await this.appService.fetchData(nextPageUrl);
			
			await this.cacheManager.set(cacheKey, storePlanetsCacheAndDatabase['results']);
			
			Logger.log(storePlanetsCacheAndDatabase['results'], 'Bootstrap');
			
			await this.planetEntityRepository.upsert(storePlanetsCacheAndDatabase['results'], {
				skipUpdateIfNoValuesChanged: true,
				conflictPaths: ['name'],
			});
			
			nextPageUrl = storePlanetsCacheAndDatabase.next;
		} while (nextPageUrl !== null);
	}
	
}
