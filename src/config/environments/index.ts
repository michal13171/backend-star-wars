const REDIS = {
  host: process.env.REDIS_HOST ?? 'localhost',
  port: 6379,
};
const UL_SWAPI: string = 'https://swapi.py4e.com/api';
const PORT: number = 3000;

export { REDIS, UL_SWAPI, PORT };
