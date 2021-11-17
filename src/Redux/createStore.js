import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { MainReducer } from "./reducers";

const initialState = {
    signedIn: false,
    userInfo: {userName: "", userEmail: "", userImg: "" },
    googleAuth: {},
    currentPage: "Classes",
    gradebook:{},
    gradebookList: [],
    class:{},
    classList:[],

};

export const store = createStore(MainReducer, initialState, applyMiddleware(thunk));

