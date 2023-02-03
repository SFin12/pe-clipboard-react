import { db } from "./FirebaseConfig"
import { ref, onValue, update, get, set } from "firebase/database"

export async function writeUserData(userId, userObject) {
  console.log("online?", window.navigator.onLine)
  if (ref(db, "/users/" + userId)) {
    const userRef = ref(db, "/users/" + userId)
    // const studentListRef = ref(db, "/users/" + userId + "/studentList")
    // const studentInfoRef = ref(db, "/users/" + userId + "/studentInfo")

    if (userObject) {
      return update(userRef, userObject
      //   {
      //   class: userObject.class,
      //   classList: userObject.classList,
      //   email: userObject.email,
      //   gradebookList: userObject.gradebookList,
      //   gradebook: userObject.gradebook,
      //   name: userObject.name,
      //   settings: userObject.settings,
      //   id: userObject.id,
      //   student: userObject.student,
      //   userImg: userObject.userImg,
      // })
      //   .then(() => {
      //     for(let list in userObject.studentList){
      //       update(studentListRef, {
      //         [list]: userObject.studentList[list]
      //       })
      //     }
      //   }
      //   )
      //   .then(() => {
      //     for(let info in userObject.studentInfo){
      //       update(studentInfoRef, {
      //         [info]: userObject.studentInfo[info]
      //       })
      //     }
      //   }
      )
        .then(() => {
          console.log("database updated")
          return "success"
        })
        .catch((err) => {
          alert(err)
          return "failure"
        })
    } else {
      console.log("No userObject")
      return "No userObject"
    }
  }
}

export async function updateClassInfo(userId, gradebook, classInfoIndex, classInfoObject) {
  if (ref(db, "/users/" + userId)) {
    const classListRef = ref(db, "/users/" + userId + "/classList/" + gradebook + "/" + classInfoIndex)
    
    if (classInfoObject) {
      return update(classListRef, classInfoObject)
        .then(() => {
          console.log("classInfo updated")
          return "success"
        })
        .catch((err) => {
          alert(err)
          return "failure"
        })
    } else {
      console.log("No userObject")
      return "No userObject"
    }
  }
}

export async function updateStudentNumbers(userId, gradebookClass, studentListObjectArray) {
  if (ref(db, "/users/" + userId)) {
    const studentListRef = ref(db, "/users/" + userId + "/studentList/" + gradebookClass)
    
    if (studentListRef) {
      return set(studentListRef, studentListObjectArray)
        .then(() => {
          console.log("Student numbers updated")
          return "success"
        })
        .catch((err) => {
          alert(err)
          return "failure"
        })
    } else {
      console.log("No userObject")
      return "No userObject"
    }
  }
}


export async function getUserData(userId) {
  if (!userId) {
    return console.log("No user Id")
  }
  const userRef = ref(db, "/users/" + userId)
  const snapshot = await get(userRef)

  return snapshot.val()
}

export async function getStudentList(userId) {
  if (!userId) {
    return console.log("No user Id")
  }
  const StudentListRef = ref(db, "/users/" + userId + "/StudentList")
  const snapshot = await get(StudentListRef)

  return snapshot.val()
}

export async function getStudentInfo(userId) {
  if (!userId) {
    return console.log("No user Id")
  }
  const StudentInfoRef = ref(db, "/users/" + userId + "/StudentInfo")
  const snapshot = await get(StudentInfoRef)

  return snapshot.val()
}

export function getCurrentGradeBook(userId) {
  console.log("getting current gb")
  if (!userId) {
    return console.log("No user Id")
  }
  const userRef = ref(db, "/users/" + userId + "/gradebook")
  onValue(userRef, (snapshot) => {
    const data = snapshot.val()
    console.log("getting current gb", data)
    return data
  })
}
