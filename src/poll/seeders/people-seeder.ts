import {Seeder} from "nestjs-seeder";
import {Inject, Injectable, Logger} from "@nestjs/common";
import {PeopleEntity} from "@entities";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CACHE_MANAGER} from "@nestjs/cache-manager";
import {Cache} from "cache-manager";
import {UL_SWAPI} from "@environments";
import {AppService} from "@services";

@Injectable()
export class PeopleSeeder implements Seeder {
	
	constructor(
		@InjectRepository(PeopleEntity) private peopleEntityRepository: Repository<PeopleEntity>,
		@Inject(CACHE_MANAGER) private cacheManager: Cache,
		private appService: AppService
	) {}
	
	async drop(): Promise<any> {
		await this.peopleEntityRepository.clear();
	}
	
	async seed(): Promise<any> {
		const cacheKey = `people`;
		let nextPageUrl = `${UL_SWAPI}people/?page=1&format=json`;
		
		do {
			const storePeopleCacheAndDatabase = await this.appService.fetchData(nextPageUrl);
			
			await this.cacheManager.set(cacheKey, storePeopleCacheAndDatabase['results']);
			
			Logger.log(storePeopleCacheAndDatabase['results'].length, 'Bootstrap');
			
			await this.peopleEntityRepository.upsert(storePeopleCacheAndDatabase['results'], {
				skipUpdateIfNoValuesChanged: true,
				upsertType: 'on-duplicate-key-update',
				conflictPaths: ['name'],
			});
			
			nextPageUrl = storePeopleCacheAndDatabase.next;
		} while (nextPageUrl !== null);
	}
	
}
