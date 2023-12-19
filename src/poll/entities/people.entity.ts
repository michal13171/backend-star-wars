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

@Entity({
	name: 'peoples',
	orderBy: {
		createdAt: 'ASC'
	}
})
export class PeopleEntity implements PeopleInterface {
	@PrimaryGeneratedColumn()
	id: number
	
	@Expose()
	@Column()
	birth_year: string;
	
	@Expose()
	@Column()
	eye_color: string;
	
	@ManyToMany(() => FilmEntity)
	@JoinTable()
	films: Array<FilmsInterface>;
	
	@Expose()
	@Column()
	gender: string;
	
	@Expose()
	@Column()
	hair_color: string;
	
	@Expose()
	@Column()
	height: string;
	
	@Expose()
	@Column()
	homeworld: string;
	
	@Expose()
	@Column()
	mass: string;
	
	@Expose()
	@Column()
	name: string;
	
	@Expose()
	@Column()
	skin_color: string;
	
	@ManyToMany(() => SpecieEntity)
	@JoinTable()
	species: Array<SpeciesInterface>;
	
	@ManyToMany(() => StarshipEntity)
	@JoinTable()
	starships: Array<StarshipsInterface>;
	
	@Expose()
	@Column()
	url: string;
	
	@ManyToMany(() => VehicleEntity)
	@JoinTable()
	vehicles: Array<VehiclesInterface>;
	
	@Expose()
	@Column()
	created: number;
	
	@Expose()
	@Column()
	edited: number;
	
	constructor(people: Partial<PeopleEntity>) {
		if (people) {
			Object.assign(
				this,
				plainToClass(PeopleEntity, people, {
					excludeExtraneousValues: true
				})
			);
			this.created = this.created || +new Date()
			this.edited = +new Date()
		}
	}
}
