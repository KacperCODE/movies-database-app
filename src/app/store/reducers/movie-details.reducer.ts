import { Movie } from "../../domain/movie";
import * as fromDetails from "../actions/movie-details.action";
import { Actor } from "./../../domain/actor";

export interface MovieDetailsState {
  movieId: string;
  movie: Movie;
  actors: Actor[];
}

const initialState: MovieDetailsState = {
  movieId: null,
  movie: null,
  actors: []
};

export function reducer(
  state = initialState,
  action: fromDetails.LoginActions
): MovieDetailsState {
  switch (action.type) {
    case fromDetails.MovieDetailsTypes.SET_MOVIE_ID: {
      const movieId = action.payload;
      const movie = null;
      const actors = [];
      return {
        ...state,
        movieId,
        movie,
        actors
      };
    }

    case fromDetails.MovieDetailsTypes.LOAD_MOVIE_BY_ID_SUCCESS: {
      const movie = action.payload;
      return {
        ...state,
        movie
      };
    }

    case fromDetails.MovieDetailsTypes.LOAD_MOVIE_BY_ID_FAIL: {
      return {
        ...state
      };
    }

    case fromDetails.MovieDetailsTypes.LOAD_ACTOR_BY_ID: {
      return {
        ...state
      };
    }

    case fromDetails.MovieDetailsTypes.LOAD_ACTOR_BY_ID_SUCCESS: {
      const actors = [...state.actors, action.payload];

      return {
        ...state,
        actors
      };
    }

    case fromDetails.MovieDetailsTypes.LOAD_ACTOR_BY_ID_FAIL: {
      return {
        ...state
      };
    }

    default: {
      return state;
    }
  }
}

export const getMovieDetails = (state: MovieDetailsState) => state.movie;
export const getMovieId = (state: MovieDetailsState) => state.movieId;
export const getActors = (state: MovieDetailsState) => state.actors;
