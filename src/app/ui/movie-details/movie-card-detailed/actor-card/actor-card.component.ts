import { Component, Input, OnInit } from "@angular/core";
import { Actor } from "./../../../../domain/actor";

@Component({
  selector: "moviesapp-actor-card",
  templateUrl: "./actor-card.component.html",
  styleUrls: ["./actor-card.component.scss"]
})
export class ActorCardComponent implements OnInit {
  @Input() actor: Actor;

  constructor() {}

  ngOnInit() {}

  public openImdbTab(imdbId: string): void {
    window.open(`https://www.imdb.com/name/${imdbId}`, "_blank");
  }
}
