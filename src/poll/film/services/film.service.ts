import { Inject, Injectable, Logger } from '@nestjs/common';
import { AppService } from '../../../config/services/app.service';
import { ClientProxy } from '@nestjs/microservices';
import { UL_SWAPI } from '@environments';
import { FilmsInterface } from '../interfaces/films.interface';
import { PaginationDto } from '../../../config/dto/pagination.dto';

@Injectable()
export class FilmService {
  private readonly logger = new Logger(FilmService.name);

  constructor(
    @Inject(AppService) private appService: AppService,
    @Inject('GLOBAL_FILM_SERVICE') private client: ClientProxy,
  ) {}

  async getAllCharactersFindInTitleFilms(paginationDto: PaginationDto) {
    return this.appService
      .fetchData(`${UL_SWAPI}/films`, paginationDto)
      .then((value) => {
        const pattern = { cmd: 'film_listing' };

        return this.getFilmTitleAndCharName(
          pattern,
          value['results'],
        );
      })
      .catch((reason) => this.logger.error(`${reason.message}`, 'bootstrap'));
  }

  getFilm(idk: number) {
    const pattern = { cmd: `films_${idk}` };
    const payload = this.appService
      .fetchData(`${UL_SWAPI}/films/${idk}`)
      .catch((reason) => this.logger.error(`${reason.message}`, 'bootstrap'));
    this.client.send(pattern, payload);

    return payload;
  }

  /**
   * Listing films and get array only title And second array get characters by name from new endpoint character
   */
  private async getFilmTitleAndCharName(
    pattern: { cmd: string },
    films: FilmsInterface[],
  ) {
    const arrayFilmsOpeningCrawls: any[] = [];
    const arrayCharactersNames: any[] = [];
    const arrayCharacters: any[] = [];

    for (let i = 0; i < films.length; i++) {
      const findUniqueWords = /\s+([ \t\r\n]+)\s*/;
      const openings = films[i]['opening_crawl'].split(findUniqueWords);
      arrayFilmsOpeningCrawls.push(openings);

      if (films[i]['characters'].length > 0) {
        arrayCharacters.push(films[i]['characters']);
      }
    }

    for (let j = 0; j < arrayCharacters[0].length; j++) {
      const data = arrayCharacters[0][j];

      const character = await this.appService
        .fetchData(data)
        .catch((reason) => this.logger.error(`${reason.message}`, 'bootstrap'));
      const characterName = character['name'];

      arrayCharactersNames.push(characterName);
    }

    return this.mergeTitlesTextFromAllCharsFromEndpoint(
      arrayFilmsOpeningCrawls,
      arrayCharactersNames,
      pattern,
    );
  }

  findCharactersInText(characters: string[], text: string) {
    const foundCharacters = [];

    characters.forEach((character) => {
      if (text.includes(character)) {
        foundCharacters.push(character);
      }
    });

    return foundCharacters;
  }
  
  /**
   * From merged titles all characters from endpoint
   */
  private async mergeTitlesTextFromAllCharsFromEndpoint(
    arrayFilmsOpeningCrawls: any[],
    arrayCharactersNames: any[],
    pattern: {
      cmd: string;
    },
  ) {
    const getAllTitleMovies = arrayFilmsOpeningCrawls
      .flatMap((value) => value)
      .join(',');

    const foundCharacters = this.findCharactersInText(
      arrayCharactersNames,
      getAllTitleMovies,
    );

    // only character without free space
    const getCountWords = foundCharacters.map(
      (value) => value.replace(' ', '').length,
    );

    const payload = {
      wordOccurrences: foundCharacters,
      characterOccurrences: getCountWords,
    };
    this.client.send(pattern, payload);

    return payload;
  }
}
