// Import the functions you need from the SDKs you need
import { initializeApp } from "@firebase/app";
import { getDatabase } from "@firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyDvp9oidWEwc30gLlAabcc7pjOtq10wEU8",
//     authDomain: "pe-clipboard-3391b.firebaseapp.com",
//     projectId: "pe-clipboard-3391b",
//     storageBucket: "pe-clipboard-3391b.appspot.com",
//     messagingSenderId: "799915580717",
//     appId: "1:799915580717:web:7e7048202d010d1fcfc7a4",
//     measurementId: "G-EM25E400GB",
//     databaseURL: "https://pe-clipboard-3391b-default-rtdb.firebaseio.com/",
// };
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
