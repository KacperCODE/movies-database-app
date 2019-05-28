import { Pagination } from "src/app/domain/pagination.enum";
import { SearchType } from "src/app/domain/searchType.enum";
import { Movie } from "./../../domain/movie";
import { SearchCriteria } from "./../../domain/searchCriteria";
import { CacheSearchCriteria, ChangePage, ChangeSearchMaxResults, ChangeSearchType, InitializeSearchCriteriaFromCache, LoadMoviesList, LoadMoviesListFail, LoadMoviesListSuccess, MoviesListActionTypes } from "./movies-list.action";
describe("MoviesListActions", () => {
  it("should create CacheSearchCriteria action", () => {
    const action = new CacheSearchCriteria();

    expect(action.type).toEqual(MoviesListActionTypes.CACHE_SEARCH_CRITERIA);
  });

  it("should create InitializeSearchCriteriaFromCache action", () => {
    const action = new InitializeSearchCriteriaFromCache(new SearchCriteria());

    expect(action.type).toEqual(
      MoviesListActionTypes.INITIALIZE_SEARCH_CRITERIA_FROM_CACHE
    );
    expect(action.payload).toEqual(new SearchCriteria());
  });

  it("should create ChangeSearchCriteria action", () => {
    const action = new ChangeSearchType(SearchType.METASCORE);

    expect(action.type).toEqual(MoviesListActionTypes.CHANGE_SEARCH_TYPE);
    expect(action.payload).toEqual(SearchType.METASCORE);
  });

  it("should create ChangeSearchMaxResults action", () => {
    const action = new ChangeSearchMaxResults(87654);

    expect(action.type).toEqual(
      MoviesListActionTypes.CHANGE_SEARCH_MAX_RESULTS
    );
    expect(action.payload).toEqual(87654);
  });

  it("should create LoadMoviesList action", () => {
    const action = new LoadMoviesList();

    expect(action.type).toEqual(MoviesListActionTypes.LOAD_MOVIES_BY_CRITERIA);
  });

  it("should create LoadMoviesListSuccess action", () => {
    const action = new LoadMoviesListSuccess({
      collection: [new Movie()],
      total: 54321
    });

    expect(action.type).toEqual(
      MoviesListActionTypes.LOAD_MOVIES_BY_CRITERIA_SUCCESS
    );
    expect(action.payload).toEqual({
      collection: [new Movie()],
      total: 54321
    });
  });

  it("should create LoadMoviesListFail action", () => {
    const action = new LoadMoviesListFail();

    expect(action.type).toEqual(
      MoviesListActionTypes.LOAD_MOVIES_BY_CRITERIA_FAIL
    );
  });

  it("should create ChangePage action", () => {
    const action = new ChangePage(Pagination.NEXT);

    expect(action.type).toEqual(MoviesListActionTypes.CHANGE_PAGE);
    expect(action.payload).toEqual(Pagination.NEXT);
  });
});
