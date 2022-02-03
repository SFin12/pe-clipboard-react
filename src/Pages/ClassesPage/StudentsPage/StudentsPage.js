import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import {
    updatePage,
    updateStudentList,
    updateStudentInfo,
} from "../../../Redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import RosterPage from "../RosterPage/RosterPage";
import ListStudents from "../../../components/ListStudents";
import "./StudentPage.scss";
import SuccessModal from "../../../components/SuccessModal";

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

    const [showSuccess, setShowSuccess] = useState(false);
    const target = useRef(null);

    //Remove punctuation in class & gradebook names to match db key
    const uncleanCurrentGb = props.gradebook;
    const uncleanCurrentClass = props.class;
    const currentGb = uncleanCurrentGb.replace(
        /[.,/#!$%^&*;:{}=\-_`~()]/g,
        " "
    );
    const currentClass = uncleanCurrentClass.replace(
        /[.,/#!$%^&*;:{}=\-_`~()]/g,
        " "
    ); //key/property used in db for studentLists and studentInfo
    const classKey = currentGb + "-" + currentClass;

    useEffect(() => {
        props.updatePage("Students");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const navigate = useNavigate();

    const addStudentModal = (
        <Modal
            show={showModal}
            centered
            size="sm"
            dialogClassName="p-4 p-sm-2 p-md-2"
            onHide={toggleModal}
        >
            <Modal.Header closeButton className="light-header">
                <Modal.Title className="font-weight-bold text-dark">
                    Add Students
                </Modal.Title>
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
            <Modal.Footer className="d-flex justify-content-between mx-0">
                <div className="mx-0">
                    <Button
                        className="m-1 green-button text-dark mx-0"
                        name="cancel"
                        id="save-student"
                        onClick={handleSave}
                    >
                        Add
                    </Button>
                </div>

                <Button
                    className="mr-auto green-button text-dark mx-0"
                    name="upload-roster"
                    id="save-student"
                    onClick={() => navigate("/uploadRoster")}
                    style={{}}
                >
                    Upload?
                </Button>
                <Button
                    className="ml-1 grey-button text-dark mx-0"
                    name="delete"
                    onClick={toggleModal}
                >
                    Finished
                </Button>
            </Modal.Footer>
        </Modal>
    );

    function handleChange(e) {
        if (e.target.id === "create-student") {
            setNewStudent(e.target.value);
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

    function toggleModal(e) {
        if (e && e.currentTarget.id === "add-class-button") {
            setShowModal(true);
        } else {
            setShowModal(false);
            setNewStudent("");
        }
    }

    // submits current evaluation for each student to redux and firebase
    function handleSubmit(e) {
        // date is submitted and used to determine if the submission should overwrite the current day or add to grades.
        const date = new Date().toLocaleDateString();
        const students = e.target.elements;

        // object that will contain all student data
        const studentInfoObj = {};
        e.preventDefault();
        let studentName = "";
        let studentPoints = "";
        let studentNotes = [];
        let studentAttendance = "";

        // is set to true once all notes and data for a student have been iterated, then it's reset to true
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
            if (
                students[i].name.slice(0, 4) === "note" &&
                students[i].dataset.note === "true"
            ) {
                studentNotes.push(students[i].value);
            }
            if (students[i].name === "note4") {
                finishedOneStudent = true;
                console.log("finished student ", finishedOneStudent);
            }
            if (
                studentName &&
                studentPoints &&
                studentAttendance &&
                finishedOneStudent
            ) {
                const studentObj = {
                    points: studentPoints,
                    notes: studentNotes,
                    attendance: studentAttendance,
                    date: date,
                };
                studentInfoObj[studentName].push(studentObj);
                studentName = "";
                studentPoints = "";
                studentNotes = [];
                studentAttendance = "";
                finishedOneStudent = false;
            }
        }
        console.log("studentInfoObj ", studentInfoObj);
        props.updateStudentInfo(studentInfoObj, date);
        setShowSuccess(true);

        setTimeout(() => {
            setShowSuccess(false);
        }, 3000);
    }

    return (
        <React.Fragment>
            <h1 className="header">{props.class}</h1>
            <hr />
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    {props.studentList[classKey] ? (
                        <ListStudents toggleDelete={toggleDelete} />
                    ) : (
                        <div>
                            {/* addStudentRoster() */}
                            <RosterPage hideHeader={true} />
                        </div>
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
                            <SuccessModal
                                showSuccess={showSuccess}
                                title="Saving"
                                messageString="Information has been submitted."
                            />
                            {props.studentList[classKey] &&
                            props.studentList[classKey].length > 0 ? (
                                <Button
                                    className="submit-button btn-lg"
                                    id="submit-button"
                                    type="submit"
                                    ref={target}
                                >
                                    Submit
                                </Button>
                            ) : null}

                            <div onClick={handleDelete} id="delete-a-student">
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
