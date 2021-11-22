import SignInPage from "./Pages/SignInPage/SignInPage";
import "./App.scss";
import { Route, Switch, withRouter, Redirect } from "react-router";
import ClassesPage from "./Pages/ClassesPage/ClassesPage";
import GradebookPage from "./Pages/GradebookPage/GradebookPage";
import { InfoPage } from "./Pages/InfoPage/InfoPage";
import SettingsPage from "./Pages/SettingsPage/SettingsPage";
import React from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import NavMenu from "./components/NavMenu/NavMenu";
import { connect } from "react-redux";
import * as action from "./Redux/actions";
import { firebaseConfig } from "./Lib/FirebaseConfig";

const mapStateToProps = (state) => ({
    signedIn: state.signedIn,
    currentPage: state.currentPage,
    gradebook: state.gradebook,
    
});

const mapDispatchToProps = {
    updateLogin: (signIn) => action.updateLogin(signIn),
    updatePage: (page) => action.updatePage(page),
};

function fetchData() {
    fetch("http://openlibrary.org/search.json?q=harry+potter")
        .then((res) => res.json())
        .then((data) => console.log("fetched book data: ", data.docs[0].title));
}

const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);

class App extends React.Component {
    constructor(props) {
        super(props);
        initializeApp(firebaseConfig);
        this.state = {
            databaseTest: "test",
        };
    }
    componentDidMount() {
        this.props.updatePage();
        this.getUserData();
        //fetchData();
    }

    componentDidUpdate(prevProps, prevState) {
        // check on previous state
        // only write when it's different with the new state
        if (prevState !== this.state) {
            this.writeUserData();
        }
    }

    writeUserData(userId, name, email, imageUrl) {
        set(ref(db, "/"), {
            state: this.state,
        });
        console.log("data saved");
    }

    getUserData = () => {
        const allData = ref(db, "/state");
        onValue(allData, (snapshot) => {
            const data = snapshot.val();
            console.log("data: ", data);
        });
        console.log("DATA RETRIEVED");
    };

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
                                <Route
                                    exact
                                    path="/"
                                    render={() => {
                                        return !this.props.gradebook
                                            .gradebook ? (
                                            <Redirect to="/gradebook" />
                                        ) : (
                                            <Redirect to="/classes" />
                                        );
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
                <button
                    onClick={() => this.setState({ databaseTest: "changed" })}
                >
                    Change Database
                </button>
                <button onClick={() => this.setState({ databaseTest: "test" })}>
                    test Database
                </button>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
