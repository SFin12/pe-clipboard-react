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
        note2: "NP",
        note3: "E",
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
