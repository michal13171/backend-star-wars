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
})
export class PeopleEntity implements PeopleInterface {
	@PrimaryGeneratedColumn()
	id: number
	
	@Expose()
	@Column({nullable: true})
	birth_year: string;
	
	@Expose()
	@Column({nullable: true})
	eye_color: string;
	
	@ManyToMany(() => FilmEntity)
	@JoinTable()
	films: Array<FilmsInterface>;
	
	@Expose()
	@Column({nullable: true})
	gender: string;
	
	@Expose()
	@Column({nullable: true})
	hair_color: string;
	
	@Expose()
	@Column({nullable: true})
	height: string;
	
	@Expose()
	@Column({nullable: true})
	homeworld: string;
	
	@Expose()
	@Column({nullable: true})
	mass: string;
	
	@Expose()
	@Column({nullable: true})
	name: string;
	
	@Expose()
	@Column({nullable: true})
	skin_color: string;
	
	@ManyToMany(() => SpecieEntity)
	@JoinTable()
	species: Array<SpeciesInterface>;
	
	@ManyToMany(() => StarshipEntity)
	@JoinTable()
	starships: Array<StarshipsInterface>;
	
	@Expose()
	@Column({nullable: true})
	url: string;
	
	@ManyToMany(() => VehicleEntity)
	@JoinTable()
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
