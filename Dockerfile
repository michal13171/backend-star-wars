# Stage 1: Compile and Build nestjs
FROM node:20.5.0-bullseye as build

WORKDIR /app

# Add the source code to app
COPY package*.json ./
RUN npm ci

# Rebuild all bcrypt with build-from-source
RUN npm rebuild bcrypt --build-from-source

COPY . .

# Output dir for app build
RUN mkdir -p dist

EXPOSE 3000
CMD ["npm", "run", "start:dev"]
