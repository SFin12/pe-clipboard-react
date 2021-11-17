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
import * as action from "./Redux/actions";

const mapStateToProps = (state) => ({
    signedIn: state.signedIn,
    currentPage: state.currentPage,
    gradebook: state.gradebook
});

const mapDispatchToProps = {
    updateLogin: (signIn) => action.updateLogin(signIn),
    updatePage: (page) => action.updatePage(page),
};

// function fetchData() {
//     fetch("/api")
//         .then((res) => res.json())
//         .then((data) => alert(data.message));
// }
class App extends React.Component {
    componentDidMount() {
        this.props.updatePage();
        //fetchData();
    }

    render() {
        console.log("signed in? ", this.props.signedIn);
        return (
            //Check if user is signed in, if so, render navbar

            <div className="App">
                {this.props.signedIn ? (
                    <React.Fragment>
                        <NavMenu updatePage={this.props.updatePage} />
                        <main className="container">
                            <Switch>
                                <Route exact path='/' render={()=>{
                                    return(
                                !this.props.gradebook.gradebook ?
                                <Redirect to="/gradebook" /> :
                                <Redirect to="/classes" /> 
                                )
                            }}
                            />
                                <Route
                                    path="/classes"
                                    component={ClassesPage}
                                />
                                <Route
                                    path="/gradebook"
                                    component={GradebookPage}
                                />
                                <Route
                                    path="/info"
                                    render={() => (
                                        <InfoPage
                                            title={this.props.currentPage}
                                        />
                                    )}
                                />
                                <Route
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
