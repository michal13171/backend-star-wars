import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FilmService {
  // constructor(
  //   @InjectRepository(FilmEntity)
  //   private entityRepository: Repository<FilmEntity>,
  // ) {}
  //
  // async getAllFilms() {
  //   const films = await this.entityRepository.find({
  //     relations: {
  //       characters: true,
  //     },
  //   });
  //
  //   const wordOccurrences: Record<string, number> = {};
  //   const characterOccurrences: Record<string, number> = {};
  //
  //   films.forEach((film) => {
  //     const findUniqueWords = /\s+([ \t\r\n]+)\s*/;
  //     const openings = film.opening_crawl.split(findUniqueWords);
  //     const input = '   \t\r\n  ';
  //
  //     if (findUniqueWords.test(input)) {
  //       openings.forEach((word) => {
  //         if (word) {
  //           wordOccurrences[word] = (wordOccurrences[word] || 0) + 1;
  //         }
  //       });
  //     }
  //
  //     if (film.characters.length > 0) {
  //       film.characters.forEach((character) => {
  //         const characterName = character.name.trim();
  //         Logger.debug(characterName);
  //         characterOccurrences[characterName] =
  //           (characterOccurrences[characterName] || 0) + 1;
  //       });
  //     }
  //   });
  //   Logger.debug(characterOccurrences);
  //
  //   const maxOccurrences = Math.max(...Object.values(characterOccurrences));
  //   const mostFrequentCharacters = Object.keys(characterOccurrences).filter(
  //     (character) => characterOccurrences[character] === maxOccurrences,
  //   );
  //
  //   return {
  //     wordOccurrences: Object.entries(wordOccurrences).map(([word]) => {
  //       const word_counts = word.trim().length;
  //       return {
  //         word: word,
  //         count: word_counts,
  //       };
  //     }),
  //     mostFrequentCharacters,
  //   };
  // }
  //
  // getFilm(idk: number) {
  //   return this.entityRepository.findOne({
  //     where: {
  //       id: idk,
  //     },
  //     relations: {
  //       vehicles: true,
  //       starships: true,
  //       planets: true,
  //       characters: true,
  //     },
  //   });
  // }
}
