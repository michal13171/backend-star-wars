import {Date} from "./date.interface";
import {FilmsInterface} from "./films.interface";
import {SpeciesInterface} from "./species.interface";
import {VehiclesInterface} from "./vehicles.interface";
import {StarshipsInterface} from "./starships.interface";

export interface PeopleInterface extends Date {
	name: string,
	height: string,
	mass: string,
	hair_color: string,
	skin_color: string,
	eye_color: string,
	birth_year: string,
	gender: string,
	homeworld: string,
	films: Array<FilmsInterface>,
	species: Array<SpeciesInterface>,
	vehicles: Array<VehiclesInterface>,
	starships: Array<StarshipsInterface>,
	url: string,
}
