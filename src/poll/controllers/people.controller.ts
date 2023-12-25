import {Controller, Get, Param, ParseIntPipe, Query, UseInterceptors} from '@nestjs/common';
import {PeopleService} from "@services";
import {PeopleEntity} from "@entities";
import {PaginationDto} from "../dto/pagination.dto";
import {CacheInterceptor} from "@nestjs/cache-manager";
import {CacheKey} from "@nestjs/common/cache";

@Controller('peoples')
export class PeopleController {
	constructor(private peopleService: PeopleService) {}
	
	@UseInterceptors(CacheInterceptor)
	@CacheKey("people")
	@Get()
	getAllPeople(@Query() paginationDto: PaginationDto): Promise<PeopleEntity[]> {
		return this.peopleService.getAllPeople(paginationDto);
	}
	
	@Get(':id')
	getPeople(@Param('id', ParseIntPipe) id: number): Promise<PeopleEntity> {
		return this.peopleService.getPeople(id);
	}
}
