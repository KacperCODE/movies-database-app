import { Actor } from '../../domain/actor';
import { Movie } from '../../domain/movie';
import * as fromDetails from '../actions/movie-details.action';


export interface MovieDetailsState {
    movie: Movie;
    actors: Actor[]
};

const initialState: MovieDetailsState = {
    movie: new Movie(),
    actors: []
};

export function reducer(state = initialState, action: fromDetails.MovieDetailsActions ): MovieDetailsState {
    switch (action.type) {
        case fromDetails.MovieDetailsActionTypes.LOAD_MOVIE_BY_ID: {
            const actors = []
            return {
                ...state,
                actors
             };
        }

        case fromDetails.MovieDetailsActionTypes.LOAD_MOVIE_BY_ID_SUCCESS: {
            const movie = action.payload;
            return {
                ...state,
                movie
             };
        }

        case fromDetails.MovieDetailsActionTypes.LOAD_MOVIE_BY_ID_FAIL: {
            return {
                ...state
             };
        }

        case fromDetails.MovieDetailsActionTypes.LOAD_ACTOR_BY_ID: {
            return {
                ...state
             };
        }

        case fromDetails.MovieDetailsActionTypes.LOAD_ACTOR_BY_ID_SUCCESS: {
            const actors = [...action.payload, ...state.actors];
            return {
                ...state,
                actors
             };
        }

        case fromDetails.MovieDetailsActionTypes.LOAD_ACTOR_BY_ID_FAIL: {
            return {
                ...state
             };
        }

        default: {
            return state;
        }
    }
}

export const getMovieDetails = (state: MovieDetailsState) => state.movie
export const getActors = (state: MovieDetailsState) => state.actors