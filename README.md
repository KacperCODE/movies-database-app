# Movies Database App
![picture alt](./doc/moviesapp.png?raw=true "moviesapp")

## Required to run project
* Node.js v10.13.0
* NPM v6.4.1
* Through NPM install following:
```sh
	npm install –g @angular/cli@7.3.9
```


Live App Preview
----------------------------------------------------------

[Heroku Demo](https://movie-database-app.herokuapp.com/)
```sh
login: admin@admin.com
password: admin
```
Please let backend heroku instance to load. This may take up to several seconds.

## Technology stack
* Angular 7 (built with @angular/cli & TypeScript)
* NGRx (State Management)
* Sassy CSS (styling)
* Font Awesome (icons)
* Json Web Token (stateless authentication)
* Jasmine (test)
* Karma (test)
* Heroku (demo hosting)


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Run `ng test --code-coverage` to execute the unit tests with code coverage analysis panel.

## Rest
Types of API calls application uses to get movies data.
Description of each call purpose is in the links below.

## Heroku deployment
In order to deploy to heroku you must be granted access.
Once that requirement is fulfilled follow this [Heroku](https://devcenter.heroku.com/articles/git) tutorial on deploy an app.

If the heroku remote is already setup you can deploy it with `git push heroku master`
- - - -
__POST: [rest/api/v1/auth/login](https://marblejs.docs.apiary.io/#reference/authorization/login/authorize-user)__  
Media Type: application/json
Request:  
```json
[{"login": "admin@admin.com","password": "admin"}]
```
Response:  
```json
[{"token": "jwt.token.value"}]
```
- - - -
__GET: [rest/api/v1/movies](https://marblejs.docs.apiary.io/#reference/movies/movie-list/get-all-movies)__  
Media Type: application/json  
Headers: Authorization: “Bearer jwt.token.value”
Path params: search criteria params - limit, page, sortBy, sortDir
Response:  
```json
[{"collection": [ { "genres": [ "action", "comedy", "crime" ], "_id": "5cc5c7e3d9f7ba0848020be2", "imdbId": "tt0356910", "title": "Mr. & Mrs. Smith", "director": "Doug Liman", "year": 2005, "metascore": 55, "actors": [ { "imdbId": "nm0000093", "name": "Brad Pitt" }, { "imdbId": "nm0001401", "name": "Angelina Jolie" } ], "posterUrl": "https://marblejs-example.herokuapp.com/api/v1/assets/img/movies/tt0356910.jpg", "__v": 0 }, { "genres": [ "action", "adventure", "sci-fi" ], "_id": "5cc5c7e3d9f7ba0848020be5", "imdbId": "tt1228705", "title": "Iron Man 2", "director": "Jon Favreau", "year": 2010, "metascore": 57, "actors": [ { "imdbId": "nm0000375", "name": "Robert Downey Jr." }, { "imdbId": "nm0000569", "name": "Gwyneth Paltrow" } ], "posterUrl": "https://marblejs-example.herokuapp.com/api/v1/assets/img/movies/tt1228705.jpg", "__v": 0 }, { "genres": [ "action", "adventure", "crime" ], "_id": "5cc5c7e3d9f7ba0848020be3", "imdbId": "tt0988045", "title": "Sherlock Holmes", "director": "Guy Ritchie", "year": 2009, "metascore": 57, "actors": [ { "imdbId": "nm0000375", "name": "Robert Downey Jr." } ], "posterUrl": "https://marblejs-example.herokuapp.com/api/v1/assets/img/movies/tt0988045.jpg", "__v": 0 } ], "total": 11}]
```
- - - -
__GET: [rest/api/v1/movies/{imdbId}](https://marblejs.docs.apiary.io/reference/movies/movie/get-single-movie)__  
Media Type: application/json  
Headers: Authorization: “Bearer jwt.token.value”
Path params: imdb movie id
Response:  
```json
[{"genres":["action","comedy","crime"],"_id":"5cc5c7e3d9f7ba0848020be2","imdbId":"tt0356910","title":"Mr. & Mrs. Smith","director":"Doug Liman","year":2005,"metascore":55,"actors":[{"imdbId":"nm0000093","name":"Brad Pitt"},{"imdbId":"nm0001401","name":"Angelina Jolie"}],"posterUrl":"https://marblejs-example.herokuapp.com/api/v1/assets/img/movies/tt0356910.jpg","__v":0}]
```
- - - -
__GET: [rest/api/v1/actors//{imdbId}](https://marblejs.docs.apiary.io/reference/actors/actor/get-single-actor)__  
Media Type: application/json  
Headers: Authorization: “Bearer jwt.token.value”
Path params: imdb actor id
Response:  
```json
[{"_id":"5cc5c7e3d9f7ba0848020bd6","imdbId":"nm0001401","name":"Angelina Jolie","birthday":"Wed Jun 04 1975 00:00:00 GMT+0000 (Coordinated Universal Time)","country":"USA","gender":"female","photoUrl":"https://marblejs-example.herokuapp.com/api/v1/assets/img/actors/nm0001401.jpg","__v":0}]
```
- - - -

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## TODOs:
- [x] FontAwesomeModule throws errors while using Karma tool. Move it to separate module.
- [ ] At the moment if user gets logged out on the backend his session stays active until first 401 request. There should be a short API call performed in order to check if token is valid.   
- [ ] Write extensive component Unit testing to cover cases where HTML template is accessed.
- [ ] Call to API for the list of all movies with search criteria can't be performed if sortDir is in the params. This should be fixed on the backend.
