import SignIn from "./Pages/SignIn/SignIn";
import "./App.scss";
import { Route, Switch, withRouter } from "react-router";
import { ClassesPage } from "./Pages/ClassesPage/ClassesPage";
import GradebookPage from "./Pages/GradebookPage/GradebookPage";
import { InfoPage } from "./Pages/InfoPage/InfoPage";
import { SettingsPage } from "./Pages/SettingsPage/SettingsPage";
import React from "react";
import NavMenu from "./components/NavMenu/NavMenu";
import { connect } from "react-redux";
import * as action from "./Redux/actions";

const mapStateToProps = (state) => ({
    signedIn: state.signedIn,
    currentPage: state.currentPage,
});

const mapDispatchToProps = {
    updateLogin: (signIn) => action.updateLogin(signIn),
    updatePage: (page) => action.updatePage(page),
};
class App extends React.Component {
    componentDidMount() {
        this.props.updatePage();
    }

    render() {
        
        return (
            //Check if user is signed in, if so, render navbar

            <div className="App">
                {this.props.signedIn ? (
                    <React.Fragment>
                    <NavMenu updatePage={this.props.updatePage} />
                    <main className="container">
                    <Switch>
                        <Route exact path="/" component={SignIn} />
                        <Route path="/classes" render={() => <ClassesPage title={this.props.currentPage}/>} />
                        <Route path="/gradebook" component={GradebookPage}/>
                        <Route path="/info" render={() => <InfoPage title={this.props.currentPage}/>} />
                        <Route path="/settings" render={() => <SettingsPage title={this.props.currentPage}/>} />
                    </Switch>
                </main>
                </React.Fragment>
                ) : (
                    <SignIn
                        updateLogin={this.props.updateLogin}
                        signIn={this.props.signedIn}
                    />
                )}

                
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
