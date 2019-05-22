import { Component, OnInit, Input } from '@angular/core';
import { Movie } from 'src/app/domain/movie';
import { Router } from '@angular/router';

@Component({
  selector: 'moviesapp-movie-card-short',
  templateUrl: './movie-card-short.component.html',
  styleUrls: ['./movie-card-short.component.scss']
})
export class MovieCardShortComponent implements OnInit {
  @Input() movie: Movie;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public navigateToMovieDetails(): void {
    this.router.navigate(['/movie'], { queryParams: {
      movieId: this.movie.imdbId
    }});
  }

}
