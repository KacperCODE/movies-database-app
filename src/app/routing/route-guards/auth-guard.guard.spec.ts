import { Injectable } from "@angular/core";
import { AuthService } from "./../../services/auth/auth.service";
import { TestBed, async, inject } from "@angular/core/testing";

import { AuthGuard } from "./auth-guard.guard";
import { RouterTestingModule } from "@angular/router/testing";

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
