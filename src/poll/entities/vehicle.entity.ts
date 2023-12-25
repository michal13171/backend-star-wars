import {Expose, plainToClass} from "class-transformer";
import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {VehiclesInterface} from "../interfaces/vehicles.interface";
import {FilmEntity} from "./film.entity";
import {FilmsInterface} from "../interfaces/films.interface";
import {ApiProperty} from "@nestjs/swagger";

@Entity({
	name: 'vehicles',
})
export class VehicleEntity implements VehiclesInterface {
	@PrimaryGeneratedColumn()
	@ApiProperty({example: 1, description: 'The id of the Vehicle'})
	id: number
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The cargo capacity of the Vehicle'})
	cargo_capacity: string;
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The consumables of the Vehicle'})
	consumables: string;
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The cost in credits of the Vehicle'})
	cost_in_credits: string;
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The crew of the Vehicle'})
	crew: string;
	
	@ManyToMany(() => FilmEntity, (film) => film.vehicles, {
		cascade: false,
		nullable: true
	})
	@JoinTable()
	@ApiProperty({description: 'The relationship of the Vehicle'})
	films: Array<FilmsInterface>;
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The length of the Vehicle'})
	length: string;
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The manufacturer of the Vehicle'})
	manufacturer: string;
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The max atmosphering speed of the Vehicle'})
	max_atmosphering_speed: string;
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The model of the Vehicle'})
	model: string;
	
	@Expose()
	@Column({nullable: true, unique: true})
	@ApiProperty({description: 'The name of the Vehicle'})
	name: string;
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The passengers of the Vehicle'})
	passengers: string;

	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The url of the Vehicle'})
	url: string;
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The vehicle class of the Vehicle'})
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
