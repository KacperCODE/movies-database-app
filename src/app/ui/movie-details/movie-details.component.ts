import { ActivatedRoute, Params } from '@angular/router';
import { Movie } from './../../domain/movie';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromStore from '../../store'
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  public movie: Observable<Movie> = null;
  private subscriptions: Subscription = new Subscription();

  constructor(private store: Store<fromStore.MoviesState>,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.subscribeToActivatedRoute();
    this.getMovieDetailsFromState();
  }

  public getMovieDetailsFromState(): void {
    this.movie = this.store.select(fromStore.getMovieDetails);
  }

  public subscribeToActivatedRoute(): void {
    this.subscriptions.add(
      this.activatedRoute.queryParams.subscribe((params: Params) => {
        const movieId = params['movieId'];

        this.store.dispatch(new fromStore.SetMovieId(movieId))
        this.store.dispatch(new fromStore.LoadMovieDetails);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
