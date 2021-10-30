import React, { Component } from 'react';
import { createStore } from 'redux';
import { MainReducer } from './reducers';

const initialState = {
    signedIn: false,
    currentPage: "Classes"
}


export const store = createStore(MainReducer, initialState);



// store.subscribe(() => {
//     console.log("Store is now ", store.getState());
// })

