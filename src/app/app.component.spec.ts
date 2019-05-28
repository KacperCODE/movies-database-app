import { MovieService } from './services/movie/movie.service';
import { SearchCriteria } from './domain/searchCriteria';
import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { HttpClientModule } from "@angular/common/http";
import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import { MockStore } from "@ngrx/store/testing";
import * as fromStore from "./store";

describe("AppComponent", () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore<fromStore.MoviesState>;
  let testStore = jasmine.createSpyObj('store', ['dispatch']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, NavbarStubComponent, NgxAlertsStubComponent],
      imports: [RouterTestingModule, HttpClientModule, FontAwesomeModule],
      providers: [{ provide: Store, useValue: testStore }, { provide: MovieService, useClass: MovieServiceStub }]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
  }));

  it("should create the app", () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'moviesapp'`, () => {
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("moviesapp");
  });

  it(`should call dispatch if there are cached searchCriteria '`, () => {
    const criteria = new SearchCriteria();
    const criteriaStringified = JSON.stringify(criteria);

    spyOn(localStorage, 'getItem').and.callFake(() => {
        return criteriaStringified;
      });
    spyOn(component, "storeSearchCriteria");
    
    component.ngOnInit();

    expect(component.storeSearchCriteria).toHaveBeenCalled();
    expect(component.storeSearchCriteria).toHaveBeenCalledWith(criteria)
  });
});

@Component({ selector: "moviesapp-navbar", template: "" })
class NavbarStubComponent {}

@Component({ selector: "ngx-alerts", template: "" })
class NgxAlertsStubComponent {}

class MovieServiceStub {
  constructor() { }
  public subscribeToMovieId() {}
  public subscribToSearchCriteria() {}
}