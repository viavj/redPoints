import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import AuthReducer from './store/reducers/authReducer';
import UiReducer from './store/reducers/uiReducer';
import MovieReducer from './store/reducers/movieReducer';

const reducer = combineReducers({
    authReducer: AuthReducer,
    uiReducer: UiReducer,
    movieReducer: MovieReducer
})

const store = createStore(reducer, applyMiddleware(logger, thunk))

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
