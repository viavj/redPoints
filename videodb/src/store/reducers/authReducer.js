import * as actionTypes from '../actionTypes';

const storeSessionId = (session_id) => {
    sessionStorage.session_id = session_id;
    return sessionStorage.session_id
}

const initialState = {
    // requestToken: '',
    sessionId: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // case actionTypes.GET_TOKEN:
        //     return {
        //         ...state,
        //         requestToken: action.requestToken
        //     }
        case actionTypes.GET_SESSION_ID:
            return {
                ...state,
                sessionId: storeSessionId(action.session_id)
            }
        default:
            return state
    }
}

export default reducer;