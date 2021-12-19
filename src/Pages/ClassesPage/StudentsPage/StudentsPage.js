import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import {
    updatePage,
    updateStudentList,
    createStudent,
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
    createStudent,
};

function StudentsPage(props) {
    const [toggleDelete, setToggleDelete] = useState(false);
    const [newStudent, setNewStudent] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [studentPoints, setStudentPoints] = useState({});
    const [attendance, setAttendance] = useState({});

    const classKey = props.gradebook + "-" + props.class;

    useEffect(() => {
        props.updatePage("Students");
        const studentsExist = props.studentList[classKey];
        if (studentsExist) {
            const totalStudents = props.studentList[classKey].length;
            console.log("studentList length: :", totalStudents);
            setStudentPoints(() => {
                let newState = {};
                for (let i = 0; i < totalStudents; i++) {
                    let studentId = i + "-student";
                    newState = { ...newState, [studentId]: props.dailyPoints };
                }
                console.log("newState", newState);
                return newState;
            });
            setAttendance(() => {
                let newState = {};
                for (let i = 0; i < totalStudents; i++) {
                    let studentId = i + "-student";
                    newState = { ...newState, [studentId]: "P" };
                }
                console.log("newState", newState);
                return newState;
            });
        }
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
        console.log("e.key and e.target.id: ", e.key + ", " + e.target.id);
        if (
            (newStudent && e.key === "Enter") ||
            (newStudent && e.target.id === "save-student")
        ) {
            props.createStudent(newStudent);
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

    return (
        <React.Fragment>
            <h1 className="header">{props.class}</h1>
            <hr />
            <div className="form-container">
                {props.studentList[classKey] ? (
                    <ListStudents 
                        handleDecrement
                        />
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
            </div>
        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentsPage);
