import { Actor } from '../../domain/actor';
import * as movieDetailsActions from '../actions/movie-details.action';
import { MovieService } from "../../services/movie/movie.service";
import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { mergeMap, map, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { Movie } from 'src/app/domain/movie';

@Injectable()
export class MovieDetailsEffects {
  constructor(private actions: Actions, private movieService: MovieService) {}

  @Effect()
  loadMovieDetails = this.actions.pipe(
    ofType(movieDetailsActions.MovieDetailsActionTypes.LOAD_MOVIE_BY_ID),
    mergeMap(() =>
      this.movieService.getMovieById().pipe(
        map((movie: Movie) => ({
          type:
          movieDetailsActions.MovieDetailsActionTypes
              .LOAD_MOVIE_BY_ID_SUCCESS,
          payload: movie
        })),
        catchError(() =>
          of({
            type:
            movieDetailsActions.MovieDetailsActionTypes
                .LOAD_MOVIE_BY_ID_FAIL
          })
        )
      )
    )
  );

  @Effect()
  loadActor = this.actions.pipe(
    ofType(movieDetailsActions.MovieDetailsActionTypes.LOAD_ACTOR_BY_ID),
    mergeMap(() =>
      this.movieService.getActorById("nm0000093").pipe(
        map((actor: Actor) => ({
          type:
          movieDetailsActions.MovieDetailsActionTypes
              .LOAD_ACTOR_BY_ID_SUCCESS,
          payload: actor
        })),
        catchError(() =>
          of({
            type:
            movieDetailsActions.MovieDetailsActionTypes
                .LOAD_ACTOR_BY_ID_FAIL
          })
        )
      )
    )
  );
}
