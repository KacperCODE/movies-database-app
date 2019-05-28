import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Movie } from "src/app/domain/movie";
@Component({
  selector: "moviesapp-movie-card-short",
  templateUrl: "./movie-card-short.component.html",
  styleUrls: ["./movie-card-short.component.scss"]
})
export class MovieCardShortComponent implements OnInit {
  @Input() movie: Movie;
  @Input() index: number;

  constructor(private router: Router) {}

  ngOnInit() {}

  public navigateToMovieDetails(): void {
    this.router.navigate(["/movie"], {
      queryParams: {
        movieId: this.movie.imdbId
      }
    });
  }
}
