import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable, Subscription } from "rxjs";
import { Movie } from "src/app/domain/movie";
import * as fromStore from "../../../store";
import { Actor } from "./../../../domain/actor";
@Component({
  selector: "moviesapp-movie-card-detailed",
  templateUrl: "./movie-card-detailed.component.html",
  styleUrls: ["./movie-card-detailed.component.scss"],
  animations: [
    trigger("initTransition", [
      state(
        "initialized",
        style({
          opacity: "0.1"
        })
      ),
      state(
        "loaded",
        style({
          opacity: "1.0"
        })
      ),
      transition("initialized => loaded", animate(400))
    ])
  ]
})
export class MovieCardDetailedComponent implements OnInit, OnDestroy {
  animationState = "initialized";

  private subscriptions: Subscription = new Subscription();

  @Input() movie: Movie;
  public actors = new Observable<Actor[]>();

  constructor(private store: Store<fromStore.MoviesState>) {}

  @ViewChild("pageEl") pageRef: ElementRef;
  ngOnInit() {
    setTimeout(() => {
      this.animationState = "loaded";
    }, 300);

    this.actors = this.store.select(fromStore.getActors);

    this.subscriptions.add(
      this.store.select(fromStore.getMovieDetails).subscribe(movieData => {
        if (movieData != null) {
          this.loadActorsToStore(movieData.actors);
        }
      })
    );
  }

  /**
   * TODO backlog-id: 87654
   * Implement getActorsByMovieId to avoid this workaround.
   * Currently actors on details page are loaded one by one from an array
   * that comes with getMovieById and then each actor is added to Actors[]
   */
  private loadActorsToStore(actorsList): void {
    actorsList.forEach(actor => {
      this.store.dispatch(new fromStore.LoadActorById(actor.imdbId));
    });
  }

  public openImdbTab(imdbId: string): void {
    window.open(`https://www.imdb.com/title/${imdbId}`, "_blank");
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
