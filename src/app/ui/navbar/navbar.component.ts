import { User } from './../../domain/user';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import * as fromStore from '../../store'
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'moviesapp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  public user: User = null;
  public canShowNavbarOptions: boolean = false;
  private subscriptions: Subscription = new Subscription();

  constructor(private store: Store<fromStore.MoviesState>,
              private router: Router) { }

  ngOnInit() {
    this.getCurrentUserFromStore();
  }

  public getCurrentUserFromStore(): void {
    this.subscriptions.add( 
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
      );
  }
  
  public navigateHome(): void {
    this.router.navigate(['/list'], { skipLocationChange: true });
  }

  public logout(): void {
    this.store.dispatch(new fromStore.UserManualLogout);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
