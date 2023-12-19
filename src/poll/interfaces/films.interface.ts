import {Date} from "./date.interface";

export interface FilmsInterface extends Date {
	title: string,
	episode_id: number,
	opening_crawl: string,
	director: string,
	producer: string,
	release_date: string,
	characters: Array<string>,
	planets: Array<string>,
	starships: Array<string>,
	vehicles: Array<string>,
	species: Array<string>,
	url: string,
}
