import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { updatePage } from "../../../Redux/actions";
import { useNavigate } from "react-router";
import "./StudentInfoPage.scss";
import ListStudentInfo from "../../../components/ListStudentInfo";

const mapStateToProps = (state) => ({
    currentPage: state.currentPage,
    gradebook: state.gradebook,
    class: state.class,
    studentList: state.studentList,
    dailyPoints: state.settings.dailyPoints,
});

const mapDispatchToProps = {
    updatePage,
};

function StudentInfoPage(props) {
    useEffect(() => {
        props.updatePage("Student Info");
    });

    const navigate = useNavigate();

    return (
        <React.Fragment>
            <h1 className="header">Student Info</h1>
            <hr />

            <div className="d-flex justify-content-center">
                <span>
                    <h2 className="subtitle mb-4">
                        {props.gradebook} - {props.class}
                    </h2>
                </span>
            </div>
            <div className="container">
                <ListStudentInfo />
            </div>
        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentInfoPage);
