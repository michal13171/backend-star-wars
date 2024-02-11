import { Date } from '../../../config/interfaces/date.interface';
import { PlanetsInterface } from '../../planet/interfaces/planets.interface';
import { StarshipsInterface } from '../../starship/interfaces/starships.interface';
import { VehiclesInterface } from '../../vehicle/interfaces/vehicles.interface';
import { SpeciesInterface } from '../../species/interfaces/species.interface';
import { PeopleInterface } from '../../people/interfaces/people.interface';

export interface FilmsInterface extends Date {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  planets: Array<PlanetsInterface>;
  starships: Array<StarshipsInterface>;
  vehicles: Array<VehiclesInterface>;
  species: Array<SpeciesInterface>;
  characters: Array<PeopleInterface>;
  url: string;
}
