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
  constructor(private store: Store<fromStore.MoviesState>) {}

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadMovieDetails);
    this.movie = this.store.select(fromStore.getMovieDetails);
  }

}
