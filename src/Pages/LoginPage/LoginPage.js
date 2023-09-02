import { connect } from "react-redux"
import React, { useEffect } from "react"
import { updateLogin, updateUserInfo, updateStore } from "../../Redux/actions"
import { db } from "../../Lib/FirebaseConfig"
import { ref, onValue } from "firebase/database"
import jwtDecode from "jwt-decode"

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.signedIn,
    id: state.id,
    name: state.name,
    email: state.email,
    imageUrl: state.userImg,
  }
}

const mapDispatchToProps = {
  updateLogin,
  updateUserInfo,
  updateStore,
}

function LoginPage(props) {
  //destructuring props
  const { isLoggedIn, name, email, imageUrl, updateLogin, updateUserInfo, updateStore } = props
  // fetch current user data from firebase to update redux store when first loading
  function getUserData(userId) {
    if (!userId) {
      return console.log("No user Id")
    }

    const userRef = ref(db, "/users/" + userId)
    onValue(userRef, (snapshot) => {
      const data = snapshot.val()
      //check if user has any saved data
      if (data) {
        // DO NOT USE CODE BELOW UNTIL WRITING TO DB IS REFACTORED OR IT WILL ERRASE DATA
        // ===================================================================
        // updates redux store with user data stored in realtime database from firebase. 
        // if(data?.studentList && data?.studentInfo){

        //   const currentGbStudentList = Object.keys(data.studentList).filter(key => key.includes(data.gradebook))
        //   const filteredStudentList = {}
        //   if(currentGbStudentList.length){
        //     currentGbStudentList.forEach((studentList) => filteredStudentList[studentList] = data.studentList[studentList])
        //   }

        //   const currentGbStudentInfo = Object.keys(data.studentInfo).filter(key => key.includes(data.gradebook))
        //   const filteredStudentInfo = {}
        //   if(currentGbStudentInfo.length){
        //     currentGbStudentInfo.forEach((studentInfo) => filteredStudentInfo[studentInfo] = data.studentInfo[studentInfo])
        //   }

        //   data.studentList = filteredStudentList
        //   data.studentInfo = filteredStudentInfo
        // }
        console.log(data)
        updateStore(data)
      }
      return updateLogin(true)
    })
  }

  function handleCallbackResponse(response) {
    try {
      let encodedToken = response.credential
      let decodedToken = jwtDecode(encodedToken)
      const id = decodedToken.sub
      const name = decodedToken.name
      const email = decodedToken.email
      const imageUrl = decodedToken.picture
      updateUserInfo(id, name, email, imageUrl)
      getUserData(id)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse,
    })
    google.accounts.id.prompt((notification) => {
      if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
        // try next provider if OneTap is not displayed or skipped
        google.accounts.id.renderButton(document.getElementById("signInButton"), { theme: "outlined", shape: "rectangular", type: "standard", size: "large", text: "signin" })
      }
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div className="clipboard">
        <div className="clipboard top"></div>
        <div className="flex-fill">
          <div id="main-title">
            <h2>Coach's Clipboard</h2>
          </div>
          {!isLoggedIn && <div to="/classes" key="signInKey" id="signInButton" />}

          {isLoggedIn && (
            <div className="d-flex flex-column align-items-center mb-3">
              <div>
                <img className="rounded-circle" alt="profile" src={imageUrl} />
              </div>
              <div>{name}</div>
              <div>{email}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
