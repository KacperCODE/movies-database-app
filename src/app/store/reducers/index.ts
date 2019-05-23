import * as fromMovies from './movies.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface MoviesState {
    moviesList: fromMovies.MoviesListState
}

export const reducers: ActionReducerMap<MoviesState> = {
    moviesList: fromMovies.reducer
}

export const getMoviesState = (state: MoviesState) => state;

// MOVIES LIST STATE

export const getMoviesListState = createSelector(
    getMoviesState,
    (state: MoviesState) => state.moviesList
);

export const getMovies = createSelector(getMoviesListState, fromMovies.getMovies);
export const getSearchCriteria = createSelector(getMoviesListState, fromMovies.getSearchCriteria);