import * as actionTypes from '../actionTypes';
import axios from 'axios';
import endPoints from '../../shared/AxiosConfig/EndPoints';

const generateMoviePosterUrl = (arr) => {
    return arr.map(movie => {
        return {
            ...movie,
            poster_path: movie.poster_path === null ? 'https://i.imgur.com/H6zTeSs.jpg'
                : endPoints.moviePoster(movie.poster_path)
        }
    })
}

export const cleanUpMovieLists = () => {
    return { type: actionTypes.CLEAN_UP_MOVIE_LISTS }
}

export const getPopularMovies = () => {
    return (dispatch, getState) => {
        const { uiReducer: { currentPage } } = getState();
        axios.get(endPoints.popularMovies(currentPage))
            .then(response => {
                dispatch({
                    type: actionTypes.GET_POPULAR_MOVIES,
                    popularMovies: generateMoviePosterUrl(response.data.results),
                    totalPages: response.data.total_pages
                })
            })
            .catch(err => console.log(err))

    }
}

export const getFilteredMovies = () => {
    return (dispatch, getState) => {
        const { uiReducer: { searchString, currentPage } } = getState();
        if (searchString) {
            axios.get(endPoints.filteredMovies(currentPage, searchString))
                .then(response => {
                    dispatch({
                        type: actionTypes.GET_FILTERED_MOVIES,
                        filteredMovies: generateMoviePosterUrl(response.data.results),
                        totalPages: response.data.total_pages
                    })
                })
                .catch(err => console.log(err))
        }
    }
}

export const getMovie = (id) => {
    return (dispatch) => {
        axios.get(endPoints.movie(id))
            .then(response => {
                dispatch({
                    type: actionTypes.GET_MOVIE,
                    movie: {
                        ...response.data,
                        poster_path: response.data.poster_path === null ? 'https://i.imgur.com/H6zTeSs.jpg'
                            : endPoints.moviePoster(response.data.poster_path)
                    }
                })
            })
            .catch(err => console.log(err))
    }
}

export const getFavoriteMovies = () => {
    return (dispatch, getState) => {
        const { authReducer: { sessionId } } = getState();
        axios.get(endPoints.getFavorites(sessionId))
            .then(res => {
                dispatch({
                    type: actionTypes.GET_FAVORITE_MOVIES,
                    favoriteMovies: generateMoviePosterUrl(res.data.results),
                })
            })
            .catch(err => console.log(err))
    }
}


export const addToFavs = () => {
    return (dispatch, getState) => {
        const { authReducer: { sessionId } } = getState();
        const {movieReducer:{movie}} = getState();        
        axios({
            method: 'post',
            url: endPoints.toggleFavorite(sessionId),
            data: {
                "media_type": "movie",
                "media_id": movie.id,
                "favorite": true
            }
        }).then(res => {
            dispatch({
                type: actionTypes.ADD_TO_FAVORITES,
                movie: movie
            })
        })
            .catch(err => console.log(err))

    }
}

export const removeFromFavs = (id) => {
    return (dispatch, getState) => {
        const { authReducer: { sessionId } } = getState();
        axios({
            method: 'post',
            url: endPoints.toggleFavorite(sessionId),
            data: {
                "media_type": "movie",
                "media_id": id,
                "favorite": false
            }
        }).then(res => {
            dispatch({
                type: actionTypes.REMOVE_FROM_FAVORITES,
                id: id
            })
        })
            .catch(err => console.log(err))

    }
}