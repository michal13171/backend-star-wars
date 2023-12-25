import {Expose, plainToClass} from "class-transformer";
import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {PlanetsInterface} from "../interfaces/planets.interface";
import {FilmsInterface} from "../interfaces/films.interface";
import {FilmEntity} from "./film.entity";
import {ApiProperty} from "@nestjs/swagger";

@Entity({
	name: 'planets',
})
export class PlanetEntity implements PlanetsInterface {
	@PrimaryGeneratedColumn()
	@ApiProperty({example: 1, description: 'The id of the Planet'})
	id: number
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The climate of the Planet'})
	climate: string;
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The diameter of the Planet'})
	diameter: string;
	
	@ManyToMany(() => FilmEntity, (film) => film.planets, {
		cascade: false,
		nullable: true
	})
	@JoinTable()
	@ApiProperty({description: 'The relationship of the Planet'})
	films: Array<FilmsInterface>;
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The gravity of the Planet'})
	gravity: string;
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The name of the Planet'})
	name: string;
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The orbital period of the Planet'})
	orbital_period: string;
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The population of the Planet'})
	population: string;
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The rotation period of the Planet'})
	rotation_period: string;
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The surface water of the Planet'})
	surface_water: string;
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The terrain of the Planet'})
	terrain: string;
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The url of the Planet'})
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
