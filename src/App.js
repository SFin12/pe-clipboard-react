import "./App.scss"
import { Route, Routes } from "react-router"
import ClassesPage from "./Pages/ClassesPage/ClassesPage"
import GradebookPage from "./Pages/GradebookPage/GradebookPage"
import StudentsPage from "./Pages/ClassesPage/StudentsPage/StudentsPage"
import RosterPage from "./Pages/ClassesPage/RosterPage/RosterPage"
import { InfoPage } from "./Pages/InfoPage/InfoPage"
import SettingsPage from "./Pages/SettingsPage/SettingsPage"
import StudentInfoPage from "./Pages/ClassesPage/StudentInfoPage/StudentInfoPage"
import React from "react"
import NavMenu from "./components/NavMenu/NavMenu"
import { withRouter } from "./components/withRouter"
import { connect } from "react-redux"
import { updatePage, updateDbResponse } from "./Redux/actions"
import { writeUserData } from "./Lib/LinkReduxToDb"
import SuccessModal from "./components/SuccessModal"
import isEqual from "lodash.isequal"
import FailureModal from "./components/FailureModal"
import LoginPage from "./Pages/LoginPage/LoginPage"
import ClassDetailsPage from "./Pages/ClassesPage/StudentsPage/ClassDetailsPage/ClassDetailsPage"
import EditStudentInfoPage from "./Pages/ClassesPage/StudentInfoPage/EditStudentInfoPage"

const mapStateToProps = (state) => ({
  signedIn: state.signedIn,
  id: state.id,
  email: state.email,
  name: state.name,
  userImg: state.userImg,
  gradebook: state.gradebook,
  cleanGradebook: state.gradebook,
  gradebookList: state.gradebookList,
  classList: state.classList,
  class: state.class,
  student: state.student,
  studentList: state.studentList,
  studentInfo: state.studentInfo,
  settings: state.settings,
})

const mapDispatchToProps = {
  updatePage,
  updateDbResponse,
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      navOpen: true,
    }
    this.state = {
      showSuccessModal: false,
      showFailureModal: false,
    }
  }
  componentDidMount() {
    !this.props.gradebook && this.props.updatePage("Gradebook")
  }

  componentDidUpdate(prevProps) {
    // check on previous state
    // only write when it's different with the new state
    if(!window.navigator.onLine){
      console.log("Not online")
    }
    
    if (
      (this.props.signedIn && prevProps.id !== this.props.id) ||
      prevProps.gradebook !== this.props.gradebook ||
      prevProps.gradebookList !== this.props.gradebookList ||
      prevProps.classList !== this.props.classList ||
      prevProps.cleanGradebook !== this.props.cleanGradebook ||
      prevProps.studentList !== this.props.studentList ||
      prevProps.studentInfo !== this.props.studentInfo ||
      prevProps.settings !== this.props.settings
    ) 
    
    {
      const userObject = {
        id: this.props.id,
        name: this.props.name,
        email: this.props.email,
        userImg: this.props.userImg,
        gradebook: this.props.gradebook,
        cleanGradebook: this.props.cleanGradebook,
        gradebookList: this.props.gradebookList,
        classList: this.props.classList,
        class: this.props.class,
        student: this.props.student,
        studentList: this.props.studentList,
        studentInfo: this.props.studentInfo,
        settings: this.props.settings,
      }
      
      // if there is a user write the above props to firebase
      if (this.props.id) {
       
    
        writeUserData(this.props.id, userObject).then((response) => {
     
          // clearTimeout(timeout)
        
          if (!isEqual(prevProps.studentInfo, this.props.studentInfo))
            if (response === "success") {
              this.setState({ showSuccessModal: true })
              setTimeout(() => {
                this.setState({ showSuccessModal: false })
              }, 3000)
            } else {
              
              this.setState({ showFailureModal: true })
              setTimeout(() => {
                this.setState({ showFailureModal: false })
              }, 3000)
            }
        }).catch(err => {
          alert(err)
          this.setState({ showFailureModal: true })
              setTimeout(() => {
                this.setState({ showFailureModal: false })
              }, 3000)
        })
        
      }
    }
  }

  closeNavbar() {
    this.setState({
      navOpen: false,
    })
  }

  render() {
    return (
      //Check if user is signed in, if so, render navbar
      <div className="App">
        {this.props.signedIn ? (
          <React.Fragment>
            <NavMenu navOpen={this.state.navOpen} />
            <main className="container">
              {this.props.currentPage !== "Classes" &&
              <>
              <SuccessModal showSuccess={this.state.showSuccessModal} title="Saved" messageString="Information updated." />
              <FailureModal showFailure={this.state.showFailureModal} title="Save Failed" messageString="Please try again later." />
              </>
        }
              <Routes>
                {/* If no gradebook is found, start on gradebook page otherwise
                                start on class page. */}

                <Route // Starting page after login. Takes user to their classes unless there is no gradebook created or selected
                  path="/"
                  element={!this.props.gradebook ? <InfoPage /> : <ClassesPage />}
                />
                <Route // This only appears if a gradebook has been chosen and allows users to create and access classes
                  path="/classes"
                  element={<ClassesPage />}
                />
                <Route // This is where user can create or change gradebooks
                  path="/gradebook"
                  element={<GradebookPage />}
                />
                <Route path="/info" element={<InfoPage />} />

                <Route // Allows user to change notes and other settings.
                  path="/settings"
                  element={<SettingsPage />}
                />
                <Route // Accessed by clicking on a class once a class is created.
                  path="/students"
                  element={<StudentsPage />}
                />
                <Route // Only appears when a class is selected. Allows user to upload roster from .csv
                  path="/uploadRoster"
                  element={<RosterPage />}
                />
                <Route //Not to be confused with Gradebook page. This is to view student grades.
                  path="/studentInfo"
                  element={<StudentInfoPage />}
                />
                <Route //Edit student information for individual days.
                  path="/editStudentInfo"
                  element={<EditStudentInfoPage />}
                />
                <Route //Edit student information for individual days.
                  path="/classDetails"
                  element={<ClassDetailsPage />}
                />
              </Routes>
            </main>
          </React.Fragment>
        ) : (
          // First page to render if user is not signed in. Once signed in the page is not used
          <LoginPage />
        )}
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
