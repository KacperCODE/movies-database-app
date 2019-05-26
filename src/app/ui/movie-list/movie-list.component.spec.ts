import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Component, Input } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import * as fromStore from '../../store';
import { MovieListComponent } from "./movie-list.component";
import { MockStore } from '@ngrx/store/testing';

describe("MovieListComponent", () => {
  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;
  let store: MockStore<fromStore.MoviesState>;

  const testStore = jasmine.createSpyObj('Store', ['select', 'dispatch']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MovieListComponent,
        ListSettingsComponent,
        ListPaginationBarComponent,
        MovieCarShortComponent
      ],
      imports: [ FontAwesomeModule, BrowserAnimationsModule ],
      providers: [{ provide: Store, useValue: testStore }]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});

@Component({ selector: "moviesapp-list-settings", template: "" })
class ListSettingsComponent {}

@Component({ selector: "moviesapp-list-pagination-bar", template: "" })
class ListPaginationBarComponent {}

@Component({ selector: "moviesapp-movie-card-short", template: "" })
class MovieCarShortComponent {
    @Input() index;
    @Input() movie;
}
