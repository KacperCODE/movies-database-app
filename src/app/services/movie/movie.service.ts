import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { SearchCriteria } from 'src/app/domain/searchCriteria';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  //TODO move url to separate directiory.
  private url = `https://marblejs-example.herokuapp.com/api/v1`;

  constructor(private authHttp: HttpClient) { }

  public getAllMoviesByCriteria(): Observable<any> {
    const criteria: SearchCriteria = new SearchCriteria();
    criteria.limit = 20;
    criteria.page = 1;
    criteria.sortBy = 'title';
    criteria.sortDir = 1;

    const { limit, page, sortBy, sortDir } = criteria;

    // return this.authHttp.get(this.url + `/movies?limit=${ limit }&page=${ page }&sortBy=${ sortBy }&sortDir=${ sortDir }`)
    return this.authHttp.get(this.url + `/movies?limit=${ limit }&page=${ page }&sortDir=${ sortDir }`)
    .pipe(
        map((res) => { 
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
