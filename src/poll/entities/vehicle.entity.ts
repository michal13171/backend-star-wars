import {Expose, plainToClass} from "class-transformer";
import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {VehiclesInterface} from "../interfaces/vehicles.interface";
import {FilmEntity} from "./film.entity";
import {FilmsInterface} from "../interfaces/films.interface";

@Entity({
	name: 'vehicles',
})
export class VehicleEntity implements VehiclesInterface {
	@PrimaryGeneratedColumn()
	id: number
	
	@Expose()
	@Column({nullable: true})
	cargo_capacity: string;
	
	@Expose()
	@Column({nullable: true})
	consumables: string;
	
	@Expose()
	@Column({nullable: true})
	cost_in_credits: string;
	
	@Expose()
	@Column({nullable: true})
	crew: string;
	
	@ManyToMany(() => FilmEntity, (film) => film.vehicles, {
		cascade: false,
	})
	@JoinTable()
	films: Array<FilmsInterface>;
	
	@Expose()
	@Column({nullable: true})
	length: string;
	
	@Expose()
	@Column({nullable: true})
	manufacturer: string;
	
	@Expose()
	@Column({nullable: true})
	max_atmosphering_speed: string;
	
	@Expose()
	@Column({nullable: true})
	model: string;
	
	@Expose()
	@Column({nullable: true})
	name: string;
	
	@Expose()
	@Column({nullable: true})
	passengers: string;

	@Expose()
	@Column({nullable: true})
	url: string;
	
	@Expose()
	@Column({nullable: true})
	vehicle_class: string;
	
	@Expose()
	@Column({nullable: true})
	created: string;
	
	@Expose()
	@Column({nullable: true})
	edited: string;
	
	constructor(vehicle: Partial<VehicleEntity>) {
		if (vehicle) {
			Object.assign(
				this,
				plainToClass(VehicleEntity, vehicle, {
					excludeExtraneousValues: true
				})
			);
			this.created = this.created.toString() || (new Date()).toString()
			this.edited = (new Date()).toString()
		}
	}
}
