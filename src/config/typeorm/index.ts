import {TYPEORM} from "@environments";
import {Injectable} from "@nestjs/common";
import {TypeOrmModuleOptions, TypeOrmOptionsFactory} from '@nestjs/typeorm'
import {FilmEntity, PeopleEntity, PlanetEntity, SpecieEntity, StarshipEntity, VehicleEntity} from "@entities";

@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {
	async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
		return {
			...TYPEORM,
			type: 'mysql',
			entities: [PeopleEntity, FilmEntity, StarshipEntity, SpecieEntity, VehicleEntity, PlanetEntity],
			synchronize: true,
			autoLoadEntities: true,
			keepConnectionAlive: true,
			logging: true
		}
	}
}
