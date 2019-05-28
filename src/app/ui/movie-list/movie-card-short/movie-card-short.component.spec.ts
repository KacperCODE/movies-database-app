import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { FontAwesomeCustomModule } from "./../../../utility/fontAwesomeCustom.module";
import { MovieCardShortComponent } from "./movie-card-short.component";


describe("MovieCardShortComponent", () => {
  let component: MovieCardShortComponent;
  let fixture: ComponentFixture<MovieCardShortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MovieCardShortComponent],
      imports: [RouterTestingModule, FontAwesomeCustomModule]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieCardShortComponent);
    component = fixture.componentInstance;
  }));

  beforeEach(() => {
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
