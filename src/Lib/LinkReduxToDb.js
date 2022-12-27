import { db } from "./FirebaseConfig";
import { ref, onValue, update, get } from "firebase/database";

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

export async function getUserData(userId) {
  console.log("in getUserData", userId)
    if (!userId) {
        return console.log("No user Id");
    }
    // getCurrentGradeBook(userId).then(results => console.log(results)) 
    const userRef = ref(db, "/users/" + userId);
    const snapshot = await get(userRef)
    // onValue(userRef, (snapshot) => {
    //     const data = snapshot.val();
    //     console.log("data in snapshot", data)
    //     if(data) return data    
    //     return null;
    // })
    console.log(snapshot.val())
    return snapshot.val()
    
}
// function getUserData(userId) {
    //     if (!userId) {
    //         return console.log("No user Id");
    //     }
    //     const userRef = ref(db, "/users/" + userId);
    //     onValue(userRef, (snapshot) => {
    //         const data = snapshot.val();

    //         //check if user has any saved data
    //         if (data) {
    //             //updates redux store with user data stored in realtime database from firebase
    //             updateStore(data);
    //         }
    //         // else {
    //         //     writeUserData()
    //         // }
    //         return updateLogin(true);
    //     });
    // }

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
