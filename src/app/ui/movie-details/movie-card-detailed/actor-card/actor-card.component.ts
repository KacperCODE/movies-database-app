import { Log } from 'ng2-logger/client';
import { AlertService } from 'ngx-alerts';
import { MovieService } from './../../../../services/movie/movie.service';
import { Actor } from './../../../../domain/actor';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'moviesapp-actor-card',
  templateUrl: './actor-card.component.html',
  styleUrls: ['./actor-card.component.scss']
})
export class ActorCardComponent implements OnInit {
  private log = Log.create("ActorCardComponent")

  @Input() actor: Actor;

  constructor(private movieService: MovieService,
              private alertService: AlertService) { }

  ngOnInit() {
    console.log('eloo', this.actor);
  }


  private openImdbTab(imdbId: string): void {
    window.open(`https://www.imdb.com/name/${imdbId}`, "_blank");
  }
}
