import { MoviesState } from './../reducers/index';
import { Store, select, Action } from '@ngrx/store';
import { MovieService } from "../../services/movie/movie.service";
import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";

import * as moviesListActions from "../actions/movies-list.action";
import { getSearchCriteria } from '../reducers';
import { mergeMap, map, catchError, withLatestFrom, tap, switchMap } from "rxjs/operators";
import { of, EMPTY, Observable } from "rxjs";

@Injectable()
export class MoviesListEffects {
  constructor(
    private store: Store<MoviesState>,
    private actions: Actions, 
    private movieService: MovieService) {}

  @Effect()
  loadMoviesList: Observable<Action> = this.actions.pipe(
    ofType(moviesListActions.MoviesListActionTypes.LOAD_MOVIES_BY_CRITERIA),
    mergeMap(() =>
      this.movieService.getAllMoviesByCriteria().pipe(
        map((movies) => ({
          type:
            moviesListActions.MoviesListActionTypes
              .LOAD_MOVIES_BY_CRITERIA_SUCCESS,
          payload: movies
        })),
        catchError(() =>
          of({
            type:
              moviesListActions.MoviesListActionTypes
                .LOAD_MOVIES_BY_CRITERIA_FAIL
          })
        )
      )
    )
  );
}