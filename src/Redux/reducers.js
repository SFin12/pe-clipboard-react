import * as ActionTypes from "./actionTypes";

export const MainReducer = (state, action) => {
    //currentGb and currentClass are used for multiple cases
    const uncleanCurrentGb = state.gradebook;
    const currentGb = uncleanCurrentGb.replace(
        /[.,/#!$%^&*;:{}=\-_`~()]/g,
        " "
    );
    const uncleanCurrentClass = state.class;
    const currentClass = uncleanCurrentClass.replace(
        /[.,/#!$%^&*;:{}=\-_`~()]/g,
        " "
    );
    console.log("reducer payload: ", action.payload + " " + action.type);
    switch (action.type) {
        //USER INFO------------------------------------------------------------------------
        case ActionTypes.UPDATE_LOGIN:
            return { ...state, signedIn: action.payload };
        case ActionTypes.UPDATE_USER_INFO:
            return { ...state, ...action.payload };
        case ActionTypes.UPDATE_GOOGLEAUTH:
            return { ...state, googleAuth: action.payload };

        //CURRENT PAGE----------------------------------------------------------------------
        case ActionTypes.UPDATE_PAGE:
            return { ...state, currentPage: action.payload.currentPage };

        //UPDATE REDUX STORE FROM DATABASE--------------------------------------------------
        case ActionTypes.UPDATE_STORE:
            console.log("updating store: ", action.payload);
            return { ...state, ...action.payload };

        //UPDATE SETTINGS-------------------------------------------------------------------
        case ActionTypes.UPDATE_SETTINGS:
            return { ...state, settings: action.payload };

        //GRADEBOOK-------------------------------------------------------------------------
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
        case ActionTypes.DELETE_GRADEBOOK:
            return { ...state };

        //CLASSES---------------------------------------------------------------------------
        case ActionTypes.CREATE_CLASS:
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
        case ActionTypes.DELETE_CLASS:
            const currentCl = state.classList[currentGb].filter(
                (item) => item !== action.payload
            );
            // cleans class name to pair with gradebook to find the key in studenList to delete
            const classToDelete = action.payload.replace(
                /[.,/#!$%^&*;:{}=\-_`~()]/g,
                " "
            );
            const classKey = currentGb + "-" + classToDelete;
            const filterObj = () => {
                const keys = Object.keys(state.studentList);
                return keys.filter((key) => key !== classKey);
            };
            const filteredArr = filterObj();
            const filteredObj = {};
            for (let key of filteredArr) {
                filteredObj[key] = [state.studentList[key]];
            }
            return {
                ...state,
                classList: {
                    ...state.classList,
                    [currentGb]: currentCl,
                },
                studentList: { ...filteredObj },
            };

        //STUDENTS---------------------------------------------------------------------------
        case ActionTypes.UPDATE_STUDENTLIST:
            const sMatch = action.payload;
            //If one student is being added, check if the name already exists. If so, don't add.

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
        case ActionTypes.DELETE_ROSTER:
            if (state.studentList[currentGb + "-" + currentClass]) {
                return {
                    ...state,
                    studentList: {
                        ...state.studentList,
                        [currentGb + "-" + currentClass]: [],
                    },
                };
            }
            return { ...state };
        case ActionTypes.DELETE_STUDENT:
            return {
                ...state,
                studentList: {
                    ...state.studentList,
                    [currentGb + "-" + currentClass]: state.studentList[
                        currentGb + "-" + currentClass
                    ].filter((student) => {
                        return student !== action.payload;
                    }),
                },
            };

        //STUDENT INFO (GRADES,NOTES,ATTENDANCE)---------------------------------------------
        case ActionTypes.UPDATE_STUDENT_INFO:
            const date = action.date;

            if (state.studentInfo[currentGb + "-" + currentClass]) {
                const thisClass =
                    state.studentInfo[currentGb + "-" + currentClass];

                //check if current date already has an entry. If so, write over it.

                // If user submits studentInfo (grades, attendance, notes) the same day, replace previous submission
                if (date === thisClass.dateLastSubmitted) {
                    // Each key is the name of a student
                    Object.keys(action.payload).forEach((key) => {
                        // If the student exists...
                        if (thisClass[key]) {
                            thisClass[key] = [
                                // The slice is removing last submission and adding updated submission
                                ...thisClass[key].slice(0, -1),
                                ...action.payload[key],
                            ];
                        } else {
                            thisClass[key] = [...action.payload[key]];
                        }
                    });
                    return {
                        ...state,
                        studentInfo: {
                            ...state.studentInfo,
                            [currentGb + "-" + currentClass]: {
                                ...thisClass,
                                dateLastSubmitted: date,
                            },
                        },
                    };
                } else {
                    Object.keys(action.payload).forEach((key) => {
                        if (thisClass[key]) {
                            thisClass[key] = [
                                ...thisClass[key],
                                ...action.payload[key],
                            ];
                        } else {
                            thisClass[key] = [...action.payload[key]];
                        }
                    });
                    return {
                        ...state,
                        studentInfo: {
                            ...state.studentInfo,
                            [currentGb + "-" + currentClass]: {
                                ...thisClass,
                                dateLastSubmitted: date,
                            },
                        },
                    };
                }
            }
            return {
                ...state,
                studentInfo: {
                    ...state.studentInfo,
                    [currentGb + "-" + currentClass]: {
                        ...action.payload,
                        dateLastSubmitted: date,
                    },
                },
            };

        //DEFAULT-----------------------------------------------------------------------------
        default:
            console.log("default reducer");
            return state;
    }
};
