import { Component, Input } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { Store } from "@ngrx/store";
import { MockStore } from "@ngrx/store/testing";
import { of } from "rxjs";
import * as fromStore from "../../store";
import { User } from "./../../domain/user";
import { LoginComponent } from "./login.component";

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: MockStore<fromStore.MoviesState>;
  let router: Router;

  const testStore = jasmine.createSpyObj("Store", ["select", "dispatch"]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent, LoaderComponent],
      imports: [RouterTestingModule.withRoutes([]), ReactiveFormsModule],
      providers: [{ provide: Store, useValue: testStore }]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    router = TestBed.get(Router);
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should navigate to /list if user has succesfuly logged in", () => {
    const user: User = new User("admin@admin.com");
    const navigateSpy = spyOn(router, "navigate");

    testStore.select.and.returnValue(of(user));
    component.ngOnInit();

    expect(navigateSpy).toHaveBeenCalledWith(["/list"]);
  });
});

@Component({ selector: "moviesapp-loader", template: "" })
class LoaderComponent {
  @Input() actor;
}
