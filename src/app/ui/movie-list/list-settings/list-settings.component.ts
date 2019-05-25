import { Router } from '@angular/router';
import { Pagination } from './../../../domain/pagination.enum';
import { SearchCriteria } from 'src/app/domain/searchCriteria';
import { Component, OnInit, Input } from '@angular/core';
import * as fromStore from '../../../store'
import { Store } from '@ngrx/store';

@Component({
  selector: 'moviesapp-list-settings',
  templateUrl: './list-settings.component.html',
  styleUrls: ['./list-settings.component.scss']
})
export class ListSettingsComponent implements OnInit {

  public Pagination = Pagination; // making enum accesible from template
  public searchCriteria: SearchCriteria;

  constructor(private store: Store<fromStore.MoviesState>,
              private router: Router) { }

  ngOnInit() {
    this.store.select(fromStore.getSearchCriteria)
      .subscribe(
        (criteria) => {
          this.searchCriteria = criteria;
          this.router.navigate(['/list'], { queryParams: { page: this.searchCriteria.page }});
        }
      )
  }

  public changeCriteria(type: string): void {
    console.warn(`ATTENTION! Please keep in mind sorting by direction fails on the backend therefore it doesn't work. Functionality responible for sorting is implemented and need to be just uncommented in movie.service.ts`)
    this.store.dispatch(new fromStore.ChangeSearchCriteria(type));
    this.store.dispatch(new fromStore.LoadMoviesList)
    this.store.dispatch(new fromStore.CacheSearchCriteria);
  }

  public changeMaxResults(count: number): void {
    this.store.dispatch(new fromStore.ChangeSearchMaxResults(count));
    this.store.dispatch(new fromStore.LoadMoviesList);
    this.store.dispatch(new fromStore.CacheSearchCriteria);
  }

  public changePage(type: Pagination): void {
    this.store.dispatch(new fromStore.ChangePage(type));
    this.store.dispatch(new fromStore.LoadMoviesList);
  }

}