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
    student:"",
    studentList: {}
};

export const store = createStore(
    MainReducer,
    initialState,
    applyMiddleware(thunk)
);
