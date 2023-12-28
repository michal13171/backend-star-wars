import {PeopleInterface} from "../interfaces/people.interface";
import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Expose, plainToClass} from "class-transformer";
import {FilmsInterface} from "../interfaces/films.interface";
import {FilmEntity} from "./film.entity";
import {SpecieEntity} from "./specie.entity";
import {SpeciesInterface} from "../interfaces/species.interface";
import {StarshipEntity} from "./starship.entity";
import {StarshipsInterface} from "../interfaces/starships.interface";
import {VehicleEntity} from "./vehicle.entity";
import {VehiclesInterface} from "../interfaces/vehicles.interface";
import {ApiProperty} from "@nestjs/swagger";

@Entity({
	name: 'peoples',
})
export class PeopleEntity implements PeopleInterface {
	@PrimaryGeneratedColumn()
	@ApiProperty({example: 1, description: 'The id of the People'})
	id: number
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The birth year of the People'})
	birth_year: string;
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The eye_color of the People'})
	eye_color: string;
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The gender of the People'})
	gender: string;
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The hair color of the People'})
	hair_color: string;
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The height of the People'})
	height: string;
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The home world of the People'})
	homeworld: string;
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The mass kg of the People'})
	mass: string;
	
	@Expose()
	@Column({nullable: true, unique: true})
	@ApiProperty({description: 'The name of the People'})
	name: string;
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The skin color of the People'})
	skin_color: string;
	
	@ManyToMany(() => SpecieEntity, {nullable: true})
	@JoinTable()
	@ApiProperty({description: 'The relationship of the People'})
	species: Array<SpeciesInterface>;
	
	@ManyToMany(() => StarshipEntity, {nullable: true})
	@JoinTable()
	@ApiProperty({description: 'The relationship of the People'})
	starships: Array<StarshipsInterface>;
	
	@ManyToMany(() => FilmEntity, (film) => film.species, {
		cascade: false,
		nullable: true
	})
	@JoinTable()
	@ApiProperty({description: 'The relationship of the People'})
	films: Array<FilmsInterface>;
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The url of the People'})
	url: string;
	
	@ManyToMany(() => VehicleEntity, {nullable: true})
	@JoinTable()
	@ApiProperty({description: 'The relationship of the People'})
	vehicles: Array<VehiclesInterface>;
	
	@Expose()
	@Column({nullable: true})
	created: string;
	
	@Expose()
	@Column({nullable: true})
	edited: string;
	
	constructor(people: Partial<PeopleEntity>) {
		if (people) {
			Object.assign(
				this,
				plainToClass(PeopleEntity, people, {
					excludeExtraneousValues: true
				})
			);
			this.created = this.created.toString() || (new Date()).toString()
			this.edited = (new Date()).toString()
		}
	}
}
