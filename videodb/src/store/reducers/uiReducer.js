import * as actionTypes from '../actionTypes';

const initialState = {
    layoutType: '',
    sortParam: '',
    searchString: '',
    firstPage: 1,
    lastPage: 8,
    currentPage: 1
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_LAYOUT_TYPE:
            return {
                ...state,
                layoutType: action.layoutType
            }
        case actionTypes.PAGINTATION:
            return {
                ...state,
                currentPage: action.currentPage,
                firstPage: action.firstPage,
                lastPage: action.lastPage
            }
        case actionTypes.SET_SORT_PARAM:
            return {
                ...state,
                sortParam: action.sortParam
            }
        case actionTypes.SET_SEARCH_STRING:
            return {
                ...state,
                searchString: action.searchString
            }
        default:
            return state;
    }
}

export default reducer;