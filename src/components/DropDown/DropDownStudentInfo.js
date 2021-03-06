import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import "./DropDown.scss";

function DropDownStudentInfo(props) {
    return (
        <DropdownButton
            id="dropdown-basic-button"
            key={props.id}
            variant="secondary"
            menuVariant="dark"
            title={props.student}
            className="m-auto d-flex justify-content-center w-200"
            bsPrefix="button student-button info-btn "
        >
            <Dropdown.Item bsPrefix="dropdown-items">
                Total Points: {props.totalPoints}/{props.pointsPossible}
            </Dropdown.Item>
            <Dropdown.Item bsPrefix="dropdown-items">
                Grade Percentage: {props.gradePercentage}
            </Dropdown.Item>
            <Dropdown.Item bsPrefix="dropdown-items">
                Notes Summary: {props.notes}
            </Dropdown.Item>
            <Dropdown.Item bsPrefix="dropdown-items">
                Absences: {props.absences}
            </Dropdown.Item>
            <Dropdown.Item bsPrefix="dropdown-items">
                Tardies: {props.tardies}
            </Dropdown.Item>
        </DropdownButton>
    );
}

export default DropDownStudentInfo;
