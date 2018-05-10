export { 
    // initSession,
    // getToken
    auth
 } from './actions/authActions';

export {
    getPopularMovies,
    getFilteredMovies,
    getMovie,
    addToFavs,
    removeFromFavs,
    getFavoriteMovies,
    cleanUpMovieLists
} from './actions/movieActions';

export {
    getLayoutType,
    generatePageNumbers,
    setSearchString,
    setSortParam
} from './actions/uiActions';