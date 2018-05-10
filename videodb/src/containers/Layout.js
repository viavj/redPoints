import React from 'react';
import { connect } from 'react-redux';

import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import * as routes from '../shared/Navigation/routes';

import * as actionCreators from '../store/actionCreators';
import Aux from '../HOC/Aux';
import Home from './Home/Home';
import FavoritesModal from './FavoritesModal/FavoritesModal';
import MoviePage from './MoviePage/MoviePage';
import './Layout.css';


class Layout extends React.Component {

    componentWillMount() {
        window.addEventListener('resize', this.props.getlayoutType)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.props.getlayoutType)
    }

    componentDidMount() {  
        this.props.auth()
    }

    componentDidUpdate() {
        if (this.props.sessionId) this.props.getFavoriteMovies()
    }

    render() {
        return (
            <BrowserRouter>
                <div className='layout'>
                    <div className='navLinkContainer'>
                        <NavLink className='navLink' to='/' >Home</NavLink>
                        <FavoritesModal />
                    </div>
                    <div className='Layout'>
                        <Switch>
                            <Route path={routes.BASE} exact component={Home} />
                            <Route path={`${routes.PAGE}/:number`} exact component={Home} />
                            <Route path={`${routes.MOVIE_PAGE}/:id`} component={MoviePage} />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        )
    }

}

const mapStateToProps = state => {
    return {
        sessionId: state.authReducer.sessionId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getlayoutType: () => dispatch(actionCreators.getLayoutType()),
        getFavoriteMovies: () => dispatch(actionCreators.getFavoriteMovies()),
        auth: () => dispatch(actionCreators.auth())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)