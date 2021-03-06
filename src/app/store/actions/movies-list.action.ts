import { Action } from "@ngrx/store";
import { Movie } from "src/app/domain/movie";
import { SearchType } from "src/app/domain/searchType.enum";
import { Pagination } from "./../../domain/pagination.enum";
import { SearchCriteria } from "./../../domain/searchCriteria";

export enum MoviesListActionTypes {
  CACHE_SEARCH_CRITERIA = "[Movies Cache] Cache search Criteria",
  INITIALIZE_SEARCH_CRITERIA_FROM_CACHE = "[Movies Cache] Initialize cached data",

  CHANGE_SEARCH_TYPE = "[Movies] Change search type",
  CHANGE_SEARCH_MAX_RESULTS = "[Movies] Change search max results",

  LOAD_MOVIES_BY_CRITERIA = "[Movies] Load Movies by criteria",
  LOAD_MOVIES_BY_CRITERIA_SUCCESS = "[Movies] Load Movies by criteria success",
  LOAD_MOVIES_BY_CRITERIA_FAIL = "[Movies] Load Movies by criteria fail",

  CHANGE_PAGE = "[Movies] Change page number"
}

export class CacheSearchCriteria implements Action {
  readonly type = MoviesListActionTypes.CACHE_SEARCH_CRITERIA;

  constructor() {}
}
export class InitializeSearchCriteriaFromCache implements Action {
  readonly type = MoviesListActionTypes.INITIALIZE_SEARCH_CRITERIA_FROM_CACHE;

  constructor(public payload: SearchCriteria) {}
}
export class ChangeSearchType implements Action {
  readonly type = MoviesListActionTypes.CHANGE_SEARCH_TYPE;

  constructor(public payload: SearchType) {}
}
export class ChangeSearchMaxResults implements Action {
  readonly type = MoviesListActionTypes.CHANGE_SEARCH_MAX_RESULTS;

  constructor(public payload: number) {}
}
export class LoadMoviesList implements Action {
  readonly type = MoviesListActionTypes.LOAD_MOVIES_BY_CRITERIA;
}

export class LoadMoviesListSuccess implements Action {
  readonly type = MoviesListActionTypes.LOAD_MOVIES_BY_CRITERIA_SUCCESS;

  constructor(public payload: { collection: Movie[]; total: number }) {}
}

export class LoadMoviesListFail implements Action {
  readonly type = MoviesListActionTypes.LOAD_MOVIES_BY_CRITERIA_FAIL;
}
export class ChangePage implements Action {
  readonly type = MoviesListActionTypes.CHANGE_PAGE;

  constructor(public payload: Pagination) {}
}

export type MoviesListActions =
  | CacheSearchCriteria
  | InitializeSearchCriteriaFromCache
  | ChangeSearchType
  | ChangeSearchMaxResults
  | LoadMoviesList
  | LoadMoviesListSuccess
  | LoadMoviesListFail
  | ChangePage;
