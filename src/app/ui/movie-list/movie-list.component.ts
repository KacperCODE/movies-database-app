import { Movie } from './../../domain/movie';
import { Page } from './../../domain/page';
import { Log } from 'ng2-logger/client';
import { AlertService } from 'ngx-alerts';
import { MovieService } from './../../services/movie/movie.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'moviesapp-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  animations:[
    trigger('initTransition', [
      state('initialized', style({
        'opacity': '0.1'
      })),
      state('loaded', style({
        'opacity': '1.0'
      })),
      transition('initialized => loaded', animate(400))
    ])
  ]
})
export class MovieListComponent implements OnInit {
  private log = Log.create("MovieListComponent")
  animationState = 'initialized';
  public movies: Movie[];

  constructor(private movieService: MovieService,
              private alertService: AlertService) { }

  @ViewChild('pageEl') pageRef: ElementRef;
  ngOnInit() {
    this.loadMovies();

    setTimeout(() => {
      this.animationState = 'loaded'
    }, 100);
  }

  private loadMovies(): void {
    this.movieService.getAllMoviesByCriteria()
      .subscribe(
        (data: Page) => {
          this.log.d('Movies', data);
          this.movies = [...data.collection];
        },
        (error) => {
          this.alertService.danger('Something went wrong');
          this.log.er("Can't load list of movies", error);
        }
      )
  }
}
