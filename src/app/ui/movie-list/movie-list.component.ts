import { SearchCriteria } from 'src/app/domain/searchCriteria';
import { Observable } from 'rxjs';
import { Movie } from './../../domain/movie';
import { Log } from 'ng2-logger/client';
import { AlertService } from 'ngx-alerts';
import { MovieService } from './../../services/movie/movie.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as fromStore from '../../store'
import { Store } from '@ngrx/store';

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

  public movies: Observable<Movie[]>;

  constructor(private store: Store<fromStore.MoviesState>) { }

  @ViewChild('pageEl') pageRef: ElementRef;
  ngOnInit() {

    setTimeout(() => {
      this.animationState = 'loaded'
    }, 100);
      
    this.getMoviesListFromStore();
    this.loadMovies();
  }

  public getMoviesListFromStore(): void {
    this.movies = this.store.select(fromStore.getMovies);
  }

  public loadMovies(): void {
    this.store.dispatch(new fromStore.LoadMoviesList)
  }
}
