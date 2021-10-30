import * as ActionTypes from "./actionTypes";



export const updateLogin = (signedIn = false) => ({
    type: ActionTypes.UPDATE_LOGIN,
    payload: {
        signedIn
    }
})

export const updatePage = (currentPage = "Class") => ({
    type: ActionTypes.UPDATE_PAGE,
    payload: {
        currentPage
    }
})

