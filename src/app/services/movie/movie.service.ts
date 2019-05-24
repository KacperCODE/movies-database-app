import { Actor } from './../../domain/actor';
import { Page } from './../../domain/page';
import { Movie } from './../../domain/movie';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { SearchCriteria } from 'src/app/domain/searchCriteria';
import * as fromStore from '../../store'
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private movieId: string;

  //TODO move url to separate directiory.
  private url = `https://marblejs-example.herokuapp.com/api/v1`;

    constructor(private store: Store<fromStore.MoviesState>,
                private authHttp: HttpClient) { 
      
    this.store.select(fromStore.getMovieId)
      .subscribe(
        (id) => {
          this.movieId = id;
        }
      )
    }

  public getAllMoviesByCriteria(): Observable<Page> {
    const criteria: SearchCriteria = new SearchCriteria();
    criteria.limit = 5;
    criteria.page = 1;
    criteria.sortBy = 'title';
    criteria.sortDir = -1;

    const { limit, page, sortBy, sortDir } = criteria;

    // return this.authHttp.get(this.url + `/movies?limit=${ limit }&page=${ page }&sortBy=${ sortBy }&sortDir=${ sortDir }`)
    return this.authHttp.get(this.url + `/movies?limit=${ limit }&page=${ page }`)
    .pipe(
        map((res: Page) => { 
          return res
        }),
        catchError(this.handleError));
  }

  public getMovieById(): Observable<Movie> {
    return this.authHttp.get(this.url + `/movies/${this.movieId}`)
    .pipe(
        map((res: Movie) => { 
          return res
        }),
        catchError(this.handleError));
  }

  public getActorById(actorId: string): Observable<Actor> {
    return this.authHttp.get(this.url + `/actors/${actorId}`)
    .pipe(
        map((res: Actor) => { 
          return res
        }),
        catchError(this.handleError));
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    if (errMsg === '400 - OK' || errMsg === '401 OK') {
        errMsg = 'Invalid username/password';
    }
    return throwError(errMsg);
  }
}
