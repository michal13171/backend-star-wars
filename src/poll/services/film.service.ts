import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {FilmEntity} from "@entities";
import {Repository} from "typeorm";
import {PaginationDto} from "../dto/pagination.dto";

@Injectable()
export class FilmService {
	constructor(
		@InjectRepository(FilmEntity) private entityRepository: Repository<FilmEntity>,
	) {}
	
	async getAllFilms(paginationDto: PaginationDto) {
		const {page, pageSize} = paginationDto;
		const skip = (page - 1) * pageSize;
		
		const films = await this.entityRepository.find({
			take: pageSize,
			skip: skip,
			relations: {
				vehicles: true,
				starships: true,
				species: true,
				planets: true,
			},
		});
		
		const wordOccurrences: Record<string, number> = {};
		
		films.forEach((film) => {
			const findUniqueWords  =/\s+([ \t\r\n]+)\s*/;
			const openings = film.opening_crawl.split(findUniqueWords);
			const input = "   \t\r\n  ";

			if (findUniqueWords.test(input)) {
				openings.forEach((word) => {
					if (word.trim() !== '') {
						wordOccurrences[word] = (wordOccurrences[word] || 0) + 1;
					}
				});
			}
		});
		
		return Object.entries(wordOccurrences).map(([word, count]) => ({
			word,
			count,
		}));
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
				planets: true
			}
		});
	}
}
