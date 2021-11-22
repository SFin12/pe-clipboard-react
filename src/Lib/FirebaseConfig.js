// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import { getDatabase } from "@firebase/database";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDvp9oidWEwc30gLlAabcc7pjOtq10wEU8",
    authDomain: "pe-clipboard-3391b.firebaseapp.com",
    projectId: "pe-clipboard-3391b",
    storageBucket: "pe-clipboard-3391b.appspot.com",
    messagingSenderId: "799915580717",
    appId: "1:799915580717:web:7e7048202d010d1fcfc7a4",
    measurementId: "G-EM25E400GB",
    databaseURL: "https://pe-clipboard-3391b-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);


