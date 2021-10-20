import SignIn from "./Pages/SignIn/SignIn";
import "./App.scss";
import { Redirect, Route, Switch } from "react-router";
import { ClassesPage } from "./Pages/ClassesPage/ClassesPage";
import { GradebookPage } from "./Pages/GradebookPage/GradebookPage";
import React from "react";
import { Nav } from "./components/Navbar/Navbar";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.signIn = this.signIn.bind(this);
        this.state = {
            signedIn: false,
        };
    }

    signIn() {
        this.setState({ signedIn: !this.state.signedIn });
    }

    render() {
        console.log(this.state.signedIn);
        return (
            //Check if user is signed in, if so, render navbar
            <div className="App">
                {this.state.signedIn ? (
                    <Nav />
                ) : null
                //<SignIn signIn={this.signIn} />
                }

                <main className="container">
                    <Switch>
                        <Route exact path="/" render={()=> <SignIn signIn={this.signIn}/>} />
                        <Route path="/classes" component={ClassesPage} />
                        <Route path="/gradebook" component={GradebookPage} />
                    </Switch>
                </main>
            </div>
        );
    }
}

export default App;
