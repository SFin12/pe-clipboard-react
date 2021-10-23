import "./sidebarMenu.scss";
import React, { Component } from "react";
import { Link } from "react-router-dom";

class SidebarMenu extends Component {
    render() {
      return (
        <div className="sidebar-container">
            <div>
                <ul>
                    <li><Link to="/classes">Classes</Link></li>
                    <li><Link to="/gradebook">Gradebook</Link></li>
                    <li><Link to="/settings">Settings</Link></li>
                </ul>
            </div>
        </div>
      )
    }
  }

export default SidebarMenu;