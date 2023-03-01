import React, { Component } from "react"
import "./NavMenu.scss"
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from "reactstrap"
import { NavLink } from "react-router-dom"
import { updateLogin, updatePage } from "../../Redux/actions"
import { connect } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { withRouter } from "../withRouter"

//Lings that will be mapped through to form NavLinks at top of page
const links = [
  { to: "/classes", text: "Classes", key: "link1" },
  { to: "/gradebook", text: "Gradebook", key: "link2" },
  { to: "/info", text: "About", key: "link3" },
  { to: "/settings", text: "Settings", key: "link4" },
  { to: "/classes", text: "Logout", key: "link5" },
]

const mapStateToProps = (state) => {
  return {
    signedIn: state.signedIn,
    currentPage: state.currentPage,
    gradebook: state.gradebook,
  }
}

const mapDispatchToProps = {
  updateLogin,
  updatePage,
}
class NavMenu extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
      rosterNav: false,
      classesLink: null,
      render: false,
      screenWidth: "",
    }

    this.toggle = this.toggle.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.closeNavMenu = this.closeNavMenu.bind(this)
  }

  componentDidMount() {
    if (!this.props.gradebook) {
      if (links.length > 4) {
        let classes = links.shift()
        this.setState({ classesLink: classes })
      }
    } else {
      if (links.length < 5 && this.state.classesLink) {
        links.unshift(this.state.classesLink)
        this.setState({ render: !this.state.render })
      }
    }
    this.setState({ screenWidth: window.innerWidth })
  }

  //adds an upload roster and grades tab to list of links above when a studentsPage is open
  componentDidUpdate() {
    if (this.props.navOpen === false) {
      this.setState({ isOpen: true })
    }

    if (!this.props.gradebook) {
      if (links.length > 4) {
        let classes = links.shift()
        this.setState({ classesLink: classes })
      }
    } else {
      if (links.length < 5 && this.state.classesLink) {
        links.unshift(this.state.classesLink)
        this.setState({ render: !this.state.render })
      }
    }
    if (this.props.currentPage === "Students") {
      if (links.length === 5) {
        const logoutLink = links.pop()
        links.push({
          to: "/uploadRoster",
          text: "Upload Roster",
          key: "link6",
        })
        links.push({
          to: "/classDetails",
          text: "Student Numbers",
          key: "link7",
        })
        links.push({
          to: "/studentInfo",
          text: "Student Info",
          key: "link8",
        })
        links.push(logoutLink)
        
        this.setState({ rosterNav: true })
      }
    } else if (this.props.currentPage !== "Students") {
      if (links.length > 5) {
        const logoutLink = links.pop()
        links.pop()
        links.pop()
        links.pop()
        links.push(logoutLink)
        this.setState({ rosterNav: false })
      }
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  logOut = () => {
    this.props.updatePage("Classes")
    this.props.navigate('/')
    this.props.updateLogin(false)
    window.location.reload()
  }

  handleClick(e) {
    
    this.props.updatePage(e.target.text)
    this.setState({ isOpen: false })
    if (e.currentTarget.text === "Logout") {
      this.logOut()
    }
  }

  closeNavMenu(e) {
    if (this.state.isOpen) {
      this.setState({ isOpen: false })
    }
  }

  //maps list of links to form nav menu
  createNavItem = ({ to, text, className, key }) => (
    <NavItem key={"Nav-item" + key}>
      {/* //NavLink below is from react router not reactstrap */}
      <NavLink key={key} to={to} className={`${className} nav-text`} onClick={this.handleClick} text={text}>
        {text}
      </NavLink>
    </NavItem>
  )
   
  render() {
    return (
      <div>
        <Navbar color="dark" light expand="lg" fixed="top">
          { window.location.pathname === "/" || window.location.pathname === "/classes" || window.location.pathname === "/gradebook" ? (
            <NavLink to="/info" id="PE-clipboard" className="nav-text">
              Coach's Clipboard
            </NavLink>
          ) : (
            <FontAwesomeIcon name="left-arrow" icon={faArrowLeft} color="green" className="back-arrow ml-2" onClick={() => {
              this.props.navigate(-1)
            }} />
          )}

          <NavbarToggler className="nav-text" id="toggler" onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="nav-text ml-auto" navbar>
              {links.map(this.createNavItem)}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavMenu))
