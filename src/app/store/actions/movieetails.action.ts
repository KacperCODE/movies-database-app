import { Actor } from '../../domain/actor';
import { Action } from '@ngrx/store';
import { Movie } from 'src/app/domain/movie';

export enum MovieDetailsActionTypes {
    LOAD_MOVIE_BY_ID = '[MovieDetails] Load Movie by id',
    LOAD_MOVIE_BY_ID_SUCCESS = '[MovieDetails] Load Movie by id success',
    LOAD_MOVIE_BY_ID_FAIL = '[MovieDetails] Load Movie by id fail',

    LOAD_ACTOR_BY_ID = '[MovieDetails] Load Actor by Id',
    LOAD_ACTOR_BY_ID_SUCCESS = '[MovieDetails] Load Actor by Id success',
    LOAD_ACTOR_BY_ID_FAIL = '[MovieDetails] Load Actor by Id fail'
};

// Movie Details

export class LoadMovieDetails implements Action {
    readonly type = MovieDetailsActionTypes.LOAD_MOVIE_BY_ID;
}

export class LoadMovieDetailsSuccess implements Action {
    readonly type = MovieDetailsActionTypes.LOAD_MOVIE_BY_ID_SUCCESS;

    constructor(public payload: Movie) { }
}

export class LoadMovieDetailsFail implements Action {
    readonly type = MovieDetailsActionTypes.LOAD_MOVIE_BY_ID_FAIL;

    constructor(public payload: any) { }
}

// Actors

export class LoadActor implements Action {
    readonly type = MovieDetailsActionTypes.LOAD_ACTOR_BY_ID;
}

export class LoadActorSuccess implements Action {
    readonly type = MovieDetailsActionTypes.LOAD_ACTOR_BY_ID_SUCCESS;

    constructor(public payload: Actor[]) { }
}

export class LoadActorFail implements Action {
    readonly type = MovieDetailsActionTypes.LOAD_ACTOR_BY_ID_FAIL;

    constructor(public payload: any) { }
}

export type MovieDetailsActions
                        = LoadMovieDetails
                        | LoadMovieDetailsSuccess
                        | LoadMovieDetailsFail
                        | LoadActor
                        | LoadActorSuccess
                        | LoadActorFail;
                        