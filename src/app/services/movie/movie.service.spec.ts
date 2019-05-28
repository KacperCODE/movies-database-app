import { Store } from '@ngrx/store';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { MovieService } from './movie.service';
import { MockStore } from '@ngrx/store/testing';
import * as fromStore from "../../store";  

describe('MovieService', () => {
    let store: MockStore<fromStore.MoviesState>;
    let service: MovieService;
    let movieId: string;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientModule, BrowserModule],
            providers: [ MovieService, { provide: Store, useClass: StoreMock }]
        });
        service = TestBed.get(MovieService);
        store = TestBed.get(Store);
        movieId = null;
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});

class StoreMock {
    constructor() {}

    public select() {}
}
