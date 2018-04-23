import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actionCreators from '../../store/actionCreators';
import * as searchAndSortParams from '../../shared/UI/searchAndSortParams';
import * as sortTypes from '../../shared/UI/sortTypes';

import Layout from './HomeLayout';

export class Home extends React.Component {

    retrieveMovies = (str) => {
        if (str) this.props.getFilteredMovies();
        else this.props.getPopularMovies();
    }

    componentDidMount() {
        if (this.props.checkForFavorites) this.retrieveMovies(this.props.searchString);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.checkForFavorites !== nextProps.checkForFavorites
            || this.props.searchString !== nextProps.searchString) this.retrieveMovies(nextProps.searchString);
    }
    componentWillUnmount() {
        this.props.cleanUpMovieLists();
    }

    handleSearchAndSortChange = (e, property) => {
        e.persist();
        if (property === searchAndSortParams.SEARCH_STRING) this.props.setSearchString(e.target.value);
        else this.props.setSortParam(e.target.value);
    }


    handlePageClick = (page) => {
        this.props.cleanUpMovieLists();
        this.props.generatePageNumbers(page);
        this.props.searchString ? this.props.getFilteredMovies()
            : this.props.getPopularMovies();
    }


    sortByParam = (arr) => {
        const param = this.props.sortParam;
        switch (param) {
            case (sortTypes.BY_TITLE):
            case (sortTypes.BY_RAITING):
                return arr.sort((a, b) => {
                    if (a.hasOwnProperty(param) && b.hasOwnProperty(param)) {
                        let A = a[param].toString().toUpperCase()
                        let B = b[param].toString().toUpperCase()
                        if (param === sortTypes.BY_RAITING) return A < B ? 1 : -1
                        else return A > B ? 1 : -1
                    }
                })
            case (sortTypes.BY_DATE):
                return arr.sort((a, b) => {
                    if (a.hasOwnProperty(param) && b.hasOwnProperty(param)) {
                        let A = new Date(a[param])
                        let B = new Date(b[param])
                        return A < B ? 1 : -1
                    }
                })
            case (sortTypes.BY_DEFAULT):
                return arr.sort((a, b) => 0.5 - Math.random())
            default: return arr
        }
    }

    render() {
        return (
            <Layout
                {...this.props}
                handleSearchAndSortChange={(e, param) => this.handleSearchAndSortChange(e, param)}
                sortByParam={(arr) => this.sortByParam(arr)}
                handlePageClick={(page) => this.handlePageClick(page)}
            />
        )
    }

}

Home.propTypes = {
    popularMovies: PropTypes.array.isRequired,
    filteredMovies: PropTypes.array.isRequired,
    totalPages: PropTypes.number.isRequired,
    layoutType: PropTypes.string.isRequired,
    currentPage: PropTypes.number.isRequired,
    firstPage: PropTypes.number.isRequired,
    lastPage: PropTypes.number.isRequired,
    sortParam: PropTypes.string,
    searchString: PropTypes.string,
    favoriteMovies: PropTypes.array.isRequired,
    checkForFavorites: PropTypes.bool.isRequired
}

const mapStateToProps = state => {
    return {
        layoutType: state.uiReducer.layoutType,
        popularMovies: state.movieReducer.popularMovies,
        filteredMovies: state.movieReducer.filteredMovies,
        totalPages: state.movieReducer.totalPages,
        currentPage: state.uiReducer.currentPage,
        firstPage: state.uiReducer.firstPage,
        lastPage: state.uiReducer.lastPage,
        sortParam: state.uiReducer.sortParam,
        searchString: state.uiReducer.searchString,
        favoriteMovies: state.movieReducer.favoriteMovies,
        checkForFavorites: state.movieReducer.checkForFavorites
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPopularMovies: () => dispatch(actionCreators.getPopularMovies()),
        getFilteredMovies: () => dispatch(actionCreators.getFilteredMovies()),
        generatePageNumbers: (page) => dispatch(actionCreators.generatePageNumbers(page)),
        setSortParam: (param) => dispatch(actionCreators.setSortParam(param)),
        setSearchString: (str) => dispatch(actionCreators.setSearchString(str)),
        cleanUpMovieLists: () => dispatch(actionCreators.cleanUpMovieLists())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)