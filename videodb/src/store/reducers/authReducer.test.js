import authReducer from './authReducer';
import * as actionTypes from '../actionTypes';

describe('auth reducer', () => {
    let state;
    beforeEach(() => {
        state = {
            requestToken: '',
            sessionId: ''
        }
    })
    it('should return the initial state', () => {
        expect(authReducer(undefined, {})).toEqual({
            ...state
        })
    })
    it('should store the "token"', () => {
        expect(authReducer(state, { type: actionTypes.GET_TOKEN, requestToken: 'token' })).toEqual({
            ...state,
            requestToken: 'token'
        })
    })
    it('should store the "sessionId"', () => {
        expect(authReducer(state, {type: actionTypes.GET_SESSION_ID, sessionId: 'id'})).toEqual({
            ...state,
            sessionId: 'id'
        })
    })
})