import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as fromStore from '../../../store';
import { ListPaginationBarComponent } from './list-pagination-bar.component';
import { MockStore } from '@ngrx/store/testing';

describe('ListPaginationBarComponent', () => {
  let component: ListPaginationBarComponent;
  let fixture: ComponentFixture<ListPaginationBarComponent>;
  let store: MockStore<fromStore.MoviesState>;

  const testStore = jasmine.createSpyObj('Store', ['select', 'dispatch']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPaginationBarComponent ],
      imports: [ RouterTestingModule, FontAwesomeModule ],
      providers: [{ provide: Store, useValue: testStore }]
    }).compileComponents();
    
    fixture = TestBed.createComponent(ListPaginationBarComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
