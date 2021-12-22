import * as ActionTypes from "./actionTypes";

export const MainReducer = (state, action) => {
    //currentGb and currentClass are used for multiple cases
    const currentGb = state.gradebook;
    const currentClass = state.class;

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
            //If one student is being added, check if the name already exists. If so, don't add.
            console.log("smach length: ", sMatch.length);
            if (
                sMatch.length === 1 &&
                state.studentList[currentGb + "-" + currentClass] &&
                state.studentList[currentGb + "-" + currentClass].some(
                    (student) => student === sMatch
                )
            ) {
                return { ...state };
            }

            if (state.studentList[currentGb + "-" + currentClass]) {
                return {
                    ...state,
                    studentList: {
                        ...state.studentList,
                        [currentGb + "-" + currentClass]: [
                            ...state.studentList[
                                currentGb + "-" + currentClass
                            ],
                            ...action.payload,
                        ],
                    },
                };
            }

            if (!state.studentList[currentGb + "-" + currentClass]) {
                console.log("duplicate or first time class");
                return {
                    ...state,
                    studentList: {
                        ...state.studentList,
                        [currentGb + "-" + currentClass]: [...action.payload],
                    },
                };
            }
            console.log("not able to add student");
            return { ...state };
        default:
            console.log("default action type: ", action);
            return state;
    }
};
