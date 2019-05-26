import { Component, Input } from '@angular/core';
import { Component } from '@angular/core';
import { MockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as fromStore from '../../store';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: MockStore<fromStore.MoviesState>;

  const testStore = jasmine.createSpyObj('Store', ['select', 'dispatch']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent, LoaderComponent ],
      imports: [ RouterTestingModule, ReactiveFormsModule ],
      providers: [{ provide: Store, useValue: testStore }]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({ selector: "moviesapp-loader", template: "" })
class LoaderComponent {
    @Input() actor;
}

