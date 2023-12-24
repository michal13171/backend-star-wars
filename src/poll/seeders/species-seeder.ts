import {Seeder} from "nestjs-seeder";
import {Inject, Injectable, Logger} from "@nestjs/common";
import {SpecieEntity} from "@entities";
import {AppService} from "../services/app.service";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CACHE_MANAGER} from "@nestjs/cache-manager";
import {Cache} from "cache-manager";
import {UL_SWAPI} from "@environments";

@Injectable()
export class SpeciesSeeder implements Seeder {
	
	constructor(
		@InjectRepository(SpecieEntity) private specieEntityRepository: Repository<SpecieEntity>,
		@Inject(CACHE_MANAGER) private cacheManager: Cache,
		private appService: AppService
	) {}
	
	async drop(): Promise<any> {
		await this.specieEntityRepository.clear();
	}
	
	async seed(): Promise<any> {
		const cacheKey = `species`;
		let nextPageUrl = `${UL_SWAPI}species/?page=1&format=json`;
		
		do {
			const storeSpeciesCacheAndDatabase = await this.appService.fetchData(nextPageUrl);
			
			await this.cacheManager.set(cacheKey, storeSpeciesCacheAndDatabase['results']);
			
			Logger.log(storeSpeciesCacheAndDatabase['results'], 'Bootstrap');
			
			await this.specieEntityRepository.upsert(storeSpeciesCacheAndDatabase['results'], ['name']);
			
			nextPageUrl = storeSpeciesCacheAndDatabase.next;
		} while (nextPageUrl !== null);
	}
	
}
