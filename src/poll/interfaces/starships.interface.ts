import {Date} from "./date.interface";
import {FilmsInterface} from "./films.interface";

export interface StarshipsInterface extends Date {
	name: string,
	model: string,
	manufacturer: string,
	cost_in_credits: string,
	length: string,
	max_atmosphering_speed: string,
	crew: string,
	passengers: string,
	cargo_capacity: string,
	consumables: string,
	hyperdrive_rating: string,
	MGLT: string,
	starship_class: string,
	films: Array<FilmsInterface>,
	url: string,
}
