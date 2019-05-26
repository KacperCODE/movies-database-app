import { User } from './../../domain/user';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, fakeAsync, async } from '@angular/core/testing';
import * as fromStore from '../../store';
import { NavbarComponent } from './navbar.component';
import { MockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let store: MockStore<fromStore.MoviesState>;

  const testStore = jasmine.createSpyObj('Store', ['select']);
  beforeEach(async() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      imports: [ RouterTestingModule, HttpClientModule, FontAwesomeModule ],
      providers: [{ provide: Store, useValue: testStore }]
    }).compileComponents();
    
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set local user details and show navbar options after user was upated in the store', () => {
    const user: User = new User('admin@admin.com');

    testStore.select.and.returnValue( of(user) );
    component.subscribeToCurrentUser();
    const isOfTypeUser = (component.user instanceof User);

    expect(isOfTypeUser).toBeTruthy();
    expect(component.canShowNavbarOptions).toBeTruthy();
  });

  it('should remove local user details and hide navbar options after user was removed from store', () => {
    const user: User = null;

    testStore.select.and.returnValue( of(user) );
    component.subscribeToCurrentUser();
    const isOfTypeUser = (component.user instanceof User);

    expect(isOfTypeUser).toBeFalsy();
    expect(component.canShowNavbarOptions).toBeFalsy();
  });

  it('should not display user email if user is not logged in', async() => {
    expect(component).toBeTruthy();
    await fixture.whenStable();

    const emailField: HTMLElement = fixture.nativeElement.querySelector('.navbar__email')

    expect(emailField).toBeNull();
  });

  it('should display user email is user has logged in', async() => {
    const user = new User('admin@admin.com');
    testStore.select.and.returnValue(
      of(user)
    );
    component.subscribeToCurrentUser();

    fixture.detectChanges();
    expect(component).toBeTruthy();
    await fixture.whenStable();
    const emailField: HTMLElement = fixture.nativeElement.querySelector('.navbar__email')

    expect(emailField.textContent).toContain(user.email);
  });

});
