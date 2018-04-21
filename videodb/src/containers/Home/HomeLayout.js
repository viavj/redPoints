import React from 'react';
import Movie from '../../components/Movie/Movie';
import * as searchAndSortParams from '../../shared/UI/searchAndSortParams';
import * as layoutTypes from '../../shared/UI/layoutTypes';
import * as sortTypes from '../../shared/UI/sortTypes';
import Loader from '../../components/Loader/Loader';
import './Home.css';

const generateMovieList = (arr) => {
    return arr.map(movie => {
        return <Movie key={movie.id}
            movie={movie}
        />
    })
}

const layout = (props) => {

    const popularMovieList = props.popularMovies.length ? props.popularMovies
        : <Loader />

    const filteredMovieList = props.filteredMovies.length ? props.filteredMovies
        : <Loader />

    const movieList = props.searchString ? filteredMovieList : popularMovieList;
    const _class = props.layoutType === layoutTypes.MOBILE ? 'flex-item-mobile' : 'flex-item-desktop';
    const renderMovieList = Array.isArray(movieList) ? props.sortByParam(movieList).map(movie => {
        return <Movie key={movie.id}
            className={_class}
            movie={movie}
            isFavorite={false}
        />
    })
        : movieList


    //****************
    // Render Pagination
    const pageNumbers = []
    for (let i = props.firstPage; i <= props.lastPage; i++) {
        pageNumbers.push(i)
    }

    const renderPageNumbers = pageNumbers.map(number => {
        return (
            <li key={number}
                className={number === props.currentPage ? 'active' : null}
                onClick={() => props.handlePageClick(number)}
            >
                {number}
            </li>
        )
    })
    //****************


    //************** */
    // Input ans sort elements
    const actionBar = (
        <div className='actionBar' >
            <p className='sortSection' >Search By</p>        
            <input type='text' className='searchInput' placeholder='Title' value={props.searchString} onChange={(e) =>
                props.handleSearchAndSortChange(e, searchAndSortParams.SEARCH_STRING)} />
            <br />
            <p className='sortSection' >Sort By</p>
            <select value={props.sortParam} onChange={(e) => props.handleSearchAndSortChange(e, searchAndSortParams.SORT_PARAM)} >
                <option value=''>...</option>
                <option value={sortTypes.BY_TITLE}>Title</option>
                <option value={sortTypes.BY_DATE}>Date</option>
                <option value={sortTypes.BY_RAITING}>raiting</option>
            </select>
        </div>
    )
    //************** */

    return (
        <div className='homeLayout'>
            {actionBar}
            <ul className='pagination'>
                {renderPageNumbers}
            </ul>
            <div className='flex-container wrap'>
                {renderMovieList}
            </div>
            <ul className='pagination'>
                {renderPageNumbers}
            </ul>
        </div>
    )

}

export default layout;