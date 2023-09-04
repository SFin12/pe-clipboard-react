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
    cleanedGradebook: "",
    gradebookList: [],
    gradebooks: {
      
    },
    class: "",
    classList: {},
    student: "",
    students: [],
    studentList: {},
    settings: {
        alphabetize: false,
        dailyPoints: 10,
        absentPoints: -10,
        tardyPoints: 0,
        note1: "ND",
        note1Points: 0,
        note2: "NP",
        note2Points: 0,
        note3: "E",
        note3Points: 0,
        note4a: "OT",
        note4aPoints: 0,
    },
    studentInfo: {},
    totalPoints: {},
    pointsPossible: {},
    gradePercentage: {},
    dbResponse: "",
};

export const store = createStore(
    MainReducer,
    initialState,
    applyMiddleware(thunk)
);
