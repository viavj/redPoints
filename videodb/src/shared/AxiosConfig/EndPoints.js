import axios from 'axios';

const API_KEY = '1e9996f9936854b3ac4a8008152ed052';
const ACCOUNT_ID = 'passedByMe';

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';


const endPoints = {
    popularMovies: (page) => `https://api.themoviedb.org/3/movie/popular?page=${page}&language=en-US&api_key=${API_KEY}`,
    filteredMovies: (page , str) => `https://api.themoviedb.org/3/search/movie?include_adult=false&page=${page}&language=en-US&api_key=${API_KEY}&query=${str}`,
    moviePoster: (imgID) => `http://image.tmdb.org/t/p/w185/${imgID}`,
    movie: (id) => `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`,
    getToken: `https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`,
    approveToken: (token) => `https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:3000`,
    initSession: (token) => `https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY}&request_token=${token}`,
    getFavorites: (sessionId) => `https://api.themoviedb.org/3/account/${ACCOUNT_ID}/favorite/movies?page=1&sort_by=created_at.asc&language=en-US&api_key=${API_KEY}&session_id=${sessionId}`,
    toggleFavorite: (sessionId) => `https://api.themoviedb.org/3/account/${ACCOUNT_ID}/favorite?api_key=${API_KEY}&session_id=${sessionId}`,
    
}

export default endPoints;