import * as fromMovies from './movies-list.reducer';
import * as fromDetails from './movie-details.reducer';
import * as fromAuth from './auth.reducer';
import { ActionReducerMap, createSelector } from '@ngrx/store';

export interface MoviesState {
    moviesList: fromMovies.MoviesListState
    movieDetails: fromDetails.MovieDetailsState
    auth: fromAuth.AuthState
}

export const reducers: ActionReducerMap<MoviesState> = {
    moviesList: fromMovies.reducer,
    movieDetails: fromDetails.reducer,
    auth: fromAuth.reducer
}

export const getMoviesState = (state: MoviesState) => state;

// MOVIES LIST STATE

export const getMoviesListState = createSelector(
    getMoviesState,
    (state: MoviesState) => state.moviesList
);
export const getMovieDetailsState = createSelector(
    getMoviesState,
    (state: MoviesState) => state.movieDetails
);
export const getAuthState = createSelector(
    getMoviesState,
    (state: MoviesState) => state.auth
);

export const getMovieDetails = createSelector(getMovieDetailsState, fromDetails.getMovieDetails);
export const getMovieId = createSelector(getMovieDetailsState, fromDetails.getMovieId);
export const getActors = createSelector(getMovieDetailsState, fromDetails.getActors);

export const getMovies = createSelector(getMoviesListState, fromMovies.getMovies);
export const getPaginationDetails = createSelector(getMoviesListState, fromMovies.getPaginationDetails);
export const getSearchCriteria = createSelector(getMoviesListState, fromMovies.getSearchCriteria);

export const getCurrentUser = createSelector(getAuthState, fromAuth.getCurrentUser);
export const getIsLoading = createSelector(getAuthState, fromAuth.getIsLoading);

