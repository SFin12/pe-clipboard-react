import SignInPage from "./Pages/SignInPage/SignInPage";
import "./App.scss";
import { Route, Switch, withRouter, Redirect } from "react-router";
import ClassesPage from "./Pages/ClassesPage/ClassesPage";
import GradebookPage from "./Pages/GradebookPage/GradebookPage";
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
});

const mapDispatchToProps = {
    updatePage,
};

class App extends React.Component {
    componentDidMount() {
        !this.props.gradebook && this.props.updatePage("Gradebook");
        console.log(this.props.id);
    }

    componentDidUpdate(prevProps, prevState) {
        // check on previous state
        // only write when it's different with the new state
        if (
            (this.props.signedIn && prevProps.id !== this.props.id) ||
            prevProps.gradebook !== this.props.gradebook ||
            prevProps.gradebookList !== this.props.gradebookList ||
            prevProps.classList !== this.props.classList
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
            };

            if (this.props.id) {
                writeUserData(this.props.id, userObject);
            }
        }
    }

    render() {
        console.log("store", store.getState());
        console.log("gradebook?", this.props.gradbook);
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
