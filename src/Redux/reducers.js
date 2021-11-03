import * as ActionTypes from "./actionTypes";

export const MainReducer = (state, action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_LOGIN:
            const signedIn = !action.payload.signedIn;
            console.log("signed in? : " + signedIn);
            return { ...state, signedIn: signedIn };
        case ActionTypes.UPDATE_PAGE:
            return { ...state, currentPage: action.payload.currentPage };
        case ActionTypes.CREATE_GRADEBOOK:
            return { ...state, gradebook: action.payload}
        case ActionTypes.UPDATE_GRADEBOOKLIST:
            return { ...state, gradebooklist: [...state.gradebooklist, action.payload]}
        case ActionTypes.GET_GRADEBOOK: 
            return { ...state };
        default:
            return state;
    }
};
