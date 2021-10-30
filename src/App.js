import SignIn from "./Pages/SignIn/SignIn";
import "./App.scss";
import { Route, Switch, withRouter } from "react-router";
import { ClassesPage } from "./Pages/ClassesPage/ClassesPage";
import { GradebookPage } from "./Pages/GradebookPage/GradebookPage";
import { InfoPage } from "./Pages/InfoPage/InfoPage";
import { SettingsPage } from "./Pages/SettingsPage/SettingsPage";
import React from "react";
import NavMenu from "./components/Navbar/NavMenu";
import { store } from "./Redux/createStore";
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

    // constructor(props) {
    //     super(props);
    //     this.signIn = this.signIn.bind(this);
    //     this.updateCurrentPage = this.updateCurrentPage.bind(this);
    //     this.state = {
    //         signedIn: false,
    //         currentPage: "Classes"
    //     };
    // }

    // signIn() {
    //     this.setState({ signedIn: !this.state.signedIn });
    // }

    // updateCurrentPage(page) {
    //     this.setState({currentPage: page})
    //     console.log(page);
    // }

    render() {
        console.log(store.getState());
        console.log("this props signedIn ? : " + this.props.signedIn);
        
        return (
            //Check if user is signed in, if so, render navbar

            <div className="App">
                {this.props.signedIn ? (
                    <NavMenu updatePage={this.props.updatePage} />
                ) : (
                    <SignIn
                        updateLogin={this.props.updateLogin}
                        signIn={this.props.signedIn}
                    />
                )}

                <main className="container">
                    <Switch>
                        <Route exact path="/" component={ClassesPage} />
                        <Route path="/classes" render={() => <ClassesPage title={this.props.currentPage}/>} />
                        <Route path="/gradebook" render={() => <GradebookPage title={this.props.currentPage}/>}/>
                        <Route path="/info" render={() => <InfoPage title={this.props.currentPage}/>} />
                        <Route path="/settings" render={() => <SettingsPage title={this.props.currentPage}/>} />
                    </Switch>
                </main>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
