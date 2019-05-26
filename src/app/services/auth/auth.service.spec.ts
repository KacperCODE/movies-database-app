import { AlertService } from 'ngx-alerts';
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { TestBed } from "@angular/core/testing";

import { AuthService } from "./auth.service";
import { MockStore } from "@ngrx/store/testing";
import * as fromStore from "../../store";
import { RouterTestingModule } from "@angular/router/testing";

describe("AuthService", () => {
  let store: MockStore<fromStore.MoviesState>;
  let service: AuthService;

  const testStore = jasmine.createSpyObj("Store", ["select", "dispatch"]);
    beforeEach(() => {
        TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        providers: [
            { provide: Store, useValue: testStore }, 
            { provide: AlertService, useClass: AlertServiceStub }]
        })

        service = TestBed.get(AuthService);
    });

  
  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should return date", () => {
    expect(service.getUtcDate()).toBeTruthy;
  });

  it("should remove a token from local storage", () => {
    spyOn(localStorage, 'removeItem');
    
    service.removeToken();

    expect(localStorage.removeItem).toHaveBeenCalled();
  });

  it("should get a token from local storage", () => {
    spyOn(localStorage, 'getItem');
    
    service.getToken();

    expect(localStorage.getItem).toHaveBeenCalled();
  });
});

@Injectable()
export class AlertServiceStub {
  constructor() {}
}
