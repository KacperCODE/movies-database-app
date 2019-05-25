import { Actor } from '../../domain/actor';
import { Action } from '@ngrx/store';
import { Movie } from 'src/app/domain/movie';

export enum LoginActionTypes {
    SET_MOVIE_ID = '[MovieDetails] Setting new movie id',

    LOAD_MOVIE_BY_ID = '[MovieDetails] Load Movie by id',
    LOAD_MOVIE_BY_ID_SUCCESS = '[MovieDetails] Load Movie by id success',
    LOAD_MOVIE_BY_ID_FAIL = '[MovieDetails] Load Movie by id fail',

    LOAD_ACTOR_BY_ID = '[MovieDetails] Load Actor by Id',
    LOAD_ACTOR_BY_ID_SUCCESS = '[MovieDetails] Load Actor by Id success',
    LOAD_ACTOR_BY_ID_FAIL = '[MovieDetails] Load Actor by Id fail'
};

// Movie Details

export class SetMovieId implements Action {
    readonly type = LoginActionTypes.SET_MOVIE_ID;

    constructor(public payload: string) { }
}
export class LoadMovieDetails implements Action {
    readonly type = LoginActionTypes.LOAD_MOVIE_BY_ID;
}

export class LoadMovieDetailsSuccess implements Action {
    readonly type = LoginActionTypes.LOAD_MOVIE_BY_ID_SUCCESS;

    constructor(public payload: Movie) { }
}

export class LoadMovieDetailsFail implements Action {
    readonly type = LoginActionTypes.LOAD_MOVIE_BY_ID_FAIL;

    constructor(public payload: any) { }
}

// Actors

export class LoadActorById implements Action {
    readonly type = LoginActionTypes.LOAD_ACTOR_BY_ID;

    constructor(public payload: string) { }
}

export class LoadActorByIdSuccess implements Action {
    readonly type = LoginActionTypes.LOAD_ACTOR_BY_ID_SUCCESS;

    constructor(public payload: Actor) { }
}

export class LoadActorByIdFail implements Action {
    readonly type = LoginActionTypes.LOAD_ACTOR_BY_ID_FAIL;

    constructor(public payload: any) { }
}

export type LoginActions
                        = SetMovieId
                        | LoadMovieDetails
                        | LoadMovieDetailsSuccess
                        | LoadMovieDetailsFail
                        | LoadActorById
                        | LoadActorByIdSuccess
                        | LoadActorByIdFail;
                        