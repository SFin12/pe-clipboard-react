import SignIn from "./Pages/SignIn/SignIn";
import "./App.scss";
import { Redirect, Route, Switch } from "react-router";
import { ClassesPage } from "./Pages/ClassesPage/ClassesPage";
import { GradebookPage } from "./Pages/GradebookPage/GradebookPage";
import { InfoPage } from "./Pages/InfoPage/InfoPage";
import { SettingsPage } from "./Pages/SettingsPage/SettingsPage";
import React from "react";
import { Nav } from "./components/Navbar/Navbar";
import NavMenu from "./components/Navbar/NavMenu";
import { conditionallyUpdateScrollbar } from "reactstrap/lib/utils";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.signIn = this.signIn.bind(this);
        this.updateCurrentPage = this.updateCurrentPage.bind(this);
        this.state = {
            signedIn: false,
            currentPage: "Classes"
        };
    }

    signIn() {
        this.setState({ signedIn: !this.state.signedIn });
    }

    updateCurrentPage(page) {
        this.setState({currentPage: page})
        console.log(page);
    }

    render() {
        console.log(this.state.signedIn);
        return (
            //Check if user is signed in, if so, render navbar
            <div className="App">
                {this.state.signedIn ? (
                    <NavMenu updatePage={this.updateCurrentPage} />
                ) : null
                //<SignIn signIn={this.signIn} />
                }

                <main className="container">
                    
                    <Switch>
                        <Route exact path="/" render={()=> <SignIn signIn={this.signIn}/>} />
                        <Route path="/classes" render={()=> <ClassesPage title={this.state.currentPage}/>} />
                        <Route path="/gradebook" component={GradebookPage} />
                        <Route path="/info" component={InfoPage} />
                        <Route path="/settings" component={SettingsPage} />
                    </Switch>
                </main>
            </div>
        );
    }
}

export default App;
