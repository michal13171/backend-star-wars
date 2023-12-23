import {Expose, plainToClass} from "class-transformer";
import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {PlanetsInterface} from "../interfaces/planets.interface";
import {FilmsInterface} from "../interfaces/films.interface";
import {FilmEntity} from "./film.entity";

@Entity({
	name: 'planets',
})
export class PlanetEntity implements PlanetsInterface {
	@PrimaryGeneratedColumn()
	id: number
	
	@Expose()
	@Column({nullable: true})
	climate: string;
	
	@Expose()
	@Column({nullable: true})
	diameter: string;
	
	@ManyToMany(() => FilmEntity, (film) => film.planets, {
		cascade: false,
		nullable: true
	})
	@JoinTable()
	films: Array<FilmsInterface>;
	
	@Expose()
	@Column({nullable: true})
	gravity: string;
	
	@Expose()
	@Column({nullable: true})
	name: string;
	
	@Expose()
	@Column({nullable: true})
	orbital_period: string;
	
	@Expose()
	@Column({nullable: true})
	population: string;
	
	@Expose()
	@Column({nullable: true})
	rotation_period: string;
	
	@Expose()
	@Column({nullable: true})
	surface_water: string;
	
	@Expose()
	@Column({nullable: true})
	terrain: string;
	
	@Expose()
	@Column({nullable: true})
	url: string;
	
	@Expose()
	@Column({nullable: true})
	created: string;
	
	@Expose()
	@Column({nullable: true})
	edited: string;
	
	constructor(planet: Partial<PlanetEntity>) {
		if (planet) {
			Object.assign(
				this,
				plainToClass(PlanetEntity, planet, {
					excludeExtraneousValues: true
				})
			);
			this.created = this.created.toString() || (new Date()).toString()
			this.edited = (new Date()).toString()
		}
	}
}
