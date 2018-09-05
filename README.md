# Talkeat Frontend

## Overview
This is a frontend application for **Talkeat** web application.

##### Application
* Angular is the framework used.
* The application was written with Typescript as programming language.
* The application can be launched with Docker through the configuration file Dockerfile.

## Requirements

Third party dependencies that should be installed prior to run this piece of software:
* **NodeJS v10.x.x**
* **NPM 6.4.x**
* **Angular cli 6.1.x**

## Installation
After installing all system requirements:

1º Checkout the source code:

```
git clone git@bitbucket.org:alexpenedo/talkeat-ui.git
```

2º Install all dependencies

```
npm install
```
## Compile
Compile the Typescript code

```
npm run build
```

## Run
Run next command for launch application for development
```
npm start
```
Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

##Docker
##### Requirements
* **Docker v18.x**
* **Docker compose v1.22.x**

Repository contains a `Dockerfile` for build a docker image with next command at
root directory.
```
docker build -t talkeat-ui . 
```
Run next command for run the image built
```
docker run -p 4200:80 prueba-ui
```


