import {EntityRepository, Repository} from "typeorm";
import {StarshipEntity} from "@entities";

@EntityRepository(StarshipEntity)
export class StarshipEntityRepository extends Repository<StarshipEntity> {
	async findByName(name: string): Promise<StarshipEntity> {
		return this.findOneBy({name});
	}
}
