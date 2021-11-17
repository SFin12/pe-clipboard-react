import * as ActionTypes from "./actionTypes";
import { baseUrl } from "../shared/baseUrl";


export const updateLogin = (signedIn = false) => ({
    type: ActionTypes.UPDATE_LOGIN,
    payload: {
        signedIn,
    },
});

export const updateUserInfo = (userName, userEmail, userImg) => ({
    type: ActionTypes.UPDATE_USER_INFO,
    payload: {
        userName, userEmail, userImg
    },
});

export const updateGoogleAuth = (googleAuth, gapi) => ({
    type: ActionTypes.UPDATE_GOOGLEAUTH,
    payload: {
        googleAuth,
        gapi
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
    //async fetch to get current gradebook from google api
    
});

export const getGradebookList = () => ({
    type: ActionTypes.GET_GRADEBOOKLIST,
    //async fetch to get list of gradebooks from google api
})

export const deleteGradebook = (gradebookName) => ({
    type: ActionTypes.DELETE_GRADEBOOK,
    payload: {gradebookName}
})

export const createClass = (className) => {
    console.log("creating class name...",className);
    return {
        type: ActionTypes.CREATE_CLASS,
        payload: { className },
    };
};

export const updateClassList = (className) => {
    console.log("updating class list...",className);
    return {
    type: ActionTypes.UPDATE_CLASSES,
    payload: { className },
    }
};

export const getClasses = () => ({
    type: ActionTypes.GET_CLASSES,
    //async fetch to get classes from google api
});

export const deleteClass = (className) => ({
    type: ActionTypes.DELETE_CLASS,
    payload: { className }
})
