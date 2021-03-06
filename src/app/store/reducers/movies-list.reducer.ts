import { SearchCriteria } from "src/app/domain/searchCriteria";
import { SearchType } from "src/app/domain/searchType.enum";
import { Movie } from "../../domain/movie";
import * as fromMovies from "../actions/movies-list.action";
import { Pagination } from "./../../domain/pagination.enum";

export interface MoviesListState {
  searchCriteria: SearchCriteria;
  movies: Movie[];
  pageLimit: number;
}

const initialState: MoviesListState = {
  searchCriteria: new SearchCriteria(),
  movies: [],
  pageLimit: 1
};

export function reducer(
  state = initialState,
  action: fromMovies.MoviesListActions
): MoviesListState {
  switch (action.type) {
    case fromMovies.MoviesListActionTypes.CACHE_SEARCH_CRITERIA: {
      const page = 1;
      const searchCriteria = { ...state.searchCriteria, page };
      localStorage.setItem("SEARCH_CRITERIA", JSON.stringify(searchCriteria));

      return {
        ...state
      };
    }
    case fromMovies.MoviesListActionTypes
      .INITIALIZE_SEARCH_CRITERIA_FROM_CACHE: {
      const searchCriteria = action.payload;
      return {
        ...state,
        searchCriteria
      };
    }
    case fromMovies.MoviesListActionTypes.CHANGE_SEARCH_TYPE: {
      let sortBy: string;
      switch (action.payload) {
        case SearchType.TITLE: {
          sortBy = "title";
          break;
        }
        case SearchType.YEAR: {
          sortBy = "year";
          break;
        }
        case SearchType.METASCORE: {
          sortBy = "metascore";
          break;
        }
        default: {
          sortBy = "title";
        }
      }
      const page = 1;
      const searchCriteria = { ...state.searchCriteria, sortBy, page };

      if (sortBy == state.searchCriteria.sortBy) {
        searchCriteria.sortDir = +!state.searchCriteria.sortDir;
      }

      return {
        ...state,
        searchCriteria
      };
    }
    case fromMovies.MoviesListActionTypes.CHANGE_SEARCH_MAX_RESULTS: {
      const limit = action.payload;
      const page = 1;
      const searchCriteria = { ...state.searchCriteria, limit, page };

      return {
        ...state,
        searchCriteria
      };
    }
    case fromMovies.MoviesListActionTypes.LOAD_MOVIES_BY_CRITERIA: {
      return {
        ...state
      };
    }
    case fromMovies.MoviesListActionTypes.LOAD_MOVIES_BY_CRITERIA_SUCCESS: {
      const movies = action.payload.collection;
      const pageLimit =
        Math.floor(action.payload.total / state.searchCriteria.limit) + 1;

      return {
        ...state,
        movies,
        pageLimit
      };
    }
    case fromMovies.MoviesListActionTypes.LOAD_MOVIES_BY_CRITERIA_FAIL: {
      return {
        ...state
      };
    }
    case fromMovies.MoviesListActionTypes.CHANGE_PAGE: {
      const type = action.payload;
      let page = state.searchCriteria.page;

      if (type === Pagination.NEXT && page < state.pageLimit) {
        page++;
      } else if (type == Pagination.PREVIOUS && page > 1) {
        page--;
      }
      const searchCriteria = { ...state.searchCriteria, page };

      return {
        ...state,
        searchCriteria
      };
    }

    default: {
      return state;
    }
  }
}

export const getSearchCriteria = (state: MoviesListState) =>
  state.searchCriteria;
export const getPaginationDetails = (state: MoviesListState) => {
  return { pageLimit: state.pageLimit, page: state.searchCriteria.page };
};
export const getMovies = (state: MoviesListState) => state.movies;
