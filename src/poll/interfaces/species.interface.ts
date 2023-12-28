import {Date} from "./date.interface";
import {PeopleInterface} from "./people.interface";
import {FilmsInterface} from "./films.interface";

export interface SpeciesInterface extends Date {
	name: string,
	classification: string,
	designation: string,
	average_height: string,
	skin_colors: string,
	hair_colors: string,
	eye_colors: string,
	average_lifespan: string,
	homeworld: string,
	language: string,
	people: Array<PeopleInterface>,
	films: Array<FilmsInterface>,
	url: string,
}
