import {Expose, plainToClass} from "class-transformer";
import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {StarshipsInterface} from "../interfaces/starships.interface";
import {FilmsInterface} from "../interfaces/films.interface";
import {FilmEntity} from "./film.entity";
import {ApiProperty} from "@nestjs/swagger";

@Entity({
	name: 'starships',
})
export class StarshipEntity implements StarshipsInterface {
	@PrimaryGeneratedColumn()
	@ApiProperty({example: 1, description: 'The id of the Starship'})
	id: number
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The MGLT of the Starship'})
	MGLT: string;
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The cargo capacity of the Starship'})
	cargo_capacity: string;
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The consumables of the Starship'})
	consumables: string;
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The cost in credits of the Starship'})
	cost_in_credits: string;
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The crew of the Starship'})
	crew: string;
	
	@ManyToMany(() => FilmEntity, (film) => film.starships, {
		cascade: false,
		nullable: true
	})
	@JoinTable()
	@ApiProperty({description: 'The relationship of the Starship'})
	films: Array<FilmsInterface>;
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The hyperdrive rating of the Starship'})
	hyperdrive_rating: string;
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The length of the Starship'})
	length: string;
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The manufacturer of the Starship'})
	manufacturer: string;
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The max atmosphering speed of the Starship'})
	max_atmosphering_speed: string;
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The model of the Starship'})
	model: string;
	
	@Expose()
	@Column({nullable: true, unique: true})
	@ApiProperty({description: 'The name of the Starship'})
	name: string;
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The passengers of the Starship'})
	passengers: string;
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The starship class of the Starship'})
	starship_class: string;
	
	@Expose()
	@Column({nullable: true})
	@ApiProperty({description: 'The url of the Starship'})
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
