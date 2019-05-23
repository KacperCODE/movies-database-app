import * as fromMovies from '../actions/movies.action';
import { Movie } from './../../domain/movie';
import { SearchCriteria } from './../../domain/searchCriteria';


export interface MoviesListState {
    searchCriteria: SearchCriteria;
    movies: Movie[]
};

const initialState: MoviesListState = {
    searchCriteria: new SearchCriteria(),
    movies: []
};

export function reducer(state = initialState, action: fromMovies.MoviesListActions ): MoviesListState {
    switch (action.type) {
        case fromMovies.MoviesListActionTypes.LOAD_MOVIES_BY_CRITRIA: {
            return {
                ...state
             };
        }

        case fromMovies.MoviesListActionTypes.LOAD_MOVIES_BY_CRITRIA_SUCCESS: {
            return {
                ...state
             };
        }

        case fromMovies.MoviesListActionTypes.LOAD_MOVIES_BY_CRITRIA_FAIL: {
            return {
                ...state
             };
        }

        default: {
            return state;
        }
    }
}