import {Expose, plainToClass} from "class-transformer";
import {Column, Entity, ObjectIdColumn} from "typeorm";
import {SpeciesInterface} from "../interfaces/species.interface";
import {uuidv4} from '@utils'

@Entity({
	name: 'species',
	orderBy: {
		createdAt: 'ASC'
	}
})
export class SpecieEntity implements SpeciesInterface {
	@Expose()
	@ObjectIdColumn()
	_id: string
	
	@Expose()
	@Column()
	average_height: string;
	
	@Expose()
	@Column()
	average_lifespan: string;
	
	@Expose()
	@Column()
	classification: string;

	@Expose()
	@Column()
	designation: string;

	@Expose()
	@Column()
	eye_colors: string;
	
	@Expose()
	@Column()
	films: Array<string>;
	
	@Expose()
	@Column()
	hair_colors: string;
	
	@Expose()
	@Column()
	homeworld: string;
	
	@Expose()
	@Column()
	language: string;
	
	@Expose()
	@Column()
	name: string;
	
	@Expose()
	@Column()
	people: Array<string>;
	
	@Expose()
	@Column()
	skin_colors: string;
	
	@Expose()
	@Column()
	url: string;
	
	@Expose()
	@Column()
	created: number;
	
	@Expose()
	@Column()
	edited: number;
	
	constructor(species: Partial<SpecieEntity>) {
		if (species) {
			Object.assign(
				this,
				plainToClass(SpecieEntity, species, {
					excludeExtraneousValues: true
				})
			);
			this._id = this._id || uuidv4()
			this.created = this.created || +new Date()
			this.edited = +new Date()
		}
	}
}
