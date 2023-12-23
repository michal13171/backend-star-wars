import {Inject, Injectable, Logger} from '@nestjs/common';
import axios from "axios";
import {UL_SWAPI} from "@environments";
import {PaginationInterface} from "../interfaces/pagination.interface";
import {PeopleInterface} from "../interfaces/people.interface";
import {CACHE_MANAGER} from '@nestjs/cache-manager';
import {Cache} from 'cache-manager';
import {FilmsInterface} from "../interfaces/films.interface";
import {StarshipsInterface} from "../interfaces/starships.interface";
import {VehiclesInterface} from "../interfaces/vehicles.interface";
import {SpeciesInterface} from "../interfaces/species.interface";

@Injectable()
export class AppService {
	constructor(
		@Inject(CACHE_MANAGER) private cacheManager: Cache
	) {}
	
	async getPeoples(): Promise<PeopleInterface[]> {
		return this.cacheManager.get('people')
	}
	
	async fetchData(url: string): Promise<any> {
		const response = await axios.get(url);
		return response.data;
	}
	
	async storePeopleCacheAndDatabase(): Promise<PeopleInterface[]> {
		const cacheKey = `people`;
		const response: any = await axios.get(
			`${UL_SWAPI}people/?page=1&format=json`,
		);
		const data = response.data;
		
		this.cacheManager.set(cacheKey, data.results);
		
		
		return data;
	}
	
	async storeFilmCacheAndDatabase(page): Promise<PaginationInterface<FilmsInterface>> {
		try {
			const cacheKey = `film`;
			const response: any = await axios.get(
				`${UL_SWAPI}films/?page=${page || 1}&format=json`,
			);
			const data = response.data;
			this.cacheManager.set(cacheKey, data.results);
			
			Logger.log(data, 'Bootstrap');
			
			return data;
		} catch (error) {
			console.error('Error fetching data:', error.message);
		}
	}
	
	async storeStarshipsCacheAndDatabase(page): Promise<PaginationInterface<StarshipsInterface>> {
		try {
			const cacheKey = `starship`;
			const response: any = await axios.get(
				`${UL_SWAPI}starships/?page=${page || 1}&format=json`,
			);
			const data = response.data;
			this.cacheManager.set(cacheKey, data.results);
			
			Logger.log(data, 'Bootstrap');
			
			return data;
		} catch (error) {
			console.error('Error fetching data:', error.message);
		}
	}
	
	async storeVehiclesCacheAndDatabase(page): Promise<PaginationInterface<VehiclesInterface>> {
		try {
			const cacheKey = `vehicle`;
			const response: any = await axios.get(
				`${UL_SWAPI}vehicles/?page=${page || 1}&format=json`,
			);
			const data = response.data;
			this.cacheManager.set(cacheKey, data.results);
			
			Logger.log(data, 'Bootstrap');
			
			return data;
		} catch (error) {
			console.error('Error fetching data:', error.message);
		}
	}
	
	async storeSpeciesCacheAndDatabase(page): Promise<PaginationInterface<SpeciesInterface>> {
		try {
			const cacheKey = `species`;
			const response: any = await axios.get(
				`${UL_SWAPI}species/?page=${page || 1}&format=json`,
			);
			const data = response.data;
			this.cacheManager.set(cacheKey, data.results);
			
			Logger.log(data, 'Bootstrap');
			
			return data;
		} catch (error) {
			console.error('Error fetching data:', error.message);
		}
	}
	
	async storePlanetsCacheAndDatabase(page): Promise<PaginationInterface<SpeciesInterface>> {
		try {
			const cacheKey = `planet`;
			const response: any = await axios.get(
				`${UL_SWAPI}planets/?page=${page || 1}&format=json`,
			);
			const data = response.data;
			this.cacheManager.set(cacheKey, data.results);
			
			Logger.log(data, 'Bootstrap');
			
			return data;
		} catch (error) {
			console.error('Error fetching data:', error.message);
		}
	}
}
