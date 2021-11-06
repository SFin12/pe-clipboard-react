import * as ActionTypes from "./actionTypes";

export const MainReducer = (state, action) => {
    console.log("main reducer: ", action);
    switch (action.type) {
        case ActionTypes.UPDATE_LOGIN:
            const signedIn = !action.payload.signedIn;
            console.log("signed in? : " + signedIn);
            return { ...state, signedIn: signedIn };
        case ActionTypes.UPDATE_PAGE:
            return { ...state, currentPage: action.payload.currentPage };
        case ActionTypes.CREATE_GRADEBOOK:
            console.log("reducer-create-gb", action.payload);
            return { ...state, gradebook: action.payload };
        case ActionTypes.UPDATE_GRADEBOOKLIST:
            const match = action.payload.gradebookName;
            console.log("match: ", match);
            if (
                !state.gradebookList.some((obj) => obj.gradebookName === match)
            ) {
                console.log("adding gb to list... ",
                    !state.gradebookList.some(
                        (obj) => obj.gradebookName === match
                    )
                );
                return {
                    ...state,
                    gradebookList: [...state.gradebookList, action.payload],
                };
            } else {
                console.log(
                    !state.gradebookList.some(
                        (obj) => obj.gradebookName === match
                    )
                );
                return {...state};
            }
        case ActionTypes.GET_GRADEBOOK:
            return { ...state };
        default:
            console.log("default action type: ", action);
            return state;
    }
};
