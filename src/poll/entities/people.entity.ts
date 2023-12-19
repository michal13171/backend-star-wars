import {PeopleInterface} from "../interfaces/people.interface";
import {Column, Entity, ObjectIdColumn} from "typeorm";
import {Expose, plainToClass} from "class-transformer";
import {uuidv4} from '@utils'

@Entity({
	name: 'peoples',
	orderBy: {
		createdAt: 'ASC'
	}
})
export class PeopleEntity implements PeopleInterface {
	@Expose()
	@ObjectIdColumn()
	_id: string
	
	@Expose()
	@Column()
	birth_year: string;
	
	@Expose()
	@Column()
	eye_color: string;
	
	@Expose()
	@Column()
	films: Array<string>;
	
	@Expose()
	@Column()
	gender: string;
	
	@Expose()
	@Column()
	hair_color: string;
	
	@Expose()
	@Column()
	height: string;
	
	@Expose()
	@Column()
	homeworld: string;
	
	@Expose()
	@Column()
	mass: string;
	
	@Expose()
	@Column()
	name: string;
	
	@Expose()
	@Column()
	skin_color: string;
	
	@Expose()
	@Column()
	species: Array<string>;
	
	@Expose()
	@Column()
	starships: Array<string>;
	
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
	
	constructor(people: Partial<PeopleEntity>) {
		if (people) {
			Object.assign(
				this,
				plainToClass(PeopleEntity, people, {
					excludeExtraneousValues: true
				})
			);
			this._id = this._id || uuidv4()
			this.created = this.created || +new Date()
			this.edited = +new Date()
		}
	}
}
