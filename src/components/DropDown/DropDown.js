import React from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from "reactstrap";
import "./DropDown.scss";

function DropDown(props) {
    return (
        <div className="dropdown-content">
            <UncontrolledDropdown>
                <DropdownToggle caret color="dark">
                    First Gradebook?
                </DropdownToggle>
                <DropdownMenu>
                    <p>{props.content}</p>
                </DropdownMenu>
            </UncontrolledDropdown>
        </div>
    );
}

export default DropDown;
