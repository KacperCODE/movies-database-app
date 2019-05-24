import { MovieDetailsEffects } from './effects/movie-details.effect';
import { MoviesListEffects } from './effects/movies-list.effect';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './reducers';

// import AppStoreModule in the AppModule after router module
@NgModule({
  imports: [
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([MoviesListEffects, MovieDetailsEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false
    }),
  ],
  exports: [StoreModule]
})
export class AppStoreModule { }