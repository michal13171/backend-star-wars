import { Date } from '../../interfaces/date.interface';
import { FilmsInterface } from '../../interfaces/films.interface';
import { SpeciesInterface } from '../../interfaces/species.interface';
import { VehiclesInterface } from '../../interfaces/vehicles.interface';
import { StarshipsInterface } from '../../interfaces/starships.interface';

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
