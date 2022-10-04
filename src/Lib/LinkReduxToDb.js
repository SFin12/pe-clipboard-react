import { db } from "./FirebaseConfig";
import { ref, onValue, update } from "firebase/database";

export async function writeUserData (userId, userObject) {
    if (ref(db, "/users/" + userId)) {
      
        const userRef = ref(db, "/users/" + userId);
        if (userObject) {
          
            return update(userRef, userObject)
                .then(() => {
                    console.log("database updated");
                    return ('success')
                })
                .catch((err) => {
                    alert(err);
                    return ('failure')
                });
            
        }
        
        else {
          console.log("No userObject")
          return 'No userObject'
        }
    }
}

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
