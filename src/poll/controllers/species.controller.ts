import { Controller, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags('species')
@UseInterceptors(CacheInterceptor)
@Controller('species')
export class SpeciesController {
  // constructor(private speciesService: SpeciesService) {}
  //
  // @Get()
  // @ApiQuery({
  //   name: 'page',
  //   required: true,
  //   type: Number,
  // })
  // @ApiQuery({
  //   name: 'pageSize',
  //   required: true,
  //   type: Number,
  // })
  // @ApiResponse({
  //   status: 200,
  //   description: `Get all species with pagination example: ?page=1&pageSize=5`,
  // })
  // getAllSpecies(
  //   @Query() paginationDto: PaginationDto,
  // ): Promise<SpecieEntity[]> {
  //   return this.speciesService.getAllSpecies(paginationDto);
  // }
  //
  // @Get(':id')
  // @ApiResponse({
  //   status: 200,
  //   description: `Single species with relationships`,
  // })
  // getSpecies(@Param('id', ParseIntPipe) id: number): Promise<SpecieEntity> {
  //   return this.speciesService.getSpecies(id);
  // }
}
