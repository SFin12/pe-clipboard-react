import React, { useEffect } from "react";
import { connect } from "react-redux";
import { InputGroup } from "react-bootstrap";
import { updatePage, updateStudentList } from "../../../Redux/actions";
import { Input } from "reactstrap";

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
    console.log("StudentPage Props: ", props);

    function ListStudents() {}

    function AddStudents() {
        return <Input/>
    }

    return (
        <React.Fragment>
            <h1 className="header">{props.class}</h1>
            <hr />
            {props.studentsList ? <ListStudents /> : <AddStudents />}
        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentsPage);
