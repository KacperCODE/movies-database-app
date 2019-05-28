import { Store } from '@ngrx/store';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import * as fromStore from '../../../store';

@Component({
  selector: 'moviesapp-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {
  public loading: boolean;
  private subscriptions: Subscription = new Subscription();

  constructor(private store: Store<fromStore.MoviesState>) { }

  ngOnInit() {
    this.subscribeToIsLoading();
  }

  public subscribeToIsLoading(): void {
    this.subscriptions.add( 
      this.store.select(fromStore.getIsLoading)
      .subscribe(
        (isLoading: boolean) => {
          this.loading = isLoading;
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
