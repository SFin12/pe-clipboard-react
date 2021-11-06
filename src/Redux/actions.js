import * as ActionTypes from "./actionTypes";

export const updateLogin = (signedIn = false) => ({
    type: ActionTypes.UPDATE_LOGIN,
    payload: {
        signedIn,
    },
});

export const updatePage = (currentPage = "Classes") => {
    console.log("updatingPage...");
    return {
        type: ActionTypes.UPDATE_PAGE,
        payload: {
            currentPage: currentPage,
        },
    };
};

export const createGradebook = (gradebookName) => {
    console.log("creating gradebook...",gradebookName);
    return {
        type: ActionTypes.CREATE_GRADEBOOK,
        payload: { gradebookName: gradebookName },
    };
};

export const updateGradebookList = (gradebookName) => ({
    type: ActionTypes.UPDATE_GRADEBOOKLIST,
    payload: { gradebookName: gradebookName },
});

export const getGradebook = () => ({
    type: ActionTypes.GET_GRADEBOOK,
    //async fetch to get gradebooks from google api
});
