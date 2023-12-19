import {Expose, plainToClass} from "class-transformer";
import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {StarshipsInterface} from "../interfaces/starships.interface";
import {FilmsInterface} from "../interfaces/films.interface";
import {FilmEntity} from "./film.entity";

@Entity({
	name: 'starships',
	orderBy: {
		createdAt: 'ASC'
	}
})
export class StarshipEntity implements StarshipsInterface {
	@PrimaryGeneratedColumn()
	id: number
	
	@Expose()
	@Column()
	MGLT: string;
	
	@Expose()
	@Column()
	cargo_capacity: string;
	
	@Expose()
	@Column()
	consumables: string;
	
	@Expose()
	@Column()
	cost_in_credits: string;
	
	@Expose()
	@Column()
	crew: string;
	
	@ManyToMany(() => FilmEntity, (film) => film.starships, {
		cascade: false,
	})
	@JoinTable()
	films: Array<FilmsInterface>;
	
	@Expose()
	@Column()
	hyperdrive_rating: string;
	
	@Expose()
	@Column()
	length: string;
	
	@Expose()
	@Column()
	manufacturer: string;
	
	@Expose()
	@Column()
	max_atmosphering_speed: string;
	
	@Expose()
	@Column()
	model: string;
	
	@Expose()
	@Column()
	name: string;
	
	@Expose()
	@Column()
	passengers: string;
	
	@Expose()
	@Column()
	starship_class: string;
	
	@Expose()
	@Column()
	url: string;
	
	@Expose()
	@Column()
	created: number;
	
	@Expose()
	@Column()
	edited: number;
	
	constructor(starship: Partial<StarshipEntity>) {
		if (starship) {
			Object.assign(
				this,
				plainToClass(StarshipEntity, starship, {
					excludeExtraneousValues: true
				})
			);
			this.created = this.created || +new Date()
			this.edited = +new Date()
		}
	}
}
