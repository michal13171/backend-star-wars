import {Expose, plainToClass} from "class-transformer";
import {Column, Entity, ObjectIdColumn} from "typeorm";
import {StarshipsInterface} from "../interfaces/starships.interface";
import {uuidv4} from '@utils'

@Entity({
	name: 'starships',
	orderBy: {
		createdAt: 'ASC'
	}
})
export class StarshipEntity implements StarshipsInterface {
	@Expose()
	@ObjectIdColumn()
	_id: string
	
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
	
	@Expose()
	@Column()
	films: Array<string>;
	
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
	pilots: Array<string>;
	
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
			this._id = this._id || uuidv4()
			this.created = this.created || +new Date()
			this.edited = +new Date()
		}
	}
}
