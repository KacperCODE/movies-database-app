import { Injectable } from "@angular/core";
import { inject, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { AuthService } from "./../../services/auth/auth.service";
import { AuthGuard } from "./auth-guard.guard";

describe("AuthGuardGuard", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        {
          provide: AuthService,
          userClass: AuthServiceStub
        }
      ]
    });
  });

  it("should be created", inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});

@Injectable()
export class AuthServiceStub {
  constructor() {}
}
