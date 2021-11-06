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

export const createGradebook = (gradebookId, gradebookName) => {
    console.log("creating gradebook...", gradebookId, gradebookName);
    return {
        type: ActionTypes.CREATE_GRADEBOOK,
        payload: { gradebookId: gradebookId, gradebookName: gradebookName },
    };
};

export const updateGradebookList = (gradebookId, gradebookName) => ({
    type: ActionTypes.UPDATE_GRADEBOOKLIST,
    payload: { gradebookId: gradebookId, gradebookName: gradebookName },
});

export const getGradebook = () => ({
    type: ActionTypes.GET_GRADEBOOK,
});
