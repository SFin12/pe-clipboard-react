import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { MainReducer } from "./reducers";

const initialState = {
    signedIn: false,
    id: "",
    name: "",
    email: "",
    userImg: "",
    googleAuth: {},
    currentPage: "Classes",
    gradebook: "",
    gradebookList: [],
    class: "",
    classList: {},
    student: "",
    studentList: {},
    settings: {
        dailyPoints: 10,
        note1: "ND",
        note1Points: -4,
        note2: "NP",
        note2Points: -10,
        note3: "E",
        note3Points: 0,
    },
    studentInfo: { lastSubmission: null },
    totalPoints: {},
    pointsPossible: {},
    gradePercentage: {},
};

export const store = createStore(
    MainReducer,
    initialState,
    applyMiddleware(thunk)
);
