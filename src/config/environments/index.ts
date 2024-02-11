const NODE_ENV: string = process.env.NODE_ENV ?? 'development';
const REDIS = {
  host: process.env.REDIS_HOST ?? 'nestjs_redis',
  port: 6379,
};
const UL_SWAPI: string = 'https://swapi.dev/api';
const PRIMARY_COLOR: string = '#87e8de';
const PORT: number = 3000;
const RATE_LIMIT_MAX: number = 10000;

export { NODE_ENV, REDIS, UL_SWAPI, PRIMARY_COLOR, PORT, RATE_LIMIT_MAX };
