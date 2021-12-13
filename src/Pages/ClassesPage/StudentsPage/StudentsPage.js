import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { updatePage, updateStudentList } from "../../../Redux/actions";

import { useHistory } from "react-router";

const mapStateToProps = (state) => ({
    currentPage: state.currentPage,
    class: state.class,
    student: state.student,
    studentList: state.studentList,
});

const mapDispatchToProps = {
    updatePage,
    updateStudentList,
};

function StudentsPage(props) {
    console.log("studentPge props: ", props);
    useEffect(() => {
        props.updatePage("Students");
    }, []);

    const history = useHistory();

    function ListStudents() {
        const currentClass = props.class;
        const studentButtons = props.studentList[currentClass].map(student => {
            return (
                <Button variant="light">{student}</Button>
            )
        });
        return studentButtons;
    }

    function addStudents() {
        history.push("/roster");
    }

    return (
        <React.Fragment>
            <h1 className="header">{props.class}</h1>
            <hr />
            <div className="form-container">
                {props.studentList[props.class] ? <ListStudents /> : addStudents}
            </div>
        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentsPage);
