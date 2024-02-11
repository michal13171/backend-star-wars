<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript.

## General Configuration for this project

```bash
Copy .env.dev to .env
```

```bash
Edit file .env
```

```bash
variable in .env "REDIS_PORT" cannot be more or min than 0 > 65536 or 65536 < 65537 better use this 6379
variable in .env "REDIS_HOST" name container you can use 
variable in .env "REDIS_COMMANDER_PORT" this is post for website for gui redis where you can see your data 80 or 81
 your preferences you can use
variable in .env "MYSQL_LOCAL_PORT" 3306 or 33060 default for mysql you can set
variable in .env "MYSQL_ROOT_PASSWORD" you can use special character example number with this $,# password must be strong
```

## Installation

```bash
$ npm install
```

```bash
$ docker-compose up -d
```

## Running the app
### Open your browser 

- Hello World - [Hello World](http://localhost:3000)

- Swagger - [Swagger](http://localhost:3000/api)

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
