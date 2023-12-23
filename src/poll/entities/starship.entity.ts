import {Expose, plainToClass} from "class-transformer";
import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {StarshipsInterface} from "../interfaces/starships.interface";
import {FilmsInterface} from "../interfaces/films.interface";
import {FilmEntity} from "./film.entity";

@Entity({
	name: 'starships',
})
export class StarshipEntity implements StarshipsInterface {
	@PrimaryGeneratedColumn()
	id: number
	
	@Expose()
	@Column({nullable: true})
	MGLT: string;
	
	@Expose()
	@Column({nullable: true})
	cargo_capacity: string;
	
	@Expose()
	@Column({nullable: true})
	consumables: string;
	
	@Expose()
	@Column({nullable: true})
	cost_in_credits: string;
	
	@Expose()
	@Column({nullable: true})
	crew: string;
	
	@ManyToMany(() => FilmEntity, (film) => film.starships, {
		cascade: false,
	})
	@JoinTable()
	films: Array<FilmsInterface>;
	
	@Expose()
	@Column({nullable: true})
	hyperdrive_rating: string;
	
	@Expose()
	@Column({nullable: true})
	length: string;
	
	@Expose()
	@Column({nullable: true})
	manufacturer: string;
	
	@Expose()
	@Column({nullable: true})
	max_atmosphering_speed: string;
	
	@Expose()
	@Column({nullable: true})
	model: string;
	
	@Expose()
	@Column({nullable: true})
	name: string;
	
	@Expose()
	@Column({nullable: true})
	passengers: string;
	
	@Expose()
	@Column({nullable: true})
	starship_class: string;
	
	@Expose()
	@Column({nullable: true})
	url: string;
	
	@Expose()
	@Column({nullable: true})
	created: string;
	
	@Expose()
	@Column({nullable: true})
	edited: string;
	
	constructor(starship: Partial<StarshipEntity>) {
		if (starship) {
			Object.assign(
				this,
				plainToClass(StarshipEntity, starship, {
					excludeExtraneousValues: true
				})
			);
			this.created = this.created.toString() || (new Date()).toString()
			this.edited = (new Date()).toString()
		}
	}
}
