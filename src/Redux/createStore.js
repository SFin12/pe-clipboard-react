import { createStore } from "redux";
import { MainReducer } from "./reducers";

const initialState = {
    signedIn: false,
    currentPage: "Classes",
    gradebookList: []
};

export const store = createStore(MainReducer, initialState);

