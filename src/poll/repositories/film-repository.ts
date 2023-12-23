import {EntityRepository, Repository} from "typeorm";
import {FilmEntity} from "@entities";

@EntityRepository(FilmEntity)
export class FilmEntityRepository  extends Repository<FilmEntity> {
	async findByTitle(title: string): Promise<FilmEntity> {
		return this.findOneBy({ title });
	}
}
