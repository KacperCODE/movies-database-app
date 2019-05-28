import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { User } from "./../../domain/user";
import { FontAwesomeCustomModule } from "./../../utility/fontAwesomeCustom.module";
import { NavbarComponent } from "./navbar.component";

describe("NavbarComponent", () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  const testStore = jasmine.createSpyObj("Store", ["select"]);
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [RouterTestingModule, HttpClientModule, FontAwesomeCustomModule],
      providers: [{ provide: Store, useValue: testStore }]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should set local user details and show navbar options after user was upated in the store", () => {
    const user: User = new User("admin@admin.com");

    testStore.select.and.returnValue(of(user));
    component.ngOnInit();
    const isOfTypeUser = component.user instanceof User;

    expect(isOfTypeUser).toBeTruthy();
    expect(component.canShowNavbarOptions).toBeTruthy();
  });

  it("should remove local user details and hide navbar options after user was removed from store", () => {
    const user: User = null;

    testStore.select.and.returnValue(of(user));
    component.ngOnInit();
    const isOfTypeUser = component.user instanceof User;

    expect(isOfTypeUser).toBeFalsy();
    expect(component.canShowNavbarOptions).toBeFalsy();
  });

  it("should not display user email if user is not logged in", async () => {
    expect(component).toBeTruthy();
    await fixture.whenStable();

    const emailField: HTMLElement = fixture.nativeElement.querySelector(
      ".navbar__email"
    );

    expect(emailField).toBeNull();
  });

  it("should display user email is user has logged in", async () => {
    const user: User = new User("admin@admin.com");
    testStore.select.and.returnValue(of(user));
    component.getCurrentUserFromStore();

    fixture.detectChanges();
    expect(component).toBeTruthy();
    await fixture.whenStable();
    const emailField: HTMLElement = fixture.nativeElement.querySelector(
      ".navbar__email"
    );

    expect(emailField.textContent).toContain(user.email);
  });
});
