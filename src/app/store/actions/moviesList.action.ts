import { Action } from '@ngrx/store';
import { Movie } from 'src/app/domain/movie';

export enum MoviesListActionTypes {
    LOAD_MOVIES_BY_CRITRIA = '[Movies] Load Movis by criteria',
    LOAD_MOVIES_BY_CRITRIA_SUCCESS = '[Movies] Load Movies by criteria success',
    LOAD_MOVIES_BY_CRITRIA_FAIL = '[Movies] Load Movies by criteria fail'
};


export class LoadMoviesList implements Action {
    readonly type = MoviesListActionTypes.LOAD_MOVIES_BY_CRITRIA;
}

export class LoadMoviesListSuccess implements Action {
    readonly type = MoviesListActionTypes.LOAD_MOVIES_BY_CRITRIA_SUCCESS;

    constructor(public payload: Movie[]) { }
}

export class LoadMoviesListFail implements Action {
    readonly type = MoviesListActionTypes.LOAD_MOVIES_BY_CRITRIA_FAIL;

    constructor(public payload: any) { }
}


export type MoviesListActions
                        = LoadMoviesList
                        | LoadMoviesListSuccess
                        | LoadMoviesListFail;
                        