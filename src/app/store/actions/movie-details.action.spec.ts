import { Actor } from './../../domain/actor';
import {
     SetMovieId,
     LoadMovieDetails,
     LoadMovieDetailsSuccess,
     LoadMovieDetailsFail,
     LoadActorById,
     LoadActorByIdSuccess,
     LoadActorByIdFail,
     MovieDetailsTypes
} from './movie-details.action';
import { Movie } from 'src/app/domain/movie';

describe('MovieDetailsActions', () => {
    it('should create SetMovieId action', () => {
        const action = new SetMovieId('mm54321');
        
        expect(action.type).toEqual(MovieDetailsTypes.SET_MOVIE_ID);
        expect(action.payload).toEqual(
            'mm54321'
        );
    })

    it('should create LoadMovieDetails action', () => {
        const action = new LoadMovieDetails();
        
        expect(action.type).toEqual(MovieDetailsTypes.LOAD_MOVIE_BY_ID);
    })

    it('should create LoadMovieDetailsSuccess action', () => {
        const action = new LoadMovieDetailsSuccess(new Movie());
        
        expect(action.type).toEqual(MovieDetailsTypes.LOAD_MOVIE_BY_ID_SUCCESS);
        expect(action.payload).toEqual(
            new Movie()
        );
    })

    it('should create LoadMovieDetailsFail action', () => {
        const action = new LoadMovieDetailsFail();
        
        expect(action.type).toEqual(MovieDetailsTypes.LOAD_MOVIE_BY_ID_FAIL);
    })

    it('should create LoadActorById action', () => {
        const action = new LoadActorById('ii98765');
        
        expect(action.type).toEqual(MovieDetailsTypes.LOAD_ACTOR_BY_ID);
        expect(action.payload).toEqual(
            'ii98765'
        );
    })

    it('should create LoadActorByIdSuccess action', () => {
        const action = new LoadActorByIdSuccess(new Actor());
        
        expect(action.type).toEqual(MovieDetailsTypes.LOAD_ACTOR_BY_ID_SUCCESS);
        expect(action.payload).toEqual(
            new Actor()
        );
    })
    
    it('should create LoadActorByIdFail action', () => {
        const action = new LoadActorByIdFail();
        
        expect(action.type).toEqual(MovieDetailsTypes.LOAD_ACTOR_BY_ID_FAIL);
    })
})