import { sortArrayOfObjects } from "../utils/utilities"
import * as ActionTypes from "./actionTypes"

export const MainReducer = (state, action) => {
  //currentGb and currentClass are used for multiple cases
  const uncleanCurrentGb = state.gradebook
  const currentGb = uncleanCurrentGb.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, " ")
  const uncleanCurrentClass = state.class
  const currentClass = uncleanCurrentClass.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, " ")
  switch (action.type) {
    //DATABASE RESPONSE FLAG------------------------------------------------------------
    case ActionTypes.UPDATE_DB_RESPONSE:
      return { ...state, dbResponse: action.payload }
    //USER INFO-------------------------------------------------------------------------
    case ActionTypes.UPDATE_LOGIN:
      return { ...state, signedIn: action.payload }
    case ActionTypes.UPDATE_USER_INFO:
      return { ...state, ...action.payload }
    case ActionTypes.UPDATE_GOOGLEAUTH:
      return { ...state, googleAuth: action.payload }

    //CURRENT PAGE----------------------------------------------------------------------
    case ActionTypes.UPDATE_PAGE:
      return { ...state, currentPage: action.payload.currentPage }

    //UPDATE REDUX STORE FROM DATABASE--------------------------------------------------
    case ActionTypes.UPDATE_STORE:
      console.log("updating redux store...")
      return { ...state, ...action.payload }

    //UPDATE SETTINGS-------------------------------------------------------------------
    case ActionTypes.UPDATE_SETTINGS:
      return { ...state, settings: action.payload }

    //GRADEBOOK-------------------------------------------------------------------------
    case ActionTypes.CREATE_GRADEBOOK:
      return { ...state, gradebook: action.payload, gradebooks: { ...state.gradebooks, [action.payload]: {} }}
    case ActionTypes.UPDATE_CLEAN_GRADEBOOK:
      return { ...state, cleanGradebook: action.payload }
    case ActionTypes.UPDATE_GRADEBOOKLIST:
      const gbMatch = action.payload
      if (!state.gradebookList.some((obj) => obj === gbMatch)) {
        return {
          ...state,
          gradebookList: [...state.gradebookList, action.payload],
        }
      } else {
        return { ...state }
      }
    case ActionTypes.DELETE_GRADEBOOK:
      const updatedGradebooList = state.gradebookList.filter((gradebook) => gradebook !== action.payload)
      return { ...state, gradebookList: updatedGradebooList }

    //CLASSES---------------------------------------------------------------------------
    case ActionTypes.CREATE_CLASS:
      return { ...state, class: action.payload }
    case ActionTypes.UPDATE_CLASSES:
      const cMatch = action.payload
      if (state.classList[currentGb] && !state.classList[currentGb].some((obj) => obj.name === cMatch.name)) {
        return {
          ...state,
          classList: {
            ...state.classList,
            [currentGb]: [...state.classList[currentGb], action.payload].sort((a, b) => {
              if (a.name > b.name) return 1
              if (a.name < b.name) return -1
              return 0
            }),
          },
        }
      } else if (!state.classList.currentGb) {
        console.log("duplicate or first time gradebook")
        return {
          ...state,
          classList: {
            ...state.classList,
            [currentGb]: [action.payload],
          },
        }
      }
      return { ...state }
    case ActionTypes.DELETE_CLASS:
      const currentCl = state.classList[currentGb].filter((item) => item.name !== action.payload)
      // cleans class name to pair with gradebook to find the key in studenList to delete
      const classToDelete = action.payload.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, " ")
      const classKey = currentGb + "-" + classToDelete
      const filterObj = () => {
        const keys = Object.keys(state.studentList)
        return keys.filter((key) => key !== classKey)
      }
      const filteredArr = filterObj()
      // creates gradebook-class keys and values (students) without deleted class.
      const filteredObj = {}
      for (let key of filteredArr) {
        filteredObj[key] = state.studentList[key]
      }

      return {
        ...state,
        classList: {
          // Creates array of classes left after deletion.
          ...state.classList,
          [currentGb]: currentCl,
        },
        // Replaces old classes and rosters with new classes / rosters without deleted class.
        studentList: { ...filteredObj },
      }

    //STUDENTS---------------------------------------------------------------------------
    case ActionTypes.CREATE_STUDENT:
      return {
        ...state,
        students: [...state.students, action.payload],
      }
    case ActionTypes.UPDATE_STUDENTLIST:
      const sMatch = action.payload
      //If one student is being added, check if the name already exists. If so, don't add.
      if (sMatch.length === 1 && state.studentList[currentGb + "-" + currentClass] && state.studentList[currentGb + "-" + currentClass].some((student) => student.name === sMatch[0].name)) {
        return { ...state }
      }

      if (state.studentList[currentGb + "-" + currentClass]) {
        return {
          ...state,
          studentList: {
            ...state.studentList,
            [currentGb + "-" + currentClass]: [...state.studentList[currentGb + "-" + currentClass], ...action.payload].sort(),
          },
        }
      }
      if (!state.studentList[currentGb + "-" + currentClass]) {
        return {
          ...state,
          studentList: {
            ...state.studentList,
            [currentGb + "-" + currentClass]: [...action.payload].sort(),
          },
        }
      }
      console.log("not able to add student")
      return { ...state }
    case ActionTypes.DELETE_ROSTER:
      if (state.studentList[currentGb + "-" + currentClass]) {
        return {
          ...state,
          studentList: {
            ...state.studentList,
            [currentGb + "-" + currentClass]: [],
          },
        }
      }
      return { ...state }
    case ActionTypes.DELETE_STUDENT:
      return {
        ...state,
        studentList: {
          ...state.studentList,
          [currentGb + "-" + currentClass]: state.studentList[currentGb + "-" + currentClass].filter((student) => {
            return student.name !== action.payload
          }),
        },
      }

    //STUDENT INFO (GRADES,NOTES,ATTENDANCE)----------------------------------------------
    case ActionTypes.UPDATE_STUDENT_INFO:
      const date = action.date
      if (state.studentInfo[currentGb + "-" + currentClass]) {
        const thisClass = state.studentInfo[currentGb + "-" + currentClass]

        //check if current date already has an entry. If so, write over it.

        // If user submits studentInfo (grades, attendance, notes) the same day, replace previous submission
        if (date === thisClass.dateLastSubmitted) {
          console.log("date === date last submitted")
          // Each key is the name of a student
          Object.keys(action.payload).forEach((key) => {
            // If the student exists...
            if (thisClass[key]) {
              thisClass[key] = [
                // The slice is removing last submission and adding updated submission
                ...thisClass[key].slice(0, -1),
                ...action.payload[key],
              ]
            } else {
              thisClass[key] = [...action.payload[key]]
            }
            thisClass[key].sort((a,b) => sortArrayOfObjects(a.date, b.date))
          })
          
          return {
            ...state,
            studentInfo: {
              ...state.studentInfo,
              [currentGb + "-" + currentClass]: {
                ...thisClass,
                dateLastSubmitted: date,
                totalPoints: state.studentInfo[currentGb + "-" + currentClass].totalPoints,
              },
            },
          }
          // If it's a new day, create a new submission
        } else if (date > thisClass.dateLastSubmitted) {
          console.log("date greater than last submitted")
          Object.keys(action.payload).forEach((key) => {
            // if student already exists...
            if (thisClass[key]) {
              thisClass[key] = [...thisClass[key], ...action.payload[key]]
            } else {
              thisClass[key] = [...action.payload[key]]
            }
          })
          return {
            ...state,
            studentInfo: {
              ...state.studentInfo,
              [currentGb + "-" + currentClass]: {
                ...thisClass,
                dateLastSubmitted: date,
                totalPoints: state.studentInfo[currentGb + "-" + currentClass].totalPoints + state.settings.dailyPoints,
              },
            },
          }
        } else if (date < thisClass.dateLastSubmitted) {
          // if no students have an entry from this date, it is a new entry and daily points should be added to totalPoints.
          let newEntry = true
          // Each key is the name of a student
          Object.keys(action.payload).forEach((key) => {
            // If the student exists...
            if (thisClass[key]) {
              const matchingDate = thisClass[key].findIndex((entry) => entry?.date === date)
              if (matchingDate >= 0) {
                newEntry = false

                thisClass[key][matchingDate] = action.payload[key][0]
              } else {
                thisClass[key] = [...action.payload[key], ...thisClass[key]]
              }
            }
            thisClass[key].sort((a,b) => sortArrayOfObjects(a.date, b.date))
          })
          if (newEntry) {
            thisClass.totalPoints = state.studentInfo[currentGb + "-" + currentClass].totalPoints + state.settings.dailyPoints
          }
          return {
            ...state,
            studentInfo: {
              ...state.studentInfo,
              [currentGb + "-" + currentClass]: {
                ...thisClass,
              },
            },
          }
        } else {
          console.log("didn't fall detect date correctly")
          return { ...state }
        }
      }
      // If this is the first submission for a class...
      return {
        ...state,
        studentInfo: {
          ...state.studentInfo,
          [currentGb + "-" + currentClass]: {
            ...action.payload,
            dateLastSubmitted: date,
            totalPoints: state.settings.dailyPoints,
          },
        },
      }
    case ActionTypes.UPDATE_OLD_STUDENT_INFO:
      return {
        ...state,
        studentInfo: {
          ...state.studentInfo,
          [currentGb + "-" + currentClass]: action.payload,
        },
      }
    //DEFAULT-----------------------------------------------------------------------------
    default:
      console.log("default reducer")
      return state
  }
}
