import {Column, Entity, ObjectIdColumn} from 'typeorm'
import {Expose, plainToClass} from 'class-transformer'
import {FilmsInterface} from "../interfaces/films.interface";
import {uuidv4} from "@utils";

@Entity({
	name: 'films',
	orderBy: {
		createdAt: 'ASC'
	}
})
export class FilmEntity implements FilmsInterface {
	@Expose()
	@ObjectIdColumn()
	_id: string
	
	@Expose()
	@Column()
	characters: Array<string>;
	
	@Expose()
	@Column()
	director: string;
	
	@Expose()
	@Column()
	episode_id: number;
	
	@Expose()
	@Column()
	opening_crawl: string;
	
	@Expose()
	@Column()
	planets: Array<string>;
	
	@Expose()
	@Column()
	producer: string;
	
	@Expose()
	@Column()
	release_date: string;
	
	@Expose()
	@Column()
	species: Array<string>;
	
	@Expose()
	@Column()
	starships: Array<string>;
	
	@Expose()
	@Column()
	title: string;
	
	@Expose()
	@Column()
	url: string;
	
	@Expose()
	@Column()
	vehicles: Array<string>;
	
	@Expose()
	@Column()
	created: number;
	
	@Expose()
	@Column()
	edited: number;
	
	constructor(film: Partial<FilmEntity>) {
		if (film) {
			Object.assign(
				this,
				plainToClass(FilmEntity, film, {
					excludeExtraneousValues: true
				})
			);
			this._id = this._id || uuidv4()
			this.created = this.created || +new Date()
			this.edited = +new Date()
		}
	}
	
}
