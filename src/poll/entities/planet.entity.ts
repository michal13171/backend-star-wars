import {Expose, plainToClass} from "class-transformer";
import {Column, Entity, ObjectIdColumn} from "typeorm";
import {PlanetsInterface} from "../interfaces/planets.interface";
import {uuidv4} from '@utils'

@Entity({
	name: 'planets',
	orderBy: {
		createdAt: 'ASC'
	}
})
export class PlanetEntity implements PlanetsInterface {
	@Expose()
	@ObjectIdColumn()
	_id: string
	
	@Expose()
	@Column()
	climate: string;
	
	@Expose()
	@Column()
	diameter: string;
	
	@Expose()
	@Column()
	films: Array<string>;
	
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
	residents: Array<string>;
	
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
			this._id = this._id || uuidv4()
			this.created = this.created || +new Date()
			this.edited = +new Date()
		}
	}
}
