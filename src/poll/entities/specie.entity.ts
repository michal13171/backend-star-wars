import {Expose, plainToClass} from "class-transformer";
import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {SpeciesInterface} from "../interfaces/species.interface";
import {FilmEntity} from "./film.entity";
import {FilmsInterface} from "../interfaces/films.interface";
import {PeopleEntity} from "./people.entity";
import {PeopleInterface} from "../interfaces/people.interface";
import {ApiProperty} from "@nestjs/swagger";

@Entity({
	name: 'species',
})
export class SpecieEntity implements SpeciesInterface {
	@PrimaryGeneratedColumn()
	@ApiProperty({example: 1, description: 'The id of the Species'})
	id: number
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The average height of the Species'})
	average_height: string;
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The average lifespan of the Species'})
	average_lifespan: string;
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The classification of the Species'})
	classification: string;

	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The designation of the Species'})
	designation: string;

	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The eye colors of the Species'})
	eye_colors: string;
	
	@ManyToMany(() => FilmEntity, (film) => film.species, {
		cascade: false,
		nullable: true
	})
	@JoinTable()
	@ApiProperty({description: 'The relationship of the Species'})
	films: Array<FilmsInterface>;
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The hair colors of the Species'})
	hair_colors: string;
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The home world of the Species'})
	homeworld: string;
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The language of the Species'})
	language: string;
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The name of the Species'})
	name: string;
	
	@ManyToMany(() => PeopleEntity, (people) => people.species, {
		cascade: false,
		nullable: true
	})
	@JoinTable()
	@ApiProperty({description: 'The relationship of the Planet'})
	people: Array<PeopleInterface>;
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The skin colors of the Species'})
	skin_colors: string;
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The url of the Species'})
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
