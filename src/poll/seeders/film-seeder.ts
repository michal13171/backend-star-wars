import {Seeder} from "nestjs-seeder";
import {Inject, Injectable, Logger} from "@nestjs/common";
import {FilmEntity, PeopleEntity} from "@entities";
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
		@InjectRepository(PeopleEntity) private peopleEntityRepository: Repository<PeopleEntity>,
		@Inject(CACHE_MANAGER) private cacheManager: Cache,
		private appService: AppService
	) {}
	
	async drop(): Promise<any> {
		await this.filmEntityRepository.clear();
	}

	async seed(): Promise<any> {
		const cacheKey = `films`;
		let nextPageUrl = `${UL_SWAPI}films/?page=1&format=json`;
		const getAllFilmsWithPeople = [];

		do {
			const storeFilmCacheAndDatabase =
				await this.appService.fetchData(nextPageUrl);

			for (const res of storeFilmCacheAndDatabase['results']) {
				const getPeople = [];

				for (const vale of res.characters) {
					const getParseInt = vale.split('/');
					const personId = parseInt(getParseInt[5]);

					try {
						const personEntity =
							await this.peopleEntityRepository.manager.findOne(PeopleEntity, {
								where: {
									id: personId,
								},
							});

						getPeople.push(personEntity);
					} catch (error) {
						console.error('Error fetching person entity:', error);
						throw error;
					}
				}

				const filmEntity = await this.filmEntityRepository.save(
					this.filmEntityRepository.create({
						...res,
						characters: getPeople, // Assuming characters is the name of the ManyToMany relationship in your FilmEntity
					}),
				);

				getAllFilmsWithPeople.push(filmEntity);
			}

			Logger.log(getAllFilmsWithPeople.length, 'Bootstrap');
			await this.cacheManager.set(cacheKey, getAllFilmsWithPeople);

			nextPageUrl = storeFilmCacheAndDatabase.next;
		} while (nextPageUrl !== null);
	}
	
}
