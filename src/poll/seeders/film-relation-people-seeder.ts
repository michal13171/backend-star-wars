import {Inject, Injectable, Logger} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {FilmEntity, PeopleEntity} from "@entities";
import {Repository} from "typeorm";
import {CACHE_MANAGER} from "@nestjs/cache-manager";
import {Cache} from "cache-manager";
import {FilmService, PeopleService} from "@services";

@Injectable()
export class FilmRelationPeopleSeeder {
	constructor(
		@InjectRepository(FilmEntity) private filmEntityRepository: Repository<FilmEntity>,
		@Inject(CACHE_MANAGER) private cacheManager: Cache,
		private peopleService: PeopleService,
		private filmService: FilmService,
	) {}
	
	async drop(): Promise<any> {
		await this.filmEntityRepository.clear();
	}
	
	async seed(): Promise<any> {
		const cacheKey = `filmRelationPeople`;
		
		const films = await this.filmService.getAllFilmListings(); // Adjust the method based on your actual implementation
		const people = await this.peopleService.getAllPeople({
			page: 1,
			pageSize: 150
		});
		
		const filmEntities: FilmEntity[] = [];
		
		for (const film of films) {
			const shuffledPeople = this.shuffleArray(people).slice(0, 5);
			
			const filmEntity = this.filmEntityRepository.create({
				characters: shuffledPeople,
			});
			
			filmEntities.push(filmEntity);
		}
		await this.cacheManager.set(cacheKey, filmEntities);
		Logger.log(filmEntities, 'Bootstrap');
		
		await this.filmEntityRepository.save(filmEntities);
		
		return 'Seeding completed successfully';
	}
	
	private shuffleArray(array: PeopleEntity[]): PeopleEntity[] {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}
}
