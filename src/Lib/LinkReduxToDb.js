import { db } from "./FirebaseConfig";
import { ref, set, onValue, push, update } from "firebase/database";

export function writeUserData(userId, userObject) {
    if (ref(db, "/users/" + userId)) {
        const userRef = ref(db, "/users/" + userId);
        if (userObject) {
           
            update(userRef, userObject);
     
        }
    }
}

export function getAllData() {}

export function getUserData(userId) {
    if (!userId) {
        return console.log("No user Id");
    }
    const userRef = ref(db, "/users/" + userId);
    onValue(userRef, (snapshot) => {
        const data = snapshot.val();

        return data;
    });
 
}
