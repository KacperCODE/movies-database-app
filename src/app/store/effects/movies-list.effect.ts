import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";

import { MovieService } from "../../services/movie/movie.service";
import * as moviesListActions from "../actions/movies-list.action";
import { MoviesState } from "./../reducers";

@Injectable()
export class MoviesListEffects {
  constructor(
    private store: Store<MoviesState>,
    private actions: Actions,
    private movieService: MovieService
  ) {}

  @Effect()
  loadMoviesList: Observable<Action> = this.actions.pipe(
    ofType(moviesListActions.MoviesListActionTypes.LOAD_MOVIES_BY_CRITERIA),
    mergeMap(() =>
      this.movieService.getAllMoviesByCriteria().pipe(
        map(movies => ({
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
