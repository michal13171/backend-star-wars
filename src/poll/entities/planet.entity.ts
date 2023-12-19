import {Expose, plainToClass} from "class-transformer";
import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {PlanetsInterface} from "../interfaces/planets.interface";
import {FilmsInterface} from "../interfaces/films.interface";
import {FilmEntity} from "./film.entity";

@Entity({
	name: 'planets',
	orderBy: {
		createdAt: 'ASC'
	}
})
export class PlanetEntity implements PlanetsInterface {
	@PrimaryGeneratedColumn()
	id: number
	
	@Expose()
	@Column()
	climate: string;
	
	@Expose()
	@Column()
	diameter: string;
	
	@ManyToMany(() => FilmEntity, (film) => film.planets, {
		cascade: false,
	})
	@JoinTable()
	films: Array<FilmsInterface>;
	
	@Expose()
	@Column()
	gravity: string;
	
	@Expose()
	@Column()
	name: string;
	
	@Expose()
	@Column()
	orbital_period: string;
	
	@Expose()
	@Column()
	population: string;
	
	@Expose()
	@Column()
	rotation_period: string;
	
	@Expose()
	@Column()
	surface_water: string;
	
	@Expose()
	@Column()
	terrain: string;
	
	@Expose()
	@Column()
	url: string;
	
	@Expose()
	@Column()
	created: number;
	
	@Expose()
	@Column()
	edited: number;
	
	constructor(planet: Partial<PlanetEntity>) {
		if (planet) {
			Object.assign(
				this,
				plainToClass(PlanetEntity, planet, {
					excludeExtraneousValues: true
				})
			);
			this.created = this.created || +new Date()
			this.edited = +new Date()
		}
	}
}
