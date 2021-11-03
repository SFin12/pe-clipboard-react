import { createStore } from "redux";
import { MainReducer } from "./reducers";

const initialState = {
    signedIn: false,
    currentPage: "Classes",
    gradebookList: [ {gradebookId: "IdTest1", gradebookName: "NameTest1"}, {gradebookId: "IdTest2", gradebookName: "NameTest2"}]
};

export const store = createStore(MainReducer, initialState);

// store.subscribe(() => {
//     console.log("Store is now ", store.getState());
// })
