import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

import * as fromStore from "../../store";
import { Actor } from "./../../domain/actor";
import { Movie } from "./../../domain/movie";
import { Page } from "./../../domain/page";
import { SearchCriteria } from "./../../domain/searchCriteria";

@Injectable({
  providedIn: "root"
})
export class MovieService {
  private movieId: string;
  private searchCriteria = new SearchCriteria();

  private url = `https://marblejs-example.herokuapp.com/api/v1`;

  constructor(
    private store: Store<fromStore.MoviesState>,
    private authHttp: HttpClient
  ) {}

  public subscribeToMovieId(): void {
    this.store.select(fromStore.getMovieId).subscribe(id => {
      this.movieId = id;
    });
  }

  public subscribToSearchCriteria(): void {
    this.store.select(fromStore.getSearchCriteria).subscribe(criteria => {
      this.searchCriteria = criteria;
    });
  }

  public getAllMoviesByCriteria(): Observable<Page> {
    const {
      limit,
      page,
      sortBy,
      sortDir
    }: SearchCriteria = this.searchCriteria;
    let params = new HttpParams();

    if (limit != null) {
      params = params.append("limit", String(limit));
    }
    if (page != null) {
      params = params.append("page", String(page));
    }
    if (sortBy != null) {
      params = params.append("sortBy", String(sortBy));
    }

    /**
     * TODO backlog-id: 98765
     * Important: IMDB-like backend app is throwing 400 when using sortDir param.
     * re-enable to make it work once an issue is fixed.
     * */

    // if (sortDir != null) {
    //   params = params.set('sortDir', String(sortDir));
    // }

    return this.authHttp.get(this.url + `/movies?` + params).pipe(
      map((res: Page) => {
        return res;
      }),
      catchError(this.handleError)
    );
  }

  public getMovieById(): Observable<Movie> {
    return this.authHttp.get(this.url + `/movies/${this.movieId}`).pipe(
      map((res: Movie) => {
        return res;
      }),
      catchError(this.handleError)
    );
  }

  public getActorById(actorId: string): Observable<Actor> {
    return this.authHttp.get(this.url + `/actors/${actorId}`).pipe(
      map((res: Actor) => {
        return res;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    let errMsg = error.message
      ? error.message
      : error.status
      ? `${error.status} - ${error.statusText}`
      : "Server error";
    if (errMsg === "400 - OK" || errMsg === "401 OK") {
      errMsg = "Invalid username/password";
    }
    return throwError(errMsg);
  }
}
