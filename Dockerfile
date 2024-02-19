# Stage 1: Compile and Build nestjs
FROM node:20.5.0-bullseye as build

WORKDIR /app

COPY package*.json ./

RUN npm ci

RUN npm rebuild bcrypt --build-from-source

COPY . .

RUN mkdir -p dist

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
