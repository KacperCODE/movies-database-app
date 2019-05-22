import { AlertService } from 'ngx-alerts';
import { Log } from 'ng2-logger/client';
import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/domain/movie';
import { MovieService } from 'src/app/services/movie/movie.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'moviesapp-movie-card-detailed',
  templateUrl: './movie-card-detailed.component.html',
  styleUrls: ['./movie-card-detailed.component.scss']
})
export class MovieCardDetailedComponent implements OnInit {
  private log = Log.create("MovieCardDetailedComponent")
  //TODO move to state
  public movie: Movie;
  private movieId: string;

  constructor(private movieService: MovieService,
              private alertService: AlertService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.subscribeToActivatedRoute();
    this.loadMovieById();
  }

  private subscribeToActivatedRoute(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.movieId = params['movieId'];
    })
  }

  private loadMovieById(): void {
    this.movieService.getMovieById(this.movieId)
      .subscribe(
        (data: Movie) => {
          this.log.d('Movie', data);
          this.movie = Object.create(data);
        },
        (error) => {
          this.alertService.danger('Something went wrong');
          this.log.er("Can't load movie details", error);
        }
      )
  }
}
