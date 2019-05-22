import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'moviesapp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  public logout(): void {
    this.authService.manualLogout();
  }
}
