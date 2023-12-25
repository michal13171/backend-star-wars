import {Seeder} from "nestjs-seeder";
import {Inject, Injectable, Logger} from "@nestjs/common";
import {FilmEntity} from "@entities";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CACHE_MANAGER} from "@nestjs/cache-manager";
import {Cache} from "cache-manager";
import {UL_SWAPI} from "@environments";
import {AppService} from "@services";

@Injectable()
export class FilmSeeder implements Seeder {
	
	constructor(
		@InjectRepository(FilmEntity) private filmEntityRepository: Repository<FilmEntity>,
		@Inject(CACHE_MANAGER) private cacheManager: Cache,
		private appService: AppService
	) {}
	
	async drop(): Promise<any> {
		await this.filmEntityRepository.clear();
	}
	
	async seed(): Promise<any> {
		const cacheKey = `film`;
		let nextPageUrl = `${UL_SWAPI}films/?page=1&format=json`;
		
		do {
			const storeFilmCacheAndDatabase = await this.appService.fetchData(nextPageUrl);
			
			await this.cacheManager.set(cacheKey, storeFilmCacheAndDatabase['results']);
			
			Logger.log(storeFilmCacheAndDatabase['results'].length, 'Bootstrap');
			
			await this.filmEntityRepository.upsert(storeFilmCacheAndDatabase['results'], {
				conflictPaths: ['title'],
				skipUpdateIfNoValuesChanged: true,
				upsertType: 'on-duplicate-key-update'
			});
			
			nextPageUrl = storeFilmCacheAndDatabase.next;
		} while (nextPageUrl !== null);
	}
	
}
