import * as actionTypes from '../actionTypes';
import axios from 'axios';
import endPoints from '../../shared/AxiosConfig/EndPoints';

export const auth = () => {
    return (dispatch, getState) => {
        const url = window.location.href;

        if (sessionStorage.session_id) {
            dispatch({
                type: actionTypes.GET_SESSION_ID,
                session_id: sessionStorage.session_id
            })
        }
        else if (url.includes('?')) {
            const params = url.split('?')[1];
            const paramList = params.split('&');
            const paramsObj = {};
            paramList.map(param => paramsObj[param.split('=')[0]] = param.split('=')[1]);

            axios.get(endPoints.initSession(paramsObj.request_token))
                .then(res => {
                    dispatch({
                        type: actionTypes.GET_SESSION_ID,
                        session_id: res.data.session_id
                    })
                })
        }
        else if (!sessionStorage.session_id) {
            axios.get(endPoints.getToken)
                .then(res => window.open(endPoints.approveToken(res.data.request_token), "_self"))
        }
    }

}
