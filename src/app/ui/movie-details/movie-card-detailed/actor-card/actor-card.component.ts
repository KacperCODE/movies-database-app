import { Log } from 'ng2-logger/client';
import { Actor } from './../../../../domain/actor';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'moviesapp-actor-card',
  templateUrl: './actor-card.component.html',
  styleUrls: ['./actor-card.component.scss']
})
export class ActorCardComponent implements OnInit {

  @Input() actor: Actor;

  constructor() { }

  ngOnInit() {
  }

  private openImdbTab(imdbId: string): void {
    window.open(`https://www.imdb.com/name/${imdbId}`, "_blank");
  }
}
