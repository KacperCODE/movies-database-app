import { Movie } from 'src/app/domain/movie';
import { of, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as fromStore from '../../store';
import { MovieDetailsComponent } from './movie-details.component';
import { Component, Input } from '@angular/core';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;
  let store: MockStore<fromStore.MoviesState>;

  let testStore = jasmine.createSpyObj('store', ['select', 'dispatch']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieDetailsComponent, MovieCardDetailedComponent ],
      providers: [{ provide: Store, useValue: testStore },   {
        provide: ActivatedRoute,
        useValue: {
          params: of({})
        }
      }]
    }).compileComponents();
    
    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should attept to load details of a movie from state on init', () => {
    spyOn(component, 'getMovieDetailsFromState');
    spyOn(component, 'subscribeToActivatedRoute').and.stub();
    const movie: Movie = new Movie();

    testStore.select.and.returnValue( of(movie))
    component.ngOnInit();

    expect(component.getMovieDetailsFromState).toHaveBeenCalled();
  })
});


@Component({ selector: "moviesapp-movie-card-detailed", template: "" })
class MovieCardDetailedComponent {
    @Input() movie;
}
