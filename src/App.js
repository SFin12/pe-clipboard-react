import SignInPage from "./Pages/SignInPage/SignInPage";
import "./App.scss";
import { Route, Switch, withRouter, Redirect } from "react-router";
import ClassesPage from "./Pages/ClassesPage/ClassesPage";
import GradebookPage from "./Pages/GradebookPage/GradebookPage";
import StudentsPage from "./Pages/ClassesPage/StudentsPage/StudentsPage";
import RosterPage from "./Pages/ClassesPage/RosterPage/RosterPage";
import { InfoPage } from "./Pages/InfoPage/InfoPage";
import SettingsPage from "./Pages/SettingsPage/SettingsPage";
import React from "react";
import NavMenu from "./components/NavMenu/NavMenu";
import { connect } from "react-redux";
import { store } from "./Redux/createStore";
import { updatePage } from "./Redux/actions";
import { writeUserData, getUserData } from "./Lib/LinkReduxToDb";





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
    studentList: state.studentList
});

const mapDispatchToProps = {
    updatePage,
};

class App extends React.Component {
    componentDidMount() {
        !this.props.gradebook && this.props.updatePage("Gradebook");
  
    }

    componentDidUpdate(prevProps, prevState) {
        // check on previous state
        // only write when it's different with the new state
        if (
            (this.props.signedIn && prevProps.id !== this.props.id) ||
            prevProps.gradebook !== this.props.gradebook ||
            prevProps.gradebookList !== this.props.gradebookList ||
            prevProps.classList !== this.props.classList ||
            prevProps.studentList !== this.props.studentList
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
                studentList: this.props.studentList
            };

            if (this.props.id) {
                console.log("studentList: ", this.props.studentList)
                writeUserData(this.props.id, userObject);
            }
        }
    }

    render() {
        console.log("store", store.getState());
      
        return (
            //Check if user is signed in, if so, render navbar
            <div className="App">
                {this.props.signedIn ? (
                    <React.Fragment>
                        <NavMenu />
                        <main className="container">
                            <Switch>
                                {/* If no gradebook is found, start on gradebook page otherwise
                                start on class page. */}
                                <Route
                                    exact
                                    path="/"
                                    render={() => {
                                        return this.props.gradebook ? (
                                            <Redirect to="/classes" />
                                        ) : (
                                            <Redirect to="/gradebook" />
                                        );
                                    }}
                                />
                                <Route
                                    exact
                                    path="/classes"
                                    component={ClassesPage}
                                />
                                <Route
                                    exact
                                    path="/gradebook"
                                    component={GradebookPage}
                                />
                                <Route
                                    exact
                                    path="/info"
                                    render={() => (
                                        <InfoPage
                                            title={this.props.currentPage}
                                        />
                                    )}
                                />
                                <Route
                                    exact
                                    path="/settings"
                                    component={SettingsPage}
                                />
                                <Route
                                    exact
                                    path="/students"
                                    component={StudentsPage}
                                />
                                <Route
                                    exact
                                    path="/roster"
                                    component={RosterPage}
                                />
                            </Switch>
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
