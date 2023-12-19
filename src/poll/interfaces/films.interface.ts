import {Date} from "./date.interface";
import {PlanetsInterface} from "./planets.interface";
import {StarshipsInterface} from "./starships.interface";
import {VehiclesInterface} from "./vehicles.interface";
import {SpeciesInterface} from "./species.interface";

export interface FilmsInterface extends Date {
	title: string,
	episode_id: number,
	opening_crawl: string,
	director: string,
	producer: string,
	release_date: string,
	planets: Array<PlanetsInterface>,
	starships: Array<StarshipsInterface>,
	vehicles: Array<VehiclesInterface>,
	species: Array<SpeciesInterface>,
	url: string,
}
