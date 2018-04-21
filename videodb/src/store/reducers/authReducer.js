import * as actionTypes from '../actionTypes';

const initialState = {
    requestToken: '',
    sessionId: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_TOKEN:
            return {
                ...state,
                requestToken: action.requestToken
            }
            case actionTypes.GET_SESSION_ID:
            return {
                ...state,
                sessionId: action.sessionId
            }
        default:
            return state
    }
}

export default reducer;