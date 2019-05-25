import { Router } from '@angular/router';
import { Pagination } from './../../../domain/pagination.enum';
import { Component, OnInit } from '@angular/core';
import { SearchCriteria } from 'src/app/domain/searchCriteria';
import * as fromStore from '../../../store'
import { Store } from '@ngrx/store';

@Component({
  selector: 'moviesapp-list-pagination-bar',
  templateUrl: './list-pagination-bar.component.html',
  styleUrls: ['./list-pagination-bar.component.scss']
})
export class ListPaginationBarComponent implements OnInit {


  public Pagination = Pagination; // making enum accesible from template
  public searchCriteria: SearchCriteria;
  public canLoadPrevious: boolean;
  public canLoadNext: boolean;

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

      this.store.select(fromStore.getPaginationDetails)
        .subscribe(
          (paginationDetails) => {
            const { pageLimit, page } = paginationDetails;
            if(page === 1 || pageLimit === 1) {
              this.canLoadPrevious = false;
            } else {
              this.canLoadPrevious = true;
            }
            
            if(page === pageLimit || pageLimit === 1) {
              this.canLoadNext = false;
            } else {
              this.canLoadNext = true;
            }
          }
        )
  }

  public changePage(type: Pagination): void {
    this.store.dispatch(new fromStore.ChangePage(type));
    this.store.dispatch(new fromStore.LoadMoviesList);
  }

}