import {EntityRepository, Repository} from "typeorm";
import {SpecieEntity} from "@entities";

@EntityRepository(SpecieEntity)
export class SpecieEntityRepository extends Repository<SpecieEntity> {
	async findByName(name: string): Promise<SpecieEntity> {
		return this.findOneBy({name});
	}
}
