import movieReducer from './movieReducer';
import * as actionTypes from '../actionTypes';

describe('movie reducer', () => {

    it('should add new movie to "favoriteMovies"', () => {
        expect(movieReducer({
            favoriteMovies: [
                { movie: 1 }
            ]
        },
            {
                type: actionTypes.ADD_TO_FAVORITES,
                movie: { movie: 2 }
            })
        ).toEqual({
            favoriteMovies: [
                { movie: 1 },
                { movie: 2 }
            ]
        })
    })

    it('should remove movie from "favoriteMovies"', () => {
        expect(movieReducer({
            favoriteMovies: [
                { movie: 1, id: 1 },
                { movie: 2, id: 2 },
                { movie: 3, id: 3 }
            ]
        },
            {
                type: actionTypes.REMOVE_FROM_FAVORITES,
                id: 2 
            })
        ).toEqual({
            favoriteMovies: [
                { movie: 1, id: 1 },
                { movie: 3, id: 3 }
            ]
        })
    })

})