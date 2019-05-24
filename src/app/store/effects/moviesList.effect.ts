import { Page } from './../../domain/page';
import { MovieService } from './../../services/movie/movie.service';
import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from '@ngrx/effects';

import * as moviesListActions from '../actions/moviesList.action';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class MoviesListEffects {

    constructor(private actions: Actions,
                private movieService: MovieService) { }

    @Effect()
    loadMoviesList = this.actions
    .pipe(
        ofType(moviesListActions.MoviesListActionTypes.LOAD_MOVIES_BY_CRITRIA),
        mergeMap(() => this.movieService.getAllMoviesByCriteria()
            .pipe(
                map((movies: Page) => { 
                    ({ 
                        type: moviesListActions.MoviesListActionTypes.LOAD_MOVIES_BY_CRITRIA_SUCCESS, 
                        payload: movies.collection 
                    })
                }),
                catchError(() => of({ type: moviesListActions.MoviesListActionTypes.LOAD_MOVIES_BY_CRITRIA_FAIL }))
            )
        )
    )
}