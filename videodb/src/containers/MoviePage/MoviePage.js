import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actionCreators';
import PropTypes from 'prop-types';
import MovieDetails from '../../components/MovieDetails/MovieDetails';

class MoviePage extends React.Component {

    ifFavoriteMovies = ({ params: { id } }) => {
        if (this.props.favoriteMovies.length) this.props.getMovie(id);
    }

    componentDidMount() {
        this.ifFavoriteMovies(this.props.match);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.id !== nextProps.match.params.id) this.ifFavoriteMovies(nextProps.match);
    }

    componentWillUnmount() {
        this.props.cleanUpMovieLists()
    }


    checkIfFavorite = () => {
        let isFavorite = false;
        this.props.favoriteMovies.map(movie => {
            if (movie.id === this.props.movie.id) isFavorite = true;
        })
        return isFavorite;
    }

    render() {

        const isFavorite = this.props.favoriteMovies.length ? this.checkIfFavorite() : false;
        const movie = Object.keys(this.props.movie).length > 0 ?
            <MovieDetails
                movie={this.props.movie}
                addToFavs={() => this.props.addToFavs(this.props.movie.id)}
                removeFromFavs={() => this.props.removeFromFavs(this.props.movie.id)}
                isFavorite={isFavorite}
            />
            : <p>Lodaing...</p>

        return (
            <div>
                {movie}
            </div>
        )
    }
}

MoviePage.propsTypes = {
    movie: PropTypes.object.isRequired,
    favoriteMovies: PropTypes.array.isRequired
}

const mapStateToProps = state => {
    return {
        movie: state.movieReducer.movie,
        favoriteMovies: state.movieReducer.favoriteMovies
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getMovie: (id) => dispatch(actionCreators.getMovie(id)),
        addToFavs: (id) => dispatch(actionCreators.addToFavs(id)),
        removeFromFavs: (id) => dispatch(actionCreators.removeFromFavs(id)),
        cleanUpMovieLists: () => dispatch(actionCreators.cleanUpMovieLists())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage)