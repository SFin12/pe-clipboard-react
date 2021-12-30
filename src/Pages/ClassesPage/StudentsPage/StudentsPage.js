import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import {
    updatePage,
    updateStudentList,
    updateStudentInfo,
} from "../../../Redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";
import ListStudents from "../../../components/ListStudents";
import "./StudentPage.scss";

const mapStateToProps = (state) => ({
    currentPage: state.currentPage,
    gradebook: state.gradebook,
    class: state.class,
    student: state.student,
    studentList: state.studentList,
    dailyPoints: state.settings.dailyPoints,
});

const mapDispatchToProps = {
    updatePage,
    updateStudentList,
    updateStudentInfo,
};

function StudentsPage(props) {
    const [toggleDelete, setToggleDelete] = useState(false);
    const [newStudent, setNewStudent] = useState("");
    const [showModal, setShowModal] = useState(false);
    const uncleanCurrentGb = props.gradebook;
    const uncleanCurrentClass = props.class;
    const currentGb = uncleanCurrentGb.replace(
        /[.,/#!$%^&*;:{}=\-_`~()]/g,
        " "
    );
    const currentClass = uncleanCurrentClass.replace(
        /[.,/#!$%^&*;:{}=\-_`~()]/g,
        " "
    );
    const classKey = currentGb + "-" + currentClass;

    console.log("classKey", classKey);
    useEffect(() => {
        props.updatePage("Students");
    }, []);

    const history = useHistory();

    const addStudentModal = (
        <Modal show={showModal} centered size="sm" onHide={toggleModal}>
            <Modal.Header closeButton className="bg-primary">
                <Modal.Title className="text-white">Add Student</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-dark">
                <label htmlFor="create-student text-align-center">
                    Add Student
                </label>
                <div className="input-group mb-3 d-flex justify-content-start">
                    <input
                        id="create-student"
                        type="text"
                        value={newStudent}
                        placeholder="Student Name"
                        className="text-input"
                        onChange={handleChange}
                        onKeyDown={handleSave}
                    />
                </div>
                <p>Press Enter or click add</p>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="success"
                    name="cancel"
                    id="save-student"
                    onClick={handleSave}
                >
                    Add
                </Button>
                <Button variant="primary" name="delete" onClick={toggleModal}>
                    Finished
                </Button>
            </Modal.Footer>
        </Modal>
    );

    function handleChange(e) {
        if (e.target.id === "create-student") {
            setNewStudent(e.target.value);
        } else if (e.target.id.slice(2) === "custom-note") {
            console.log("custom note: ", e.target.value);
        }
    }

    function handleSave(e) {
        if (
            (newStudent && e.key === "Enter") ||
            (newStudent && e.target.id === "save-student")
        ) {
            props.updateStudentList([newStudent]);
            setNewStudent("");
        }
    }

    function handleDelete(e) {
        setToggleDelete(!toggleDelete);
    }

    function addStudentRoster() {
        history.push("/roster");
    }

    function toggleModal(e) {
        if (e && e.currentTarget.id === "add-class-button") {
            setShowModal(true);
        } else {
            setShowModal(false);
            setNewStudent("");
        }
    }

    function handleSubmit(e) {
        const date = new Date().toLocaleDateString();
        console.log(date);
        const students = e.target.elements;
        // console.log(students[0]);
        const studentInfoObj = {};
        e.preventDefault();
        let studentName = "";
        let studentPoints = "";
        let studentNotes = "";
        let studentAttendance = "";
        let finishedOneStudent = false;
        for (let i = 0; i < students.length - 1; i++) {
            if (students[i].name === "name") {
                studentName = students[i].value;
                //add student as key
                studentInfoObj[studentName] = [];
            }
            if (students[i].name === "daily-points") {
                studentPoints = students[i].value;
            }
            if (students[i].name === "attendance") {
                studentAttendance = students[i].value;
            }
            if (students[i].name.slice(0, 4) === "note") {
                studentNotes += students[i].value + " ";
                if (students[i].name === "note4") {
                    finishedOneStudent = true;
                }
            }
            if (
                studentName &&
                studentPoints &&
                studentAttendance &&
                finishedOneStudent
            ) {
                // console.log(studentName.length, studentPoints.length);
                const studentObj = {
                    points: studentPoints,
                    notes: studentNotes,
                    attendance: studentAttendance,
                    date: date,
                };
                studentInfoObj[studentName].push(studentObj);
                studentName = "";
                studentPoints = "";
                studentNotes = "";
                studentAttendance = "";
                finishedOneStudent = false;
            }
        }
        props.updateStudentInfo(studentInfoObj, date);
    }

    return (
        <React.Fragment>
            <h1 className="header">{props.class}</h1>
            <hr />
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    {props.studentList[classKey] ? (
                        <ListStudents />
                    ) : (
                        addStudentRoster
                    )}
                    {showModal ? (
                        addStudentModal
                    ) : (
                        <div className="d-flex justify-content-between align-items-center w-100">
                            <div id="add-class-button" onClick={toggleModal}>
                                <FontAwesomeIcon
                                    name="add-icon"
                                    icon={faPlusCircle}
                                    className="plus-icon m-4"
                                />
                            </div>

                            <Button
                                className="submit-button btn-lg"
                                id="submit-button"
                                type="submit"
                            >
                                Submit
                            </Button>

                            <div onClick={handleDelete} id="delete-a-class">
                                <FontAwesomeIcon
                                    name="delete-icon"
                                    icon={faMinusCircle}
                                    className={
                                        toggleDelete
                                            ? "minus-icon m-4 highlight"
                                            : "minus-icon m-4"
                                    }
                                />
                                <br />
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentsPage);
