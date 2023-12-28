import {Seeder} from "nestjs-seeder";
import {Inject, Injectable, Logger} from "@nestjs/common";
import {VehicleEntity} from "@entities";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CACHE_MANAGER} from "@nestjs/cache-manager";
import {Cache} from "cache-manager";
import {UL_SWAPI} from "@environments";
import {AppService} from "@services";

@Injectable()
export class VehicleSeeder implements Seeder {
	
	constructor(
		@InjectRepository(VehicleEntity) private vehicleEntityRepository: Repository<VehicleEntity>,
		@Inject(CACHE_MANAGER) private cacheManager: Cache,
		private appService: AppService
	) {}
	
	async drop(): Promise<any> {
		await this.vehicleEntityRepository.clear();
	}
	
	async seed(): Promise<any> {
		const cacheKey = `vehicle`;
		let nextPageUrl = `${UL_SWAPI}vehicles/?page=1&format=json`;
		
		do {
			const storeVehiclesCacheAndDatabase = await this.appService.fetchData(nextPageUrl);
			
			await this.cacheManager.set(cacheKey, storeVehiclesCacheAndDatabase['results']);
			
			Logger.log(storeVehiclesCacheAndDatabase['results'].length, 'Bootstrap');
			
			await this.vehicleEntityRepository.upsert(storeVehiclesCacheAndDatabase['results'], {
				skipUpdateIfNoValuesChanged: true,
				upsertType: 'on-duplicate-key-update',
				conflictPaths: ['name'],
			});
			
			nextPageUrl = storeVehiclesCacheAndDatabase.next;
		} while (nextPageUrl !== null);
	}
	
}
