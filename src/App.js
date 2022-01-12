import SignInPage from "./Pages/SignInPage/SignInPage";
import "./App.scss";
import { Route, Routes, Navigate, Redirect } from "react-router";
import ClassesPage from "./Pages/ClassesPage/ClassesPage";
import GradebookPage from "./Pages/GradebookPage/GradebookPage";
import StudentsPage from "./Pages/ClassesPage/StudentsPage/StudentsPage";
import RosterPage from "./Pages/ClassesPage/RosterPage/RosterPage";
import { InfoPage } from "./Pages/InfoPage/InfoPage";
import SettingsPage from "./Pages/SettingsPage/SettingsPage";
import GradesPage from "./Pages/ClassesPage/GradesPage/GradesPage";
import React from "react";
import NavMenu from "./components/NavMenu/NavMenu";
import { withRouter } from "./components/withRouter";
import { connect } from "react-redux";
import { store } from "./Redux/createStore";
import { updatePage } from "./Redux/actions";
import { writeUserData } from "./Lib/LinkReduxToDb";

const mapStateToProps = (state) => ({
    signedIn: state.signedIn,
    id: state.id,
    email: state.email,
    name: state.name,
    userImg: state.userImg,
    gradebook: state.gradebook,
    gradebookList: state.gradebookList,
    classList: state.classList,
    class: state.class,
    student: state.student,
    studentList: state.studentList,
    studentInfo: state.studentInfo,
});

const mapDispatchToProps = {
    updatePage,
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navOpen: true,
        };
    }
    componentDidMount() {
        !this.props.gradebook && this.props.updatePage("Gradebook");
        console.log("App props: ", this.props);
    }

    componentDidUpdate(prevProps) {
        // check on previous state
        // only write when it's different with the new state
        if (
            (this.props.signedIn && prevProps.id !== this.props.id) ||
            prevProps.gradebook !== this.props.gradebook ||
            prevProps.gradebookList !== this.props.gradebookList ||
            prevProps.classList !== this.props.classList ||
            prevProps.studentList !== this.props.studentList ||
            prevProps.studentInfo !== this.props.studentInfo
        ) {
            const userObject = {
                id: this.props.id,
                name: this.props.name,
                email: this.props.email,
                userImg: this.props.userImg,
                gradebook: this.props.gradebook,
                gradebookList: this.props.gradebookList,
                classList: this.props.classList,
                class: this.props.class,
                student: this.props.student,
                studentList: this.props.studentList,
                studentInfo: this.props.studentInfo,
            };

            if (this.props.id) {
                writeUserData(this.props.id, userObject);
            }
        }
    }

    closeNavbar() {
        this.setState({
            navOpen: false,
        });
    }

    render() {
        // console.log("store", store.getState());

        return (
            //Check if user is signed in, if so, render navbar
            <div className="App">
                {this.props.signedIn ? (
                    <React.Fragment>
                        <NavMenu navOpen={this.state.navOpen} />
                        <main className="container">
                            <Routes>
                                {/* If no gradebook is found, start on gradebook page otherwise
                                start on class page. */}
                                <Route path="/" element={<ClassesPage />} />
                                <Route
                                    path="/classes"
                                    element={<ClassesPage />}
                                />
                                <Route
                                    path="/gradebook"
                                    element={<GradebookPage />}
                                />
                                <Route path="/info" element={<InfoPage />} />

                                <Route
                                    path="/settings"
                                    element={<SettingsPage />}
                                />
                                <Route
                                    path="/students"
                                    element={<StudentsPage />}
                                />
                                <Route
                                    path="/uploadRoster"
                                    element={<RosterPage />}
                                />
                                <Route
                                    path="/grades"
                                    element={<GradesPage />}
                                />
                            </Routes>
                        </main>
                    </React.Fragment>
                ) : (
                    <SignInPage />
                )}
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
