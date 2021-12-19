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
import "./StudentPage.scss";
import { useHistory } from "react-router";

const mapStateToProps = (state) => ({
    currentPage: state.currentPage,
    gradebook: state.gradebook,
    class: state.class,
    student: state.student,
    studentList: state.studentList,
    dailyPoints: state.dailyPoints,
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

    function ListStudents() {
        const studentButtons = props.studentList[classKey].map((student, i) => {
            const studentId = i + "-student";
            const pointsId = i + "-points";

            return (
                <div className="student">
                    <div className="flex-space-between">
                        {/* Student Button with their name */}
                        <input
                            className="tl-round student-button button"
                            type="button"
                            key={student}
                            id={i + "-" + student}
                            name={student}
                            value={student}
                            onClick={handleDecrement}
                        />
                        <input
                            className="tr-round button daily-points "
                            key={i + "-points"}
                            name="daily-points"
                            type="button"
                            id={i + "-points"}
                            value={studentPoints[studentId]}
                            onClick={handleIncrement}
                        />
                    </div>
                    <div className="flex-space-between notes" data-toggle="off">
                        <input
                            className={
                                "bl-round button absent note" +
                                " " +
                                attendance[studentId]
                            }
                            name="attendance"
                            type="button"
                            id={i + "-attendance"}
                            data-toggle="off"
                            value={attendance[studentId]}
                            onClick={handleAttendance}
                        />
                        <input
                            className="button absent note "
                            name="note1"
                            type="button"
                            id={i + "-note1"}
                            data-toggle="off"
                            value="NP"
                        />
                        <input
                            className="button absent note"
                            name="note2"
                            type="button"
                            id={i + "-note2"}
                            data-toggle="off"
                            value="ND"
                        />
                        <input
                            className="button absent note "
                            name="note3"
                            type="button"
                            id={i + "-note3"}
                            data-toggle="off"
                            value="C"
                        />
                        <input
                            className="br-round button absent note "
                            style={{ textAlign: "center" }}
                            name="attendance"
                            type="text"
                            id={i + "-custom-note"}
                            data-toggle="off"
                            defaultValue="?"
                            onChange={handleChange}
                        />
                    </div>
                </div>
            );
        });
        return studentButtons;
    }

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

    function handleDecrement(e) {
        //decrease student points by one.
        const studentId = e.target.id[0] + "-student";
        let currentPoints = studentPoints[studentId];
        if (currentPoints > 0) {
            --currentPoints;
        }
        setStudentPoints((prevState) => ({
            ...prevState,
            [studentId]: currentPoints,
        }));
    }

    function handleIncrement(e) {
        //increase student points by one.
        const studentId = e.target.id[0] + "-student";
        let currentPoints = studentPoints[studentId];
        ++currentPoints;
        setStudentPoints((prevState) => ({
            ...prevState,
            [studentId]: currentPoints,
        }));
    }

    function handleAttendance(e) {
        const studentId = e.target.id[0] + "-student";
        let currentAttendance = attendance[studentId];
        console.log("attendance id: ", e.target.id);
        if (currentAttendance === "P") {
            setAttendance({ ...attendance, [studentId]: "A" });
        } else if (currentAttendance === "A") {
            setAttendance({ ...attendance, [studentId]: "T" });
        } else {
            setAttendance({ ...attendance, [studentId]: "P" });
        }
    }

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
