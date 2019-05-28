import { Component, Input } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { Store } from "@ngrx/store";
import { MockStore } from "@ngrx/store/testing";
import * as fromStore from "../../../store";
import { MovieCardDetailedComponent } from "./movie-card-detailed.component";

describe("MovieCardDetailedComponent", () => {
  let component: MovieCardDetailedComponent;
  let fixture: ComponentFixture<MovieCardDetailedComponent>;
  let store: MockStore<fromStore.MoviesState>;

  const testStore = jasmine.createSpyObj("Store", ["select", "dispatch"]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MovieCardDetailedComponent, ActorCardComponent],
      providers: [{ provide: Store, useValue: testStore }]
    }).compileComponents();
    fixture = TestBed.createComponent(MovieCardDetailedComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should navigate to IMBD movie page if clicked on his name", async(() => {
    spyOn(component, "openImdbTab");

    let movieTitle = fixture.debugElement.nativeElement.querySelector(
      ".card-details__title span"
    );
    movieTitle.click();

    fixture.whenStable().then(() => {
      expect(component.openImdbTab).toHaveBeenCalled();
    });
  }));
});

@Component({ selector: "moviesapp-actor-card", template: "" })
class ActorCardComponent {
  @Input() actor;
}
