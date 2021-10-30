import SignIn from "./Pages/SignIn/SignIn";
import "./App.scss";
import { Redirect, Route, Switch, withRouter } from "react-router";
import { ClassesPage } from "./Pages/ClassesPage/ClassesPage";
import { GradebookPage } from "./Pages/GradebookPage/GradebookPage";
import { InfoPage } from "./Pages/InfoPage/InfoPage";
import { SettingsPage } from "./Pages/SettingsPage/SettingsPage";
import React from "react";
import { Nav } from "./components/Navbar/Navbar";
import NavMenu from "./components/Navbar/NavMenu";
import { store } from "./Redux/createStore";
import { connect } from "react-redux";
import * as action from "./Redux/actions";


const mapStateToProps = (state) => ({
    signedIn: state.signIn,
    currentPage: state.currentPage
});

const mapDispatchToProps = {
    updateLogin: (signIn) => action.updateLogin(signIn),
    updatePage: (page) => action.updatePage(page)

}
class App extends React.Component {

    componentDidMount() {
        this.props.updateLogin();
        this.props.updatePage()
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
       console.log(store.getState())
        return (
            //Check if user is signed in, if so, render navbar
            
            <div className="App">
                {this.props.signedIn ? (
                    <NavMenu updatePage={this.updateCurrentPage} />
                ) : 
                <SignIn/>
                }

                <main className="container">
                    
                    <Switch>
                        <Route exact path="/" render={<SignIn updateLogin={this.props.updateLogin}/>} />
                        <Route path="/classes" component={ClassesPage} />
                        <Route path="/gradebook" component={GradebookPage} />
                        <Route path="/info" component={InfoPage} />
                        <Route path="/settings" component={SettingsPage} />
                    </Switch>
                </main>
            </div>
            
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
