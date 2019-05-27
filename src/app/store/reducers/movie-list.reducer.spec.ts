import { Pagination } from './../../domain/pagination.enum';
import { Movie } from './../../domain/movie';
import * as fromMovieList from './movies-list.reducer';
import {
  CacheSearchCriteria,
  InitializeSearchCriteriaFromCache,
  ChangeSearchType,
  ChangeSearchMaxResults,
  LoadMoviesList,
  LoadMoviesListSuccess,
  LoadMoviesListFail,
  ChangePage
} from "../actions/movies-list.action";
import { SearchCriteria } from 'src/app/domain/searchCriteria';
import { SearchType } from 'src/app/domain/searchType.enum';

describe('MovieListReducer', () => {
    let initialState: fromMovieList.MoviesListState;
    let state: fromMovieList.MoviesListState;
    const reducer = fromMovieList.reducer;
    
    beforeEach(() => {
        initialState  = {
            searchCriteria: new SearchCriteria(),
            movies: [],
            pageLimit: 1
        }
        state = {...initialState};
    })

    it('default case should not modify state', () => {
        const action: any = {};
        
        state = reducer(state, action);
        
        expect(state).toEqual(initialState);
    })

    it('CacheSearchCriteria action should not modify state', () => {
        const action = new CacheSearchCriteria()

        state = reducer(state, action);

        expect(state).toEqual(initialState);
    });

    it('CacheSearchCriteria action reducer should update localstorage', () => {
        const action = new CacheSearchCriteria()
        const page = 1;
        const searchCriteriaStringified = JSON.stringify({...initialState.searchCriteria, page})
        spyOn(localStorage, 'setItem')

        state = reducer(state, action);

        expect(localStorage.setItem).toHaveBeenCalled();
        expect(localStorage.setItem).toHaveBeenCalledWith("SEARCH_CRITERIA", searchCriteriaStringified);
    });

    it('InitializeSearchCriteriaFromCache action reducer should update searchCriteria', () => {
        const action = new InitializeSearchCriteriaFromCache(new SearchCriteria(98765, 87654, 'metascore', 1))

        state = reducer(state, action);

        expect(state).not.toEqual(initialState);
        expect(state.searchCriteria.limit).toEqual(98765);
        expect(state.searchCriteria.page).toEqual(87654);
        expect(state.searchCriteria.sortBy).toEqual('metascore');
        expect(state.searchCriteria.sortDir).toEqual(1);
    });

    
    it('ChangeSearchType action should update searchCriteria', () => {
        const action = new ChangeSearchType(SearchType.YEAR);

        state = reducer(state, action);

        expect(state).not.toEqual(initialState);
        expect(state.searchCriteria.page).toEqual(1);
        expect(state.searchCriteria.sortBy).toEqual('year');
    });
    
    it('ChangeSearchType action reducer should not change sortDir when changing to other type', () => {
        const action = new ChangeSearchType(SearchType.YEAR);
        const searchCriteria = new SearchCriteria(54321, 54321, 'metascore', 1);
        state = {...state, searchCriteria}

        state = reducer(state, action);

        expect(state).not.toEqual(initialState);
        expect(state.searchCriteria.sortDir).toEqual(1);
    });

    it('ChangeSearchType action reducer should reverse sortDir when changing to the same sortBy type', () => {
        const action = new ChangeSearchType(SearchType.YEAR);
        const searchCriteria = new SearchCriteria(54321, 54321, 'year', 1);
        state = {...state, searchCriteria}

        state = reducer(state, action);

        expect(state).not.toEqual(initialState);
        expect(state.searchCriteria.sortDir).toEqual(0);
    });

    it('ChangeSearchMaxResults action should update max results per page value and page number', () => {
        const action = new ChangeSearchMaxResults(98754);
        const searchCriteria = new SearchCriteria(54321, 54321);
        state = {...state, searchCriteria}

        state = reducer(state, action);

        expect(state).not.toEqual(initialState);
        expect(state.searchCriteria.limit).toEqual(98754);
        expect(state.searchCriteria.page).toEqual(1);
        expect(state.searchCriteria.sortBy).toEqual(initialState.searchCriteria.sortBy);
        expect(state.searchCriteria.sortDir).toEqual(initialState.searchCriteria.sortDir);
    });

    it('LoadMoviesList action should not modify state', () => {
        const action = new LoadMoviesList()

        state = reducer(state, action);

        expect(state).toEqual(initialState);
    });
    
    it('LoadMoviesListSuccess action reducer should update state with new movies', () => {
        const action = new LoadMoviesListSuccess({ collection: [new Movie()], total: 100})
        state = reducer(state, action);

        expect(state).not.toEqual(initialState);
        expect(state.movies).toEqual([new Movie()]);
    });

    it('LoadMoviesListSuccess action reducder should update pageLimit', () => {
        const action = new LoadMoviesListSuccess({ collection: [new Movie()], total: 100});
        const newLimit = Math.floor((action.payload.total / state.searchCriteria.limit) + 1);

        state = reducer(state, action);

        expect(state).not.toEqual(initialState);
        expect(state.pageLimit).toEqual(newLimit);
    });

    it('LoadMoviesListFail action should not modify state', () => {
        const action = new LoadMoviesListFail()

        state = reducer(state, action);

        expect(state).toEqual(initialState);
    });

    it('ChangePage action should change page to next one if within limit', () => {
        const action = new ChangePage(Pagination.NEXT);
        const searchCriteria = new SearchCriteria(54321, 2);
        const pageLimit = 3;
        state = {...state, searchCriteria, pageLimit}

        state = reducer(state, action);

        expect(state).not.toEqual(initialState);
        expect(state.searchCriteria.page).toEqual(3);
    });

    it('ChangePage action should not change page to next one if it is the last page', () => {
        const action = new ChangePage(Pagination.NEXT);
        const searchCriteria = new SearchCriteria(54321, 2);
        const pageLimit = 2;
        state = {...state, searchCriteria, pageLimit}

        state = reducer(state, action);

        expect(state).not.toEqual(initialState);
        expect(state.searchCriteria.page).toEqual(2);
    });

    it('ChangePage action should change page to previous one if page is above one', () => {
        const action = new ChangePage(Pagination.PREVIOUS);
        const searchCriteria = new SearchCriteria(54321, 2);
        const pageLimit = 2;
        state = {...state, searchCriteria, pageLimit}

        state = reducer(state, action);

        expect(state).not.toEqual(initialState);
        expect(state.searchCriteria.page).toEqual(1);
    });


    it('ChangePage action should not change page to previous one if it is the first page', () => {
        const action = new ChangePage(Pagination.PREVIOUS);
        const searchCriteria = new SearchCriteria(54321, 1);
        const pageLimit = 2;
        state = {...state, searchCriteria, pageLimit}

        state = reducer(state, action);

        expect(state).not.toEqual(initialState);
        expect(state.searchCriteria.page).toEqual(1);
    });

})
