import * as actionTypes from '../actionTypes';

const initialState = {
    popularMovies: [],
    filteredMovies: [],
    searchString: '',
    movie: {},
    totalPages: 0,
    favoriteMovies: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_POPULAR_MOVIES:
            return {
                ...state,
                popularMovies: action.popularMovies,
                totalPages: action.totalPages
            }
        case actionTypes.GET_FILTERED_MOVIES:
            return {
                ...state,
                filteredMovies: action.filteredMovies,
                totalPages: action.totalPages
            }
        case actionTypes.GET_MOVIE:
            return {
                ...state,
                movie: action.movie
            }
        case actionTypes.GET_FAVORITE_MOVIES:
            return {
                ...state,
                favoriteMovies: action.favoriteMovies
            }
        case actionTypes.ADD_TO_FAVORITES:
            return {
                ...state,
                favoriteMovies: state.favoriteMovies.concat(action.movie)
            }
        case actionTypes.REMOVE_FROM_FAVORITES:
            return {
                ...state,
                favoriteMovies: state.favoriteMovies.filter(movie => movie.id !== action.id)
            }
        case actionTypes.CLEAN_UP_MOVIE_LISTS:
            return {
                ...state,
                filteredMovies: [],
                popularMovies: [],
                movie: {}
            }
        default:
            return state
    }
}

export default reducer;