import { ActivatedRoute, Params } from '@angular/router';
import { Movie } from './../../domain/movie';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import * as fromStore from '../../store'
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  public movie: Observable<Movie>;
  
  constructor(private store: Store<fromStore.MoviesState>,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.subscribeToActivatedRoute();

    this.movie = this.store.select(fromStore.getMovieDetails);
  }

  private subscribeToActivatedRoute(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const movieId = params['movieId'];

      this.store.dispatch(new fromStore.SetMovieId(movieId))
      this.store.dispatch(new fromStore.LoadMovieDetails);
    })
  }

}
