import { Date } from '../../../config/interfaces/date.interface';
import { FilmsInterface } from '../../film/interfaces/films.interface';
import { SpeciesInterface } from '../../species/interfaces/species.interface';
import { VehiclesInterface } from '../../vehicle/interfaces/vehicles.interface';
import { StarshipsInterface } from '../../starship/interfaces/starships.interface';

export interface PeopleInterface extends Date {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: Array<FilmsInterface>;
  species: Array<SpeciesInterface>;
  vehicles: Array<VehiclesInterface>;
  starships: Array<StarshipsInterface>;
  url: string;
}
