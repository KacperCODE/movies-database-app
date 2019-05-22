import { LoginService } from './services/login/login.service';
import { AuthService } from './services/auth/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './ui/login/login.component';
import { MovieDetailsComponent } from './ui/movie-details/movie-details.component';
import { MovieListComponent } from './ui/movie-list/movie-list.component';
import { MovieCardDetailedComponent } from './ui/movie-details/movie-card-detailed/movie-card-detailed.component';
import { MovieCardShortComponent } from './ui/movie-list/movie-card-short/movie-card-short.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MovieDetailsComponent,
    MovieListComponent,
    MovieCardDetailedComponent,
    MovieCardShortComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
