import { Component, OnInit, Input } from '@angular/core';
import { Movie } from 'src/app/domain/movie';
import { Router } from '@angular/router';
import * as fromStore from '../../../store'
import { Store } from '@ngrx/store';
@Component({
  selector: 'moviesapp-movie-card-short',
  templateUrl: './movie-card-short.component.html',
  styleUrls: ['./movie-card-short.component.scss']
})
export class MovieCardShortComponent implements OnInit {
  @Input() movie: Movie;


  constructor(private store: Store<fromStore.MoviesState>,
              private router: Router) { }

  ngOnInit() {
  }

  public navigateToMovieDetails(): void {
    this.router.navigate(['/movie'], { queryParams: {
      movieId: this.movie.imdbId
    }});
  }

}
