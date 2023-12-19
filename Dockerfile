# Stage 1: Compile and Build nestjs

# Use official node image as the base image
FROM node:18.16.1-bullseye as build

# Set the working directory
WORKDIR ./

# Add the source code to app
ADD . ./

# Output dir for app build
RUN mkdir -p dist

# Install all dependencies
RUN npm install

# Rebuild all bcrypt with build-from-source
RUN npm rebuild bcrypt --build-from-source

EXPOSE 3000
