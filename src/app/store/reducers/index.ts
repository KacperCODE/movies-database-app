import * as fromMovies from './movies.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface MoviesState {
    moviesList: fromMovies.MoviesListState
}

export const reducers: ActionReducerMap<MoviesState> = {
    moviesList: fromMovies.reducer
}