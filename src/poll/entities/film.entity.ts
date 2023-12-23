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

@Entity({
	name: 'films',
})
export class FilmEntity implements FilmsInterface {
	@PrimaryGeneratedColumn()
	id: number
	
	@Expose()
	@Column({nullable: true})
	director: string;
	
	@Expose()
	@Column({nullable: true})
	episode_id: number;
	
	@Expose()
	@Column({nullable: true})
	opening_crawl: string;
	
	@ManyToMany(() => PlanetEntity, (planet) => planet.films, {
		cascade: false,
	})
	@JoinTable()
	planets: Array<PlanetsInterface>;
	
	@Expose()
	@Column({nullable: true})
	producer: string;
	
	@Expose()
	@Column({nullable: true})
	release_date: string;
	
	@ManyToMany(() => SpecieEntity, (specie) => specie.films, {
		cascade: false,
	})
	@JoinTable()
	species: Array<SpeciesInterface>;
	
	@ManyToMany(() => StarshipEntity, (starship) => starship.films, {
		cascade: false,
	})
	@JoinTable()
	starships: Array<StarshipsInterface>;
	
	@Expose()
	@Column({nullable: true})
	title: string;
	
	@Expose()
	@Column({nullable: true})
	url: string;
	
	@ManyToMany(() => VehicleEntity, (vehicle) => vehicle.films, {
		cascade: false,
	})
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
