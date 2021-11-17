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
import { updateLogin } from "../../Redux/actions";
import { connect } from "react-redux";

const links = [
    { to: "/classes", text: "Classes", key: "link1" },
    { to: "/gradebook", text: "Gradebook", key: "link2" },
    { to: "/info", text: "Info" },
    { to: "/settings", text: "Settings", key: "link3" },
    { to: "/", text: "Logout", key: "link4"}
];

const mapStateToProps = (state) => {
    return {
    isLoggedIn: state.signedIn,
    googleAuth: state.googleAuth
    }
}

const mapDispatchToProps = {
    updateLogin
}
class NavMenu extends Component {
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

    logOut = () => {
        // (Ref. 8)
        console.log('nav-logout');
        (async () => {
            await this.props.googleAuth.googleAuth.signOut();
            this.props.updateLogin(false);
            console.log("loggedIn? ", this.props.isLoggedIn);
            window.location.reload();
            //renderSigninButton(props.googleAuth.gapi);
        })();
    };

    handleClick(e) {
        if(e.target.text === 'Logout'){
            this.logOut()
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);