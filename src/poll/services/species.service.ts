import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {SpecieEntity} from "@entities";
import {Repository} from "typeorm";
import {PaginationDto} from "../dto/pagination.dto";

@Injectable()
export class SpeciesService {
	constructor(
		@InjectRepository(SpecieEntity) private entityRepository: Repository<SpecieEntity>,
	) {}
	
	getAllSpecies(paginationDto: PaginationDto) {
		const {page, pageSize} = paginationDto;
		const skip = (page - 1) * pageSize;
		
		return this.entityRepository.find({
			take: pageSize,
			skip: skip,
			relations: {
				films: true,
				people: true,
			}
		});
	}
	
	getSpecies(idk: number) {
		return this.entityRepository.findOne({
			where: {
				id: idk
			},
			relations: {
				films: true,
				people: true,
			}
		});
	}
}
