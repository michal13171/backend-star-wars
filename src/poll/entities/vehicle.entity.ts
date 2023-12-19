import {Expose, plainToClass} from "class-transformer";
import {Column, Entity, ObjectIdColumn} from "typeorm";
import {VehiclesInterface} from "../interfaces/vehicles.interface";
import {uuidv4} from '@utils'

@Entity({
	name: 'vehicles',
	orderBy: {
		createdAt: 'ASC'
	}
})
export class VehicleEntity implements VehiclesInterface {
	@Expose()
	@ObjectIdColumn()
	_id: string;
	
	@Expose()
	@Column()
	cargo_capacity: string;
	
	@Expose()
	@Column()
	consumables: string;
	
	@Expose()
	@Column()
	cost_in_credits: string;
	
	@Expose()
	@Column()
	crew: string;
	
	@Expose()
	@Column()
	films: Array<string>;
	
	@Expose()
	@Column()
	length: string;
	
	@Expose()
	@Column()
	manufacturer: string;
	
	@Expose()
	@Column()
	max_atmosphering_speed: string;
	
	@Expose()
	@Column()
	model: string;
	
	@Expose()
	@Column()
	name: string;
	
	@Expose()
	@Column()
	passengers: string;
	
	@Expose()
	@Column()
	pilots: Array<string>;
	
	@Expose()
	@Column()
	url: string;
	
	@Expose()
	@Column()
	vehicle_class: string;
	
	@Expose()
	@Column()
	created: number;
	
	@Expose()
	@Column()
	edited: number;
	
	constructor(vehicle: Partial<VehicleEntity>) {
		if (vehicle) {
			Object.assign(
				this,
				plainToClass(VehicleEntity, vehicle, {
					excludeExtraneousValues: true
				})
			);
			this._id = this._id || uuidv4()
			this.created = this.created || +new Date()
			this.edited = +new Date()
		}
	}
}
