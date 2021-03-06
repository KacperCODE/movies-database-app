import { Action } from '@ngrx/store';
import { Movie } from 'src/app/domain/movie';

import { Actor } from './../../domain/actor';

export enum MovieDetailsTypes {
  SET_MOVIE_ID = "[MovieDetails] Setting new movie id",

  LOAD_MOVIE_BY_ID = "[MovieDetails] Load Movie by id",
  LOAD_MOVIE_BY_ID_SUCCESS = "[MovieDetails] Load Movie by id success",
  LOAD_MOVIE_BY_ID_FAIL = "[MovieDetails] Load Movie by id fail",

  LOAD_ACTOR_BY_ID = "[MovieDetails] Load Actor by Id",
  LOAD_ACTOR_BY_ID_SUCCESS = "[MovieDetails] Load Actor by Id success",
  LOAD_ACTOR_BY_ID_FAIL = "[MovieDetails] Load Actor by Id fail"
}

// Movie Details

export class SetMovieId implements Action {
  readonly type = MovieDetailsTypes.SET_MOVIE_ID;

  constructor(public payload: string) {}
}
export class LoadMovieDetails implements Action {
  readonly type = MovieDetailsTypes.LOAD_MOVIE_BY_ID;
}

export class LoadMovieDetailsSuccess implements Action {
  readonly type = MovieDetailsTypes.LOAD_MOVIE_BY_ID_SUCCESS;

  constructor(public payload: Movie) {}
}

export class LoadMovieDetailsFail implements Action {
  readonly type = MovieDetailsTypes.LOAD_MOVIE_BY_ID_FAIL;
}

// Actors

export class LoadActorById implements Action {
  readonly type = MovieDetailsTypes.LOAD_ACTOR_BY_ID;

  constructor(public payload: string) {}
}

export class LoadActorByIdSuccess implements Action {
  readonly type = MovieDetailsTypes.LOAD_ACTOR_BY_ID_SUCCESS;

  constructor(public payload: Actor) {}
}

export class LoadActorByIdFail implements Action {
  readonly type = MovieDetailsTypes.LOAD_ACTOR_BY_ID_FAIL;
}

export type LoginActions =
  | SetMovieId
  | LoadMovieDetails
  | LoadMovieDetailsSuccess
  | LoadMovieDetailsFail
  | LoadActorById
  | LoadActorByIdSuccess
  | LoadActorByIdFail;
