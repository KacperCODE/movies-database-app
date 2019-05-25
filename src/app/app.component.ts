import { SearchCriteria } from 'src/app/domain/searchCriteria';
import { InitializeSearchCriteriaFromCache } from './store/actions/movies-list.action';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from './store'

@Component({
  selector: 'moviesapp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'moviesapp';

  constructor(private store: Store<fromStore.MoviesState>) { }

  ngOnInit() {
    this.initializeSearchCriteriaFromCache();
  }

  private initializeSearchCriteriaFromCache(): void {
    const { limit, page, sortBy, sortDir } = JSON.parse(localStorage.getItem("SEARCH_CRITERIA"));;
    const searchCriteria = new SearchCriteria(limit, page, sortBy, sortDir);

    this.store.dispatch(new fromStore.InitializeSearchCriteriaFromCache(searchCriteria));
  }
}
