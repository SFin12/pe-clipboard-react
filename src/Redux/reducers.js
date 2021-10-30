import * as ActionTypes from "./actionTypes";




export const MainReducer = (state, action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_LOGIN:
            const update = action.payload;
            return {...state, signedIn: action.payload}
        case ActionTypes.UPDATE_PAGE:
            return {...state, currentPage: action.payload}
        default:
            return state;
    }
};