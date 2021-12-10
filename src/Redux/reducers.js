import * as ActionTypes from "./actionTypes";

export const MainReducer = (state, action) => {
    //currentGb is used for multiple cases
    const currentGb = state.gradebook;

    console.log("type and payload: ", action.type + ", " + action.payload);
    switch (action.type) {
        case ActionTypes.UPDATE_LOGIN:
            return { ...state, signedIn: action.payload };
        case ActionTypes.UPDATE_USER_INFO:
            return { ...state, ...action.payload };
        case ActionTypes.UPDATE_GOOGLEAUTH:
            return { ...state, googleAuth: action.payload };
        case ActionTypes.UPDATE_PAGE:
            return { ...state, currentPage: action.payload.currentPage };
        case ActionTypes.UPDATE_STORE:
            console.log("updating store: ", action.payload);
            return { ...state, ...action.payload };
        case ActionTypes.CREATE_GRADEBOOK:
            return { ...state, gradebook: action.payload };
        case ActionTypes.UPDATE_GRADEBOOKLIST:
            const gbMatch = action.payload;

            if (!state.gradebookList.some((obj) => obj === gbMatch)) {
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
            console.log("create class payload: ", action.payload);
            return { ...state, class: action.payload };
        case ActionTypes.UPDATE_CLASSES:
            const cMatch = action.payload;

            console.log("currentGb: ", state.classList[currentGb]);
            if (
                state.classList[currentGb] &&
                !state.classList[currentGb].some((obj) => obj === cMatch)
            ) {
                return {
                    ...state,
                    classList: {
                        ...state.classList,
                        [currentGb]: [
                            ...state.classList[currentGb],
                            action.payload,
                        ],
                    },
                };
            } else if (!state.classList.currentGb) {
                console.log("duplicate or first time gradebook");
                return {
                    ...state,
                    classList: {
                        ...state.classList,
                        [currentGb]: [action.payload],
                    },
                };
            }
            return { ...state };

        case ActionTypes.GET_CLASSES:
            return { ...state };
        case ActionTypes.DELETE_CLASS:
            const currentCl = state.classList[currentGb].filter(
                (item) => item !== action.payload
            );
            return {
                ...state,
                classList: { ...state.classList, [currentGb]: currentCl },
            };
        case ActionTypes.UPDATE_STUDENTLIST:
            const sMatch = action.payload;
            const currentClass = state.class;
            console.log("current class: ", state.class);
            if (
                currentClass &&
                !state.classList[currentClass].some((obj) => obj === sMatch)
            ) {
                return {
                    ...state,
                    studentList: {
                        ...state.studentList,
                        [currentClass]: [
                            ...state.studentClass[currentClass],
                            action.payload,
                        ],
                    },
                };
            } else if (!state.studentList[currentClass]) {
                console.log("duplicate or first time class");
                return {
                    ...state,
                    studentList: {
                        ...state.studentList,
                        [currentClass]: [action.payload],
                    },
                };
            }
            return { ...state };
        default:
            console.log("default action type: ", action);
            return state;
    }
};
