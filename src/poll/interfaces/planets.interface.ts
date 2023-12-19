import {Date} from "./date.interface";

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
	residents: Array<string>,
	films: Array<string>,
	url: string,
}
