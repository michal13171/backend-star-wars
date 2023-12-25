import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {PlanetEntity} from "@entities";
import {Repository} from "typeorm";
import {PaginationDto} from "../dto/pagination.dto";

@Injectable()
export class PlanetService {
	constructor(
		@InjectRepository(PlanetEntity) private entityRepository: Repository<PlanetEntity>,
	) {}
	
	getAllPlanet(paginationDto: PaginationDto) {
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
	
	getPlanet(idk: number) {
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
