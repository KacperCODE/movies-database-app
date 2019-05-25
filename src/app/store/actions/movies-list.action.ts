import { Action } from '@ngrx/store';
import { Movie } from 'src/app/domain/movie';

export enum MoviesListActionTypes {
    CHANGE_SEARCH_CRITERIA = '[Movies] Change search criteria',
    CHANGE_SEARCH_MAX_RESULTS = '[Movies] Change search max results',
    LOAD_MOVIES_BY_CRITERIA = '[Movies] Load Movis by criteria',
    LOAD_MOVIES_BY_CRITERIA_SUCCESS = '[Movies] Load Movies by criteria success',
    LOAD_MOVIES_BY_CRITERIA_FAIL = '[Movies] Load Movies by criteria fail'
};


export class ChangeSearchCriteria implements Action {
    readonly type = MoviesListActionTypes.CHANGE_SEARCH_CRITERIA;

    constructor(public payload: string) { }
}
export class ChangeSearchMaxResults implements Action {
    readonly type = MoviesListActionTypes.CHANGE_SEARCH_MAX_RESULTS;

    constructor(public payload: number) { }
}
export class LoadMoviesList implements Action {
    readonly type = MoviesListActionTypes.LOAD_MOVIES_BY_CRITERIA;
}

export class LoadMoviesListSuccess implements Action {
    readonly type = MoviesListActionTypes.LOAD_MOVIES_BY_CRITERIA_SUCCESS;

    constructor(public payload: Movie[]) { }
}

export class LoadMoviesListFail implements Action {
    readonly type = MoviesListActionTypes.LOAD_MOVIES_BY_CRITERIA_FAIL;

    constructor(public payload: any) { }
}


export type MoviesListActions
                        = ChangeSearchCriteria
                        | ChangeSearchMaxResults
                        | LoadMoviesList
                        | LoadMoviesListSuccess
                        | LoadMoviesListFail;
                        