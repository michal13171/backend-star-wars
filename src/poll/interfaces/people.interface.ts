import {Date} from "./date.interface";

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
	films: Array<string>,
	species: Array<string>,
	vehicles: Array<string>,
	starships: Array<string>,
	url: string,
}
