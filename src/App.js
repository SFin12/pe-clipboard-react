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
import { db } from "./Lib/FirebaseConfig";
import { ref, set, onValue, push } from "firebase/database";

const mapStateToProps = (state) => ({
    signedIn: state.signedIn,
    currentPage: state.currentPage,
    gradebook: state.gradebook,
    userInfo: state.userInfo,
});

const mapDispatchToProps = {
    updateLogin: (signIn) => action.updateLogin(signIn),
    updatePage: (page) => action.updatePage(page),
};

class App extends React.Component {
    
    componentDidMount() {
        this.props.updatePage();
        this.setState({ database: db });
        //fetchData();
    }

    componentDidUpdate(prevProps, prevState) {
        // check on previous state
        // only write when it's different with the new state
        if (prevProps !== this.props) {
            this.writeUserData(this.props.userInfo.userId);
            this.getUserData();
        }
    }

    writeUserData(dataToAdd) {
        const userId = dataToAdd;
        console.log(userId);
        push()
        set(ref(db, "/users"), {
            userId: this.props.userInfo.id,
            email: this.props.userInfo.email,
            name: this.props.userInfo.name,
            userImg: this.props.userInfo.userImg,
        });
        console.log("data saved");
    }

    getUserData = () => {
        const allData = ref(this.state.database, "/");
        onValue(allData, (snapshot) => {
            const data = snapshot.val();
            console.log("get data: ", data);
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
               
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
