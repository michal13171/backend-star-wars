import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {StarshipEntity} from "@entities";
import {Repository} from "typeorm";
import {PaginationDto} from "../dto/pagination.dto";

@Injectable()
export class StarshipService {
	constructor(
		@InjectRepository(StarshipEntity) private entityRepository: Repository<StarshipEntity>,
	) {}
	
	getAllStarships(paginationDto: PaginationDto) {
		const {page, pageSize} = paginationDto;
		const skip = (page - 1) * pageSize;
		
		return this.entityRepository.find({
			take: pageSize,
			skip: skip,
			relations: {
				films: true,
			}
		});
	}
	
	getStarship(idk: number) {
		return this.entityRepository.findOne({
			where: {
				id: idk
			},
			relations: {
				films: true,
			}
		});
	}
}
