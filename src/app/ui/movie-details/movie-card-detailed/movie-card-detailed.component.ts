import { AlertService } from 'ngx-alerts';
import { Log } from 'ng2-logger/client';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Movie } from 'src/app/domain/movie';
import { MovieService } from 'src/app/services/movie/movie.service';
import { ActivatedRoute, Params } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'moviesapp-movie-card-detailed',
  templateUrl: './movie-card-detailed.component.html',
  styleUrls: ['./movie-card-detailed.component.scss'],
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
export class MovieCardDetailedComponent implements OnInit {
  private log = Log.create("MovieCardDetailedComponent")
  animationState = 'initialized';

  //TODO move to state
  public movie: Movie;
  private movieId: string;

  constructor(private movieService: MovieService,
              private alertService: AlertService,
              private activatedRoute: ActivatedRoute) { }

  @ViewChild('pageEl') pageRef: ElementRef;
  ngOnInit() {
    this.subscribeToActivatedRoute();
    this.loadMovieById();
    
    setTimeout(() => {
      this.animationState = 'loaded'
    }, 100);
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
          this.animationState = 'loaded'
        },
        (error) => {
          this.alertService.danger('Something went wrong');
          this.log.er("Can't load movie details", error);
        }
      )
  }

  public openImdbTab(imdbId: string): void {
    window.open(`https://www.imdb.com/title/${imdbId}`, "_blank");
  }
}
