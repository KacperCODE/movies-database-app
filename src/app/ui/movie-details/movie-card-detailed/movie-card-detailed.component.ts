import { Observable } from 'rxjs';
import { Log } from 'ng2-logger/client';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Movie } from 'src/app/domain/movie';
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
  @Input() movie: Movie;
  private movieId: string;

constructor(private activatedRoute: ActivatedRoute) { }

  @ViewChild('pageEl') pageRef: ElementRef;
  ngOnInit() {
    this.subscribeToActivatedRoute();
    
    setTimeout(() => {
      this.animationState = 'loaded'
    }, 300);
  }

  private subscribeToActivatedRoute(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.movieId = params['movieId'];
    })
  }


  public openImdbTab(imdbId: string): void {
    window.open(`https://www.imdb.com/title/${imdbId}`, "_blank");
  }
}
