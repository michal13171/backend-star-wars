import {Expose, plainToClass} from "class-transformer";
import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {VehiclesInterface} from "../interfaces/vehicles.interface";
import {FilmEntity} from "./film.entity";
import {FilmsInterface} from "../interfaces/films.interface";

@Entity({
	name: 'vehicles',
	orderBy: {
		createdAt: 'ASC'
	}
})
export class VehicleEntity implements VehiclesInterface {
	@PrimaryGeneratedColumn()
	id: number
	
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
	
	@ManyToMany(() => FilmEntity, (film) => film.vehicles, {
		cascade: false,
	})
	@JoinTable()
	films: Array<FilmsInterface>;
	
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
			this.created = this.created || +new Date()
			this.edited = +new Date()
		}
	}
}
