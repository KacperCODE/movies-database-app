import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';

import * as fromStore from '../../../store';
import { FontAwesomeCustomModule } from './../../../utility/fontAwesomeCustom.module';
import { ListSettingsComponent } from './list-settings.component';

describe('ListSettingsComponent', () => {
  let component: ListSettingsComponent;
  let fixture: ComponentFixture<ListSettingsComponent>;
  let store: MockStore<fromStore.MoviesState>;

  const testStore = jasmine.createSpyObj('Store', ['select']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSettingsComponent ],
      imports: [ FontAwesomeCustomModule ],
      providers: [{ provide: Store, useValue: testStore }]
    }).compileComponents();

    fixture = TestBed.createComponent(ListSettingsComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
