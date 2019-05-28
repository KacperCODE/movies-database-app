import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { Store } from "@ngrx/store";
import { MockStore } from "@ngrx/store/testing";
import * as fromStore from "../../../store";
import { FontAwesomeCustomModule } from "./../../../utility/fontAwesomeCustom.module";
import { ListPaginationBarComponent } from "./list-pagination-bar.component";

describe("ListPaginationBarComponent", () => {
  let component: ListPaginationBarComponent;
  let fixture: ComponentFixture<ListPaginationBarComponent>;
  let store: MockStore<fromStore.MoviesState>;

  const testStore = jasmine.createSpyObj("Store", ["select", "dispatch"]);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListPaginationBarComponent],
      imports: [RouterTestingModule, FontAwesomeCustomModule],
      providers: [{ provide: Store, useValue: testStore }]
    }).compileComponents();

    fixture = TestBed.createComponent(ListPaginationBarComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
