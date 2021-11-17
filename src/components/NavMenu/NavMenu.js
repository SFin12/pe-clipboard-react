import React, { Component } from "react";
import "./NavMenu.scss";
import SignInPage from "../../Pages/SignInPage/SignInPage";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
} from "reactstrap";
import { NavLink } from "react-router-dom";

const links = [
    { to: "/classes", text: "Classes", key: "link1" },
    { to: "/gradebook", text: "Gradebook", key: "link2" },
    { to: "/info", text: "Info" },
    { to: "/settings", text: "Settings", key: "link3" },
    { to: "/sign-out", text: "Logout", key: "link4"}
];

export default class NavMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
        };

        this.toggle = this.toggle.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    handleClick(e) {
        this.props.updatePage(e.target.text);
        this.toggle();
    }

    createNavItem = ({ to, text, className, key }) => (
        <NavItem>
            {/* //NavLink below is from react router not reactstrap */}
            <NavLink
                to={to}
                className={`${className} nav-text`}
                onClick={this.handleClick}
                text={text}
                key={key}
            >
                {text}
            </NavLink>
        </NavItem>
    );

    render() {
        return (
            <div>
                <Navbar color="dark" light expand="md" fixed="top">
                    <NavbarBrand className="nav-text" href="/">
                        PE Clipboard
                    </NavbarBrand>
                    <NavbarToggler
                        className="nav-text"
                        id="toggler"
                        onClick={this.toggle}
                    />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="nav-text ml-auto" navbar>
                            {links.map(this.createNavItem)}
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}
