import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar } from "reactstrap";

export function Nav(props) {
    return (
        <Navbar dark color="success">
            <div className="container">
                <h3 className="title">PE Clipboard</h3>

                <NavLink className="navLink" to="/classes">
                    Classes
                </NavLink>
                <NavLink className="navLink" to="/gradebook">
                    Gradebook
                </NavLink>
                <NavLink className="navLink" to="/settings">
                    Settings
                </NavLink>
            </div>
        </Navbar>
    );
}
