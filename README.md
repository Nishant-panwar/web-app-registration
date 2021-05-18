# Registration Web Application

## Documentation

- The Goal of this project to create a web application that will register users as well as show the basic details for registered users.
- The source code for this repo is written using NodeJs & ReactJs.
- The project directory contains both server-side and client-side code.
- The directory src/ contains all the client-side code. Similarly, directory server/ contains all the server-side logic for the web application.
- We are using Redis client for storing and accessing the user details.
- The front end is created using CRA.
- Used express server in the backend to host the static frontend files.
- .env contains the Redis connection variables.
- Exposed two APIs for the registration and fetching user details.
- Dockerfile and docker-compose.yml files contain the commands for creating & run the docker container.
- We are using a separate docker image for Redis.

## Pre-Requisites

- We will be using docker container to run the project.
- Downlaod [docker](https://www.docker.com/products/docker-desktop) for your system and install it.
- Verify if you have the docker in your CLI by typing ```docker -v``` in terminal. This should print the version number something like this ```Docker version 20.10.6, build 370c289```

## How to Run ? 

- Clone git repo on your machine.
- Update the .env file (present in root directory) if you want. Leave it as it, for dev purposes.
- Open the terminal and run ``` docker compose up ``` to build & run the docker image.
- Open the browser and hit http://localhost:8080