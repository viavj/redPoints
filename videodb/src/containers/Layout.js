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

    getAllPArams = () => {
        const query = window.location.href.split('?')[1];
        if (query) {
            return query.split('&').map(param => {
                return { [param.split('=')[0]]: param.split('=')[1] }
            })
        }
        return [];
    }

    componentDidMount() {
        const params = this.getAllPArams();
        const tokenIsApproved = params.length > 0 ? params[1].approved : false;
        if (tokenIsApproved && !this.props.sessionId) this.props.initSession(params[0].request_token)
        else this.props.getToken();
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
        requestToken: state.authReducer.requestToken,
        sessionId: state.authReducer.sessionId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getlayoutType: () => dispatch(actionCreators.getLayoutType()),
        initSession: (param) => dispatch(actionCreators.initSession(param)),
        getToken: () => dispatch(actionCreators.getToken()),
        getFavoriteMovies: () => dispatch(actionCreators.getFavoriteMovies())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout)