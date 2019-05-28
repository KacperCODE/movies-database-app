import { Actor } from "src/app/domain/actor";
import { Movie } from "src/app/domain/movie";
import { LoadActorById, LoadActorByIdFail, LoadActorByIdSuccess, LoadMovieDetails, LoadMovieDetailsFail, LoadMovieDetailsSuccess, SetMovieId } from "../actions/movie-details.action";
import * as fromMovieDetails from "./movie-details.reducer";

describe("MovieListReducer", () => {
  let initialState: fromMovieDetails.MovieDetailsState;
  let state: fromMovieDetails.MovieDetailsState;
  const reducer = fromMovieDetails.reducer;

  beforeEach(() => {
    initialState = {
      movieId: "mm54321",
      movie: new Movie(),
      actors: [new Actor()]
    };
    state = { ...initialState };
  });

  it("default case should not modify state", () => {
    const action: any = {};

    state = reducer(state, action);

    expect(state).toEqual(initialState);
  });

  it("SetMovieId action should set new movie id", () => {
    const action = new SetMovieId("mm98765");

    state = reducer(state, action);

    expect(state).not.toEqual(initialState);
    expect(state.movieId).toEqual("mm98765");
  });

  it("SetMovieId action should reset other values", () => {
    const movieId = "mm12345";
    const movie = new Movie();
    const actors = [new Actor()];
    state = { ...state, movieId, movie, actors };

    const action = new SetMovieId("mm98765");

    state = reducer(state, action);

    expect(state).not.toEqual(initialState);
    expect(state.movieId).toEqual("mm98765");
    expect(state.movie).toEqual(null);
    expect(state.actors).toEqual([]);
  });

  it("SetMovieId action should set new movie id", () => {
    const action = new SetMovieId("mm98765");

    state = reducer(state, action);

    expect(state).not.toEqual(initialState);
    expect(state.movieId).toEqual("mm98765");
  });

  it("LoadMovieDetails should not modify state", () => {
    const action = new LoadMovieDetails();

    state = reducer(state, action);

    expect(state).toEqual(initialState);
  });

  it("LoadMovieDetailsSuccess should update state with new movie", () => {
    const movie = new Movie();
    movie.title = "new movie";
    const action = new LoadMovieDetailsSuccess(movie);

    state = reducer(state, action);

    expect(state).not.toEqual(initialState);
    expect(state.movie).toEqual(movie);
  });

  it("LoadMovieDetailsFail should not modify state", () => {
    const action = new LoadMovieDetailsFail();

    state = reducer(state, action);

    expect(state).toEqual(initialState);
  });

  it("LoadActorById should not modify state", () => {
    const action = new LoadActorById("ii54321");

    state = reducer(state, action);

    expect(state).toEqual(initialState);
  });

  it("LoadActorByIdSuccess should update state with new actor", () => {
    const actors = [];
    state = { ...state, actors };

    const actor = new Actor();
    actor.name = "NewName";
    const action = new LoadActorByIdSuccess(actor);

    const newActors = [actor];

    state = reducer(state, action);

    expect(state).not.toEqual(initialState);
    expect(state.actors).toEqual(newActors);
  });

  it("LoadActorByIdFail should not modify state", () => {
    const action = new LoadActorByIdFail();

    state = reducer(state, action);

    expect(state).toEqual(initialState);
  });
});
