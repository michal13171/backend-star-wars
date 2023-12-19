import {Date} from "./date.interface";
import {FilmsInterface} from "./films.interface";

export interface PlanetsInterface extends Date {
	name: string,
	rotation_period: string,
	orbital_period: string,
	diameter: string,
	climate: string,
	gravity: string,
	terrain: string,
	surface_water: string,
	population: string,
	films: Array<FilmsInterface>,
	url: string,
}
