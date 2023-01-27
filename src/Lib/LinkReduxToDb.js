import { db } from "./FirebaseConfig";
import { ref, onValue, update, get } from "firebase/database";

export async function writeUserData (userId, userObject) {
    console.log("online?", window.navigator.onLine)
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

export async function getUserData(userId) {
  console.log("in getUserData", userId)
    if (!userId) {
        return console.log("No user Id");
    }
    // getCurrentGradeBook(userId).then(results => console.log(results)) 
    const userRef = ref(db, "/users/" + userId);
    const snapshot = await get(userRef)
    
    console.log("getting user data.", snapshot.val())
    return snapshot.val()
    
}


export async function getCurrentGradeBook(userId) {
  console.log("getting current gb")
  if (!userId) {
      return console.log("No user Id");
  }
  const userRef = ref(db, "/users/" + userId + "/gradebook");
  onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      console.log("getting current gb", data)
      return data;
  });
}
