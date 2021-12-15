import * as ActionTypes from "./actionTypes";

export const updateLogin = (signedIn = false) => ({
    type: ActionTypes.UPDATE_LOGIN,
    payload: {
        signedIn,
    },
});

export const updateUserInfo = (id, name, email, userImg) => ({
    type: ActionTypes.UPDATE_USER_INFO,
    payload: {
        id,
        name,
        email,
        userImg,
    },
});

export const updateGoogleAuth = (googleAuth, gapi) => ({
    type: ActionTypes.UPDATE_GOOGLEAUTH,
    payload: {
        googleAuth,
        gapi,
    },
});

export const updatePage = (currentPage = "Classes") => {
    return {
        type: ActionTypes.UPDATE_PAGE,
        payload: {
            currentPage: currentPage,
        },
    };
};

export const createGradebook = (gradebookName) => {
    return {
        type: ActionTypes.CREATE_GRADEBOOK,
        payload: gradebookName,
    };
};

export const updateGradebookList = (gradebookName) => {
    return {
        type: ActionTypes.UPDATE_GRADEBOOKLIST,
        payload: gradebookName,
    };
};

export const updateStore = (data) => {
 
    return {
        type: ActionTypes.UPDATE_STORE,
        payload: data,
    };
};

export const getGradebookList = () => ({
    type: ActionTypes.GET_GRADEBOOKLIST,
    //async fetch to get list of gradebooks from google api
});

export const deleteGradebook = (gradebookName) => ({
    type: ActionTypes.DELETE_GRADEBOOK,
    payload: gradebookName,
});

export const createClass = (className) => {
   
    return {
        type: ActionTypes.CREATE_CLASS,
        payload: className,
    };
};

export const updateClassList = (className) => {
    return {
        type: ActionTypes.UPDATE_CLASSES,
        payload: className,
    };
};

export const getClasses = () => ({
    type: ActionTypes.GET_CLASSES,
    //async fetch to get classes from google api
});

export const deleteClass = (className) => ({
    type: ActionTypes.DELETE_CLASS,
    payload: className,
});

export const createStudent = (student) => {
   
    return {
        type: ActionTypes.CREATE_STUDENT,
        payload: student,
    };
};

export const updateStudentList = (arrayStudentNames) => {
    console.log("updating Student List: ", typeof(arrayStudentNames))
    return {
        type: ActionTypes.UPDATE_STUDENTLIST,
        payload: arrayStudentNames,
    };
};
