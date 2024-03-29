import * as ActionTypes from "./actionTypes";

export const updateLogin = (signedIn = false) => ({
    type: ActionTypes.UPDATE_LOGIN,
    payload: {
        signedIn,
    },
});

export const updateUserInfo = (id, name, email, userImg) => ({
    type: ActionTypes.UPDATE_USER_INFO,
    payload: {
        id,
        name,
        email,
        userImg,
    },
});

export const updateGoogleAuth = (googleAuth, gapi) => ({
    type: ActionTypes.UPDATE_GOOGLEAUTH,
    payload: {
        googleAuth,
        gapi,
    },
});

export const updatePage = (currentPage = "Classes") => {
    return {
        type: ActionTypes.UPDATE_PAGE,
        payload: {
            currentPage: currentPage,
        },
    };
};

export const createGradebook = (gradebookName) => {
    return {
        type: ActionTypes.CREATE_GRADEBOOK,
        payload: gradebookName,
    };
};
export const updateCleanGradebook = (cleanGradebookName) => {
    return {
        type: ActionTypes.UPDATE_CLEAN_GRADEBOOK,
        payload: cleanGradebookName,
    };
};

export const updateGradebookList = (gradebookName) => {
    return {
        type: ActionTypes.UPDATE_GRADEBOOKLIST,
        payload: gradebookName,
    };
};

export const updateStore = (data) => {
    return {
        type: ActionTypes.UPDATE_STORE,
        payload: data,
    };
};

export const getGradebookList = () => ({
    type: ActionTypes.GET_GRADEBOOKLIST,
    //async fetch to get list of gradebooks from google api
});

export const deleteGradebook = (gradebookName) => ({
    type: ActionTypes.DELETE_GRADEBOOK,
    payload: gradebookName,
});

export const createClass = (className) => {
    return {
        type: ActionTypes.CREATE_CLASS,
        payload: className,
    };
};

export const updateClassList = (className) => {
    return {
        type: ActionTypes.UPDATE_CLASSES,
        payload: className,
    };
};

export const deleteClass = (className) => ({
    type: ActionTypes.DELETE_CLASS,
    payload: className,
});


export const createStudent = (studentObj) => {
  return {
  type: ActionTypes.CREATE_STUDENT,
  payload: studentObj
  }
}

export const updateStudentList = (arrayStudentNames) => {
    //sorts student names by removing commas then replacing.
    const sortedStudentNamesArr = arrayStudentNames
        .map((n) => {
            const capitalized = n[0].toUpperCase() + n.slice(1);
            return capitalized.replace(/[,.]/g, "");
            
        })
        .map((n) => {
          n.replace(" ", ", ")
          return {gender:"", name: n, number:"", group:"", email:"", phone:"", pacer: "", mileResults:"", mileRun:"", pushUps:"", curlUps: "", trunkLift:"", shoulderLeft: "", shoulderRight:"", sitReachLeft: "", sitReachRight:"", height: "", weight:"", notes: ""}
        });
   
    return {
        type: ActionTypes.UPDATE_STUDENTLIST,
        payload: sortedStudentNamesArr,
    };
};

export const deleteRoster = () => {

    return {
        type: ActionTypes.DELETE_ROSTER,
        payload: [],
    };
};

export const deleteStudent = (student) => {

    return {
        type: ActionTypes.DELETE_STUDENT,
        payload: student,
    };
};

export const updateSpecificStudentInfo = (SingleSubmissionObject, date, student) => {
  return {
      type: ActionTypes.UPDATE_STUDENT_INFO,
      date: date,
      student:student,
      payload: SingleSubmissionObject,
  };
};

export const updateStudentInfo = (studentInfoObj, date) => {
    return {
        type: ActionTypes.UPDATE_STUDENT_INFO,
        date: date,
        payload: studentInfoObj,
    };
};

export const updateOldStudentInfo = (studentInfoObj) => {
  return {
    type: ActionTypes.UPDATE_OLD_STUDENT_INFO,
    payload: studentInfoObj,
};
}

export const updateAttendance = (attendanceObj) => {
    return {
        type: ActionTypes.UPDATE_ATTENDANCE,
        payload: attendanceObj,
    };
};

export const updateSettings = (settingsObj) => {
    
    return {
        type: ActionTypes.UPDATE_SETTINGS,
        payload: settingsObj,
    };

  };

export const updateDbResponse = (response) => {
  return {
    type: ActionTypes.UPDATE_DB_RESPONSE,
    payload: response, // response should be a string with "success" or "failure"
  }
};

