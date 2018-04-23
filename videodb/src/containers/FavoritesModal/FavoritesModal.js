import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actionCreators';
import * as layoutTypes from '../../shared/UI/layoutTypes';
import PropTypes from 'prop-types';
import './FavoritesModal.css';
import Movie from '../../components/Movie/Movie';

class FavoritesModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            toggleModal: false,
        }
        this.modal = React.createRef();
    }

    componentDidMount() {
        window.addEventListener('click', (e) => {            
            if (e.target == this.modal.current) this.toggleModal()
        })
    }

    toggleModal = () => {
        this.setState((prevState) => {
            return { toggleModal: !prevState.toggleModal }
        }, () => {
            if (this.modal.current) this.modal.current.style.display = this.state.toggleModal ? 'block' : 'none'
        })
    }

    generateFavList = () => {
        const _class = this.props.layoutType === layoutTypes.MOBILE ? 'flex-item-mobile' : 'flex-item-desktop';
        const movies = this.props.favoriteMovies.map(movie => {
            return <Movie key={movie.id}
                toggleModal={this.toggleModal}
                className={_class}
                movie={movie}
                isFavorite={true}
                renderForModal={true}
                removeFromFavs={() => this.props.removeFromFavs(movie.id)}
            />
        })
        return movies;
    }

    render() {
        const layout = this.state.toggleModal ?
            <div ref={this.modal} id="myModal" className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <span onClick={this.toggleModal} className="close">&times;</span>
                        <h2>Favorites</h2>
                    </div>
                    <div className="modal-body">
                        <div className='flex-container wrap'>
                            {this.state.toggleModal ? this.generateFavList() : <p>You have no favorite movies yet.</p>}
                        </div>
                    </div>
                </div>
            </div>
            : <button className='modal-btn' onClick={this.toggleModal} >Favorites</button>
        return (
            layout
        )
    }
}

FavoritesModal.propTypes = {
    favoriteMovies: PropTypes.array.isRequired,
    sessionId: PropTypes.string.isRequired,
    layoutType: PropTypes.string.isRequired
}

const mapStateToProps = state => {
    return {
        favoriteMovies: state.movieReducer.favoriteMovies,
        sessionId: state.authReducer.sessionId,
        layoutType: state.uiReducer.layoutType
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeFromFavs: (id) => dispatch(actionCreators.removeFromFavs(id)),
        getFavoriteMovies: (sessionId) => dispatch(actionCreators.getFavoriteMovies(sessionId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesModal)