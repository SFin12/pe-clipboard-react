import { db } from "./FirebaseConfig"
import { ref, onValue, update, get, set } from "firebase/database"

export async function writeUserData(userId, userObject) {
  if( !window.navigator.onLine){
    return "failure"
  }
  else if (ref(db, "/users/" + userId)) {
    const userRef = ref(db, "/users/" + userId)
    // const studentListRef = ref(db, "/users/" + userId + "/studentList")
    // const studentInfoRef = ref(db, "/users/" + userId + "/studentInfo")

    if (userObject) {
      return update(userRef, userObject)
        .then(() => {
  
          return "success"
        })
        .catch((err) => {

          return "failure"
        })
    } else {
      console.error("No userObject")
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
    
          return "success"
        })
        .catch((err) => {
          alert(err)
          return "failure"
        })
    } else {
      console.error("No classInfoObject")
      return "No userObject"
    }
  }
}

export async function updateStudentDetails(userId, gradebookClass, studentListObjectArray) {
  if (ref(db, "/users/" + userId)) {
    const studentListRef = ref(db, "/users/" + userId + "/studentList/" + gradebookClass)

    if (studentListRef) {
      return set(studentListRef, studentListObjectArray)
        .then(() => {
     
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

export async function updateDbCurrentClass(userId, currentClass) {
  if (ref(db, "/users/" + userId)) {
    const currentClassRef = ref(db, "/users/" + userId)
    if (currentClassRef) {
      return update(currentClassRef, currentClass)
        .then(() => {
     
          return "success"
        })
        .catch((err) => {
          alert(err)
          return "failure"
        })
    } else {

      return "No classObject"
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

  const StudentListRef = ref(db, "/users/" + userId + "/StudentList")
  const snapshot = await get(StudentListRef)

  return snapshot.val()
}

export async function getStudentInfo(userId, key) {
  const StudentInfoRef = ref(db, "/users/" + userId + "/StudentInfo/" + key)
  
  const snapshot = await get(StudentInfoRef)

  return snapshot.val()
}

export function getCurrentGradeBook(userId) {

  const userRef = ref(db, "/users/" + userId + "/gradebook")
  onValue(userRef, (snapshot) => {
    const data = snapshot.val()

    return data
  })
}
