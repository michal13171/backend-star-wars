import { Inject, Injectable, Logger } from '@nestjs/common';
import { AppService } from '../../../config/services/app.service';
import { ClientProxy } from '@nestjs/microservices';
import { UL_SWAPI } from '@environments';
import { FilmsInterface } from '../interfaces/films.interface';

@Injectable()
export class FilmService {
  private readonly logger = new Logger(FilmService.name);

  wordOccurrences: Record<string, number> = {};
  characterOccurrences: Record<string, number> = {};

  constructor(
    @Inject(AppService) private appService: AppService,
    @Inject('GLOBAL_FILM_SERVICE') private client: ClientProxy,
  ) {}

  async getAllFilms() {
    const pattern = { cmd: 'film_listing' };
    const films = this.appService.fetchData(`${UL_SWAPI}/films`);

    films.then((value) =>
      this.handlePatternAndListingFilms(pattern, value.results),
    );
  }

  getFilm(idk: number) {
    const pattern = { cmd: `films_${idk}` };
    const payload = this.appService.fetchData(`${UL_SWAPI}/films/${idk}`);
    this.client.send(pattern, payload);

    return payload;
  }

  private handlePatternAndListingFilms(
    pattern: { cmd: string },
    films: FilmsInterface[],
  ) {
    for (let i = 0; i < films.length; i++) {
      this.logger.log(`41 line code: ${films[i]['title']}`);
      const findUniqueWords = /\s+([ \t\r\n]+)\s*/;
      const openings = films[i]['opening_crawl'].split(findUniqueWords);
      const input = '   \t\r\n  ';

      if (findUniqueWords.test(input)) {
        openings.forEach((word) => {
          if (word) {
            this.wordOccurrences[word] = (this.wordOccurrences[word] || 0) + 1;
          }
        });
      }

      if (films[i]['characters'].length > 0) {
        films[i]['characters'].forEach((data: any) => {
          this.logger.debug(`56 line code: ${this.appService.fetchData(data)}`);
          this.appService.fetchData(data).then((character) => {
            const characterName = character['name'];
            this.logger.debug(`59 line code: ${characterName}`);
            this.characterOccurrences[characterName] =
              (this.characterOccurrences[characterName] || 0) + 1;
          });
        });
      }
    }

    this.logger.debug(`67 line code: ${this.characterOccurrences}`);

    const maxOccurrences = Math.max(
      ...Object.values(this.characterOccurrences),
    );

    this.logger.log(`73 line code: ${maxOccurrences}`);

    const mostFrequentCharacters = Object.keys(
      this.characterOccurrences,
    ).filter(
      (character) => this.characterOccurrences[character] === maxOccurrences,
    );
    this.logger.log(`80 line code: ${mostFrequentCharacters}`);
    this.logger.log(`81 line code: ${this.wordOccurrences}`);

    const payload = {
      wordOccurrences: Object.entries(this.wordOccurrences).map(([word]) => {
        const word_counts = word.trim().length;
        return {
          word: word,
          count: word_counts,
        };
      }),
      mostFrequentCharacters,
    };
    this.client.send(pattern, payload);

    return payload;
  }
}
