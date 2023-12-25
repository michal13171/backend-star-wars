import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {FilmEntity} from "@entities";
import {Repository} from "typeorm";
import {PaginationDto} from "../dto/pagination.dto";

@Injectable()
export class FilmService {
	constructor(
		@InjectRepository(FilmEntity) private entityRepository: Repository<FilmEntity>,
	) {}
	
	getAllFilmListings() {
		return this.entityRepository.find({
			relations: {
				characters: true
			}
		});
	}
	
	async getAllFilms(paginationDto: PaginationDto) {
		const {page, pageSize} = paginationDto;
		const skip = (page - 1) * pageSize;
		
		const films = await this.entityRepository.find({
			take: pageSize,
			skip: skip,
			relations: {
				characters: true
			},
		});
		
		const wordOccurrences: Record<string, number> = {};
		const characterOccurrences: Record<string, number> = {};
		Logger.log(films)
		
		films.forEach((film) => {
			const findUniqueWords = /\s+([ \t\r\n]+)\s*/;
			const openings = film.opening_crawl.split(findUniqueWords);
			const input = "   \t\r\n  ";
			
			if (findUniqueWords.test(input)) {
				openings.forEach((word) => {
					if (word) {
						wordOccurrences[word] = (wordOccurrences[word] || 0) + 1;
					}
				});
			}
			
			Logger.log(film.characters)
			film.characters.forEach((character) => {
				const characterName = character.name.trim();
				characterOccurrences[characterName] = (characterOccurrences[characterName] || 0) + 1;
			});
		});
		
		const maxOccurrences = Math.max(...Object.values(characterOccurrences));
		const mostFrequentCharacters = Object.keys(characterOccurrences).filter(
			(character) => characterOccurrences[character] === maxOccurrences
		);
		
		return {
			wordOccurrences: Object.entries(wordOccurrences).map(([word, count]) => ({
				word,
				count,
			})),
			mostFrequentCharacters,
		};
	}
	
	getFilm(idk: number) {
		return this.entityRepository.findOne({
			where: {
				id: idk
			},
			relations: {
				vehicles: true,
				starships: true,
				species: true,
				planets: true,
				characters: true,
			}
		});
	}
}
