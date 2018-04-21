import * as actionTypes from '../actionTypes';
import axios from 'axios';
import endPoints from '../../shared/AxiosConfig/EndPoints';


export const getToken = () => {
    return (dispatch) => {
        axios.get(endPoints.getToken)
            .then(res => {
                window.open(endPoints.approveToken(res.data.request_token), "_self");
                dispatch({
                    type: actionTypes.GET_TOKEN,
                    requestToken: res.data.request_token
                })
            }).catch(err => console.log(err))
    }
}


export const initSession = (param) => {
    return (dispatch) => {
        axios.get(endPoints.initSession(param))
            .then(res => {
                dispatch({
                    type: actionTypes.GET_SESSION_ID,
                    sessionId: res.data.session_id
                })
            }).catch(err => console.log(err))
    }
}
