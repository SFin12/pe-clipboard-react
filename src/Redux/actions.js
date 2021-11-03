import * as ActionTypes from "./actionTypes";



export const updateLogin = (signedIn = false) => ({
    type: ActionTypes.UPDATE_LOGIN,
    payload: {
        signedIn
    }
})

export const updatePage = (currentPage = "Classes") => ({
    type: ActionTypes.UPDATE_PAGE,
    payload: {
        currentPage
    }
})

export const createGradebook = (gradebookId, gradebookName) => ({
    type: ActionTypes.CREATE_GRADEBOOK,
    payload: {gradebookId, gradebookName}
})

export const updateGradebookList = (gradebookId, gradebookName) => ({
    type: ActionTypes.UPDATE_GRADEBOOKLIST,
    payload: {gradebookId, gradebookName}
})

export const getGradebook = () => ({
    type: ActionTypes.GET_GRADEBOOK,
})

