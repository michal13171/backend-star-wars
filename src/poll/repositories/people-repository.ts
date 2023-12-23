import {EntityRepository, Repository} from "typeorm";
import {PeopleEntity} from "@entities";

@EntityRepository(PeopleEntity)
export class PeopleEntityRepository  extends Repository<PeopleEntity> {
	async findByName(name: string): Promise<PeopleEntity> {
		return this.findOneBy({ name });
	}
}
