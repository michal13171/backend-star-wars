import {Expose, plainToClass} from "class-transformer";
import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {SpeciesInterface} from "../interfaces/species.interface";
import {FilmEntity} from "./film.entity";
import {FilmsInterface} from "../interfaces/films.interface";
import {PeopleEntity} from "./people.entity";
import {PeopleInterface} from "../interfaces/people.interface";

@Entity({
	name: 'species',
	orderBy: {
		createdAt: 'ASC'
	}
})
export class SpecieEntity implements SpeciesInterface {
	@PrimaryGeneratedColumn()
	id: number
	
	@Expose()
	@Column()
	average_height: string;
	
	@Expose()
	@Column()
	average_lifespan: string;
	
	@Expose()
	@Column()
	classification: string;

	@Expose()
	@Column()
	designation: string;

	@Expose()
	@Column()
	eye_colors: string;
	
	@ManyToMany(() => FilmEntity, (film) => film.species, {
		cascade: false,
	})
	@JoinTable()
	films: Array<FilmsInterface>;
	
	@Expose()
	@Column()
	hair_colors: string;
	
	@Expose()
	@Column()
	homeworld: string;
	
	@Expose()
	@Column()
	language: string;
	
	@Expose()
	@Column()
	name: string;
	
	@ManyToMany(() => PeopleEntity, (people) => people.species, {
		cascade: false,
	})
	@JoinTable()
	people: Array<PeopleInterface>;
	
	@Expose()
	@Column()
	skin_colors: string;
	
	@Expose()
	@Column()
	url: string;
	
	@Expose()
	@Column()
	created: number;
	
	@Expose()
	@Column()
	edited: number;
	
	constructor(species: Partial<SpecieEntity>) {
		if (species) {
			Object.assign(
				this,
				plainToClass(SpecieEntity, species, {
					excludeExtraneousValues: true
				})
			);
			this.created = this.created || +new Date()
			this.edited = +new Date()
		}
	}
}
