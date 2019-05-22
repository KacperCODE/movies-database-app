import { Page } from './../../domain/page';
import { Log } from 'ng2-logger/client';
import { AlertService } from 'ngx-alerts';
import { MovieService } from './../../services/movie/movie.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'moviesapp-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  private log = Log.create("MovieListComponent")

  constructor(private movieService: MovieService,
              private alertService: AlertService) { }

  ngOnInit() {
    this.loadMovies();
  }

  private loadMovies(): void {
    this.movieService.getAllMoviesByCriteria()
      .subscribe(
        (data: Page) => {
          this.log.d('Movies', data);
        },
        (error) => {
          this.alertService.danger('Something went wrong');
          this.log.er("Can't load list of movies", error);
        }
      )
  }
}
