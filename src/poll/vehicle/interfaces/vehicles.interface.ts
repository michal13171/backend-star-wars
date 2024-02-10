import { Date } from '../../../config/interfaces/date.interface';
import { FilmsInterface } from '../../film/interfaces/films.interface';

export interface VehiclesInterface extends Date {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  vehicle_class: string;
  films: Array<FilmsInterface>;
  url: string;
}
