import {EntityRepository, Repository} from "typeorm";
import {VehicleEntity} from "@entities";

@EntityRepository(VehicleEntity)
export class VehicleEntityRepository extends Repository<VehicleEntity> {
	async findByName(name: string): Promise<VehicleEntity> {
		return this.findOneBy({name});
	}
}
