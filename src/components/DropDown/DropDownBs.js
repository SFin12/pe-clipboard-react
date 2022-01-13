import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import "./DropDown.scss";

function DropDownStudentInfo(props) {
    return (
        <DropdownButton
            id="dropdown-basic-button"
            variant="secondary"
            menuVariant="dark"
            title={props.student}
            className="m-auto d-flex justify-content-center"
            bsPrefix="button student-button"
            align='"start"|"end"|{ sm: "start"|"end" }|{ md: "start"|"end" }|{ lg: "start"|"end" }|{ xl: "start"|"end"}|{ xxl: "start"|"end"}'
        >
            <Dropdown.Item bsPrefix="dropdown-items">
                Total Points: {props.totalPoints}
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
