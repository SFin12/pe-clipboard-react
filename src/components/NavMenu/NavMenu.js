import React, { Component } from "react";
import "./NavMenu.scss";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import { updateLogin, updatePage } from "../../Redux/actions";
import { connect } from "react-redux";

//Lings that will be mapped through to form NavLinks at top of page
const links = [
    { to: "/classes", text: "Classes", key: "link1" },
    { to: "/gradebook", text: "Gradebook", key: "link2" },
    { to: "/info", text: "Info" },
    { to: "/settings", text: "Settings", key: "link3" },
    { to: "/pe-clipboard-react", text: "Logout", key: "link4" },
];

const mapStateToProps = (state) => {
    return {
        signedIn: state.signedIn,
        googleAuth: state.googleAuth,
        currentPage: state.currentPage,
        gradebook: state.gradebook,
    };
};

const mapDispatchToProps = {
    updateLogin,
    updatePage,
};
class NavMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            rosterNav: false,
            classesLink: null,
            render: false,
        };

        this.toggle = this.toggle.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.closeNavMenu = this.closeNavMenu.bind(this);
    }

    componentDidMount() {
        if (!this.props.gradebook) {
            if (links.length > 4) {
                let classes = links.shift();
                this.setState({ classesLink: classes });
            }
        } else {
            if (links.length < 5 && this.state.classesLink) {
                links.unshift(this.state.classesLink);
                this.setState({ render: !this.state.render });
            }
        }
    }

    //addes an upload roster and grades tab to list of links above when a studentsPage is open
    componentDidUpdate() {
        if (this.props.navOpen === false) {
            this.setState({ isOpen: true });
        }

        if (!this.props.gradebook) {
            if (links.length > 4) {
                let classes = links.shift();
                this.setState({ classesLink: classes });
            }
        } else {
            if (links.length < 5 && this.state.classesLink) {
                links.unshift(this.state.classesLink);
                this.setState({ render: !this.state.render });
            }
        }
        if (this.props.currentPage === "Students") {
            if (links.length === 5) {
                links.push({
                    to: "/studentInfo",
                    text: "Student Info",
                    key: "link6",
                });
                links.push({
                    to: "/uploadRoster",
                    text: "Upload Roster",
                    key: "link7",
                });
                this.setState({ rosterNav: true });
            }
        } else if (this.props.currentPage !== "Students") {
            if (links.length > 5) {
                links.pop();
                links.pop();
                this.setState({ rosterNav: false });
            }
        }
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    logOut = () => {
        (async () => {
            await this.props.googleAuth.googleAuth.signOut();
            this.props.updateLogin(false);
            window.location.reload();
        })();
    };

    handleClick(e) {
      
        if (e.currentTarget.text === "Logout") {
            this.logOut();
        }
        this.props.updatePage(e.target.text);
        this.setState({ isOpen: false });
    }

    closeNavMenu(e) {
  
        if (this.state.isOpen) {
            this.setState({ isOpen: false });
        }
    }

    //maps list of links to form nav menu
    createNavItem = ({ to, text, className, key }) => (
        <NavItem key={"Nav-item" + key}>
            {/* //NavLink below is from react router not reactstrap */}
            <NavLink
                key={key}
                to={to}
                className={`${className} nav-text`}
                onClick={this.handleClick}
                text={text}
            >
                {text}
            </NavLink>
        </NavItem>
    );

    render() {
        return (
            <div>
                <Navbar color="dark" light expand="lg" fixed="top">
                    <NavLink to="/info" id="PE-clipboard" className="nav-text">
                        Coach's Clipboard
                    </NavLink>

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
