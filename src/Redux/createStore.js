import { createStore } from "redux";
import { MainReducer } from "./reducers";

const initialState = {
    signedIn: false,
    currentPage: "Classes",
    gradebook:{},
    gradebookList: [],
    class:{},
    classList:[],
};

export const store = createStore(MainReducer, initialState);

