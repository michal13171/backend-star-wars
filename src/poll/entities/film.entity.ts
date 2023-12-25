import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from 'typeorm'
import {Expose, plainToClass} from 'class-transformer'
import {FilmsInterface} from "../interfaces/films.interface";
import {PlanetEntity} from "./planet.entity";
import {SpecieEntity} from "./specie.entity";
import {StarshipEntity} from "./starship.entity";
import {VehicleEntity} from "./vehicle.entity";
import {PlanetsInterface} from "../interfaces/planets.interface";
import {SpeciesInterface} from "../interfaces/species.interface";
import {StarshipsInterface} from "../interfaces/starships.interface";
import {VehiclesInterface} from "../interfaces/vehicles.interface";
import {PeopleInterface} from "../interfaces/people.interface";
import {PeopleEntity} from "./people.entity";
import {ApiProperty} from "@nestjs/swagger";

@Entity({
	name: 'films',
})
export class FilmEntity implements FilmsInterface {
	@PrimaryGeneratedColumn()
	@ApiProperty({ example: 1, description: 'The id of the Film' })
	id: number
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({
		example: 'Maine Coon',
		description: 'The breed of the film',
	})
	director: string;
	
	@Expose()
	@ApiProperty({ example: 1, description: 'The episode id of the Film' })
	@Column({nullable: true})
	episode_id: number;
	
	@Expose()
	@ApiProperty({ example: "It is a period of civil war...", description: 'The description of the Film' })
	@Column({nullable: true, type: "longtext"})
	opening_crawl: string;
	
	@ManyToMany(() => PlanetEntity, (planet) => planet.films, {
		cascade: false,
		nullable: true
	})
	@ApiProperty({ description: 'The relationship of the Film' })
	@JoinTable()
	planets: Array<PlanetsInterface>;
	
	@Expose()
	@ApiProperty({ description: 'The producer name of the Film' })
	@Column({nullable: true})
	producer: string;
	
	@Expose()
	@ApiProperty({ description: 'The release date of the Film' })
	@Column({nullable: true})
	release_date: string;
	
	@ManyToMany(() => SpecieEntity, (specie) => specie.films, {
		cascade: false,
		nullable: true
	})
	@ApiProperty({ description: 'The relationship of the Film' })
	@JoinTable()
	species: Array<SpeciesInterface>;
	
	@ManyToMany(() => PeopleEntity, (people) => people.films, {
		cascade: false,
		nullable: true
	})
	@ApiProperty({ description: 'The relationship of the Film' })
	@JoinTable()
	characters: Array<PeopleInterface>;
	
	@ManyToMany(() => StarshipEntity, (starship) => starship.films, {
		cascade: false,
		nullable: true
	})
	@ApiProperty({ description: 'The relationship of the Film' })
	@JoinTable()
	starships: Array<StarshipsInterface>;
	
	@Expose()
	@ApiProperty({ description: 'The title name of the Film' })
	@Column({nullable: true})
	title: string;
	
	@Expose()
	@ApiProperty({ description: 'The url of the Film' })
	@Column({nullable: true})
	url: string;
	
	@ManyToMany(() => VehicleEntity, (vehicle) => vehicle.films, {
		cascade: false,
		nullable: true
	})
	@ApiProperty({ description: 'The relationship of the Film' })
	@JoinTable()
	vehicles: Array<VehiclesInterface>;
	
	@Expose()
	@Column({nullable: true})
	created: string;
	
	@Expose()
	@Column({nullable: true})
	edited: string;
	
	constructor(film: Partial<FilmEntity>) {
		if (film) {
			Object.assign(
				this,
				plainToClass(FilmEntity, film, {
					excludeExtraneousValues: true
				})
			);
			this.created = this.created.toString() || (new Date()).toString()
			this.edited = (new Date()).toString()
		}
	}
	
}
