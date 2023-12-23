import {EntityRepository, Repository} from "typeorm";
import {PlanetEntity} from "@entities";

@EntityRepository(PlanetEntity)
export class PlanetEntityRepository extends Repository<PlanetEntity> {
	async findByName(name: string): Promise<PlanetEntity> {
		return this.findOneBy({name});
	}
}
