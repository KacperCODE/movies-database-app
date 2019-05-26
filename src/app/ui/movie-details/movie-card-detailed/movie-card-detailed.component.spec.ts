import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as fromStore from '../../../store';
import { MovieCardDetailedComponent } from './movie-card-detailed.component';
import { MockStore } from '@ngrx/store/testing';

describe('MovieCardDetailedComponent', () => {
  let component: MovieCardDetailedComponent;
  let fixture: ComponentFixture<MovieCardDetailedComponent>;
  let store: MockStore<fromStore.MoviesState>;

  const testStore = jasmine.createSpyObj('Store', ['select', 'dispatch']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieCardDetailedComponent, ActorCardComponent ],
      providers: [{ provide: Store, useValue: testStore }]
    }).compileComponents();
    fixture = TestBed.createComponent(MovieCardDetailedComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({ selector: "moviesapp-actor-card", template: "" })
class ActorCardComponent {
    @Input() actor;
}

