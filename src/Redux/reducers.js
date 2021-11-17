import * as ActionTypes from "./actionTypes";

export const MainReducer = (state, action) => {
    console.log("main reducer: ", action);
    switch (action.type) {
        case ActionTypes.UPDATE_LOGIN:
            console.log("signed in? : " + action.payload);
            return { ...state, signedIn: action.payload };
        case ActionTypes.UPDATE_USER_INFO:
            return { ...state, userInfo: action.payload };
        case ActionTypes.UPDATE_GOOGLEAUTH:
            return { ...state, googleAuth: action.payload};
        case ActionTypes.UPDATE_PAGE:
            return { ...state, currentPage: action.payload.currentPage };
        case ActionTypes.CREATE_GRADEBOOK:
            console.log("reducer-create-gb", action.payload);
            return { ...state, gradebook: action.payload };
        case ActionTypes.UPDATE_GRADEBOOKLIST:
            const gbMatch = action.payload.gradebookName;
            if (
                !state.gradebookList.some(
                    (obj) => obj.gradebookName === gbMatch
                )
            ) {
                return {
                    ...state,
                    gradebookList: [...state.gradebookList, action.payload],
                };
            } else {
                return { ...state };
            }
        case ActionTypes.GET_GRADEBOOK:
            return { ...state };
        case ActionTypes.DELETE_GRADEBOOK:
            return { ...state };

        case ActionTypes.CREATE_CLASS:
            return { ...state, class: action.payload };
        case ActionTypes.UPDATE_CLASSES:
            console.log("updating class list: ", action.payload);
            const cMatch = action.payload.className;
            if (!state.classList.some((obj) => obj.className === cMatch)) {
                console.log("No duplicate classes found: ", action.payload);
                return {
                    ...state,
                    classList: [...state.classList, action.payload],
                };
            } else {
                return { ...state };
            }
        case ActionTypes.GET_CLASSES:
            return { ...state };
        case ActionTypes.DELETE_CLASS:
            return { ...state };

        default:
            console.log("default action type: ", action);
            return state;
    }
};
