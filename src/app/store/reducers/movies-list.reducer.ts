import * as fromMovies from '../actions/movies-list.action';
import { Movie } from '../../domain/movie';
import { SearchCriteria } from '../../domain/searchCriteria';


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
        case fromMovies.MoviesListActionTypes.LOAD_MOVIES_BY_CRITERIA: {
            return {
                ...state
             };
        }

        case fromMovies.MoviesListActionTypes.LOAD_MOVIES_BY_CRITERIA_SUCCESS: {
            const movies = action.payload;
            return {
                ...state,
                movies
             };
        }

        case fromMovies.MoviesListActionTypes.LOAD_MOVIES_BY_CRITERIA_FAIL: {
            return {
                ...state
             };
        }

        default: {
            return state;
        }
    }
}

export const getSearchCriteria = (state: MoviesListState) => state.searchCriteria
export const getMovies = (state: MoviesListState) => state.movies