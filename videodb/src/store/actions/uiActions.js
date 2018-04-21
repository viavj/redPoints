import * as actionTypes from '../actionTypes';
import * as layoutTypes from '../../shared/UI/layoutTypes';

export const getLayoutType = () => {
    return {
        type: actionTypes.GET_LAYOUT_TYPE,
        layoutType: window.innerHeight > window.innerWidth ? layoutTypes.MOBILE : layoutTypes.DESKTOP
    }
}

export const generatePageNumbers = (page) => {
    return (dispatch, getState) => {
        const { uiReducer: { firstPage, lastPage, currentPage } } = getState();
        const { movieReducer: { totalPages } } = getState();
        const step = 2;
        if (page >= lastPage - step) {
            dispatch({
                type: actionTypes.PAGINTATION,
                currentPage: page,
                firstPage: firstPage + step <= totalPages - 6 ? firstPage + step
                    : firstPage,
                lastPage: lastPage + step <= totalPages ? lastPage + step
                    : lastPage + 1 <= totalPages ? lastPage + 1
                        : lastPage
            })
        } else if (page <= lastPage - 4) {
            dispatch({
                type: actionTypes.PAGINTATION,                
                currentPage: page,
                firstPage: firstPage - step > 0 ? firstPage - step :
                    firstPage - 1 > 0 ? firstPage - 1 :
                        firstPage,
                lastPage: lastPage - step >= 8 ? lastPage - step
                    : lastPage
            })
        } else {
            dispatch({
                type: actionTypes.PAGINTATION,                
                currentPage: page,
                firstPage: firstPage,
                lastPage: lastPage
            })
        }
    }
}

export const setSortParam = (str) => {
    return {
        type: actionTypes.SET_SORT_PARAM,
        sortParam: str
    }
}

export const setSearchString = (str) => {
    return {
        type: actionTypes.SET_SEARCH_STRING,
        searchString: str
    }
}