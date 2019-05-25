import { User } from './../../domain/user';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as fromStore from '../../store'
import { Store } from '@ngrx/store';

@Component({
  selector: 'moviesapp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public user: User;
  public canShowNavbarOptions: boolean;

  constructor(private store: Store<fromStore.MoviesState>,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.store.select(fromStore.getCurrentUser)
      .subscribe(
        (user: User) => {
          this.user = user;

          if(user != null) {
            this.canShowNavbarOptions = true;
          } else {
            this.canShowNavbarOptions = false;
          }
        }
      )
  }

  public navigateHome(): void {
    this.router.navigate(['/list'], { skipLocationChange: true });
  }

  public logout(): void {
    this.store.dispatch(new fromStore.UserManualLogout);
  }
}
