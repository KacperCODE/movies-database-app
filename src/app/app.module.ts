
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth/auth.interceptor';
import { MovieService } from './services/movie/movie.service';
import { LoginService } from './services/login/login.service';
import { AuthService } from './services/auth/auth.service';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './ui/login/login.component';
import { MovieDetailsComponent } from './ui/movie-details/movie-details.component';
import { MovieListComponent } from './ui/movie-list/movie-list.component';
import { MovieCardDetailedComponent } from './ui/movie-details/movie-card-detailed/movie-card-detailed.component';
import { MovieCardShortComponent } from './ui/movie-list/movie-card-short/movie-card-short.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-alerts';
import { ListSettingsComponent } from './ui/movie-list/list-settings/list-settings.component';
import { NavbarComponent } from './ui/navbar/navbar.component';
import { JwtModule } from '@auth0/angular-jwt';
import { ActorCardComponent } from './ui/movie-details/movie-card-detailed/actor-card/actor-card.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

export function tokenGetter() {
  return localStorage.getItem("JWT_TOKEN");
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MovieDetailsComponent,
    MovieListComponent,
    MovieCardDetailedComponent,
    MovieCardShortComponent,
    ListSettingsComponent,
    NavbarComponent,
    ActorCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forRoot({ moviesList: reducers.moviesList }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false,
    }),
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['marblejs-example.herokuapp.com']
      }
    }),
    AlertModule.forRoot({
      maxMessages: 3, 
      timeout: 3000, 
      position: 'right'
    })
  ],
  providers: [
    AuthService,
    LoginService,
    MovieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    // Font Awesome 5.0 implementation
    library.add(faSignOutAlt);
  }}
