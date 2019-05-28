import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Movie } from 'src/app/domain/movie';

import { MovieService } from '../../services/movie/movie.service';
import * as movieDetailsActions from '../actions/movie-details.action';
import { Actor } from './../../domain/actor';

@Injectable()
export class MovieDetailsEffects {
  constructor(private actions: Actions, private movieService: MovieService) {}

  @Effect()
  loadMovieDetails: Observable<Action> = this.actions.pipe(
    ofType(movieDetailsActions.MovieDetailsTypes.LOAD_MOVIE_BY_ID),
    tap(() => {
      this.movieService.subscribeToMovieId();
    }),
    mergeMap(() =>
      this.movieService.getMovieById().pipe(
        map((movie: Movie) => ({
          type: movieDetailsActions.MovieDetailsTypes.LOAD_MOVIE_BY_ID_SUCCESS,
          payload: movie
        })),
        catchError(() =>
          of({
            type: movieDetailsActions.MovieDetailsTypes.LOAD_MOVIE_BY_ID_FAIL
          })
        )
      )
    )
  );

  @Effect()
  loadActor: Observable<Action> = this.actions.pipe(
    ofType(movieDetailsActions.MovieDetailsTypes.LOAD_ACTOR_BY_ID),
    mergeMap((action: any) =>
      this.movieService.getActorById(action.payload).pipe(
        map((actor: Actor) => ({
          type: movieDetailsActions.MovieDetailsTypes.LOAD_ACTOR_BY_ID_SUCCESS,
          payload: actor
        })),
        catchError(() =>
          of({
            type: movieDetailsActions.MovieDetailsTypes.LOAD_ACTOR_BY_ID_FAIL
          })
        )
      )
    )
  );
}
