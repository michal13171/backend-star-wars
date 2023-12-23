import {Expose, plainToClass} from "class-transformer";
import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {SpeciesInterface} from "../interfaces/species.interface";
import {FilmEntity} from "./film.entity";
import {FilmsInterface} from "../interfaces/films.interface";
import {PeopleEntity} from "./people.entity";
import {PeopleInterface} from "../interfaces/people.interface";

@Entity({
	name: 'species',
})
export class SpecieEntity implements SpeciesInterface {
	@PrimaryGeneratedColumn()
	id: number
	
	@Expose()
	@Column({nullable: true})
	average_height: string;
	
	@Expose()
	@Column({nullable: true})
	average_lifespan: string;
	
	@Expose()
	@Column({nullable: true})
	classification: string;

	@Expose()
	@Column({nullable: true})
	designation: string;

	@Expose()
	@Column({nullable: true})
	eye_colors: string;
	
	@ManyToMany(() => FilmEntity, (film) => film.species, {
		cascade: false,
		nullable: true
	})
	@JoinTable()
	films: Array<FilmsInterface>;
	
	@Expose()
	@Column({nullable: true})
	hair_colors: string;
	
	@Expose()
	@Column({nullable: true})
	homeworld: string;
	
	@Expose()
	@Column({nullable: true})
	language: string;
	
	@Expose()
	@Column({nullable: true})
	name: string;
	
	@ManyToMany(() => PeopleEntity, (people) => people.species, {
		cascade: false,
		nullable: true
	})
	@JoinTable()
	people: Array<PeopleInterface>;
	
	@Expose()
	@Column({nullable: true})
	skin_colors: string;
	
	@Expose()
	@Column({nullable: true})
	url: string;
	
	@Expose()
	@Column({nullable: true})
	created: string;
	
	@Expose()
	@Column({nullable: true})
	edited: string;
	
	constructor(species: Partial<SpecieEntity>) {
		if (species) {
			Object.assign(
				this,
				plainToClass(SpecieEntity, species, {
					excludeExtraneousValues: true
				})
			);
			this.created = this.created.toString() || (new Date()).toString()
			this.edited = (new Date()).toString()
		}
	}
}
