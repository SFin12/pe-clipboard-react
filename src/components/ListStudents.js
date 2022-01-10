import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updatePage, updateStudentList, deleteStudent } from "../Redux/actions";
import Confirm from "./ConfirmModal";
import "./ListStudents.scss";

const mapStateToProps = (state) => ({
    currentPage: state.currentPage,
    gradebook: state.gradebook,
    class: state.class,
    student: state.student,
    studentList: state.studentList,
    dailyPoints: state.settings.dailyPoints,
});

const mapDispatchToProps = {
    deleteStudent,
    updatePage,
    updateStudentList,
};

function ListStudents(props) {
    const [studentPoints, setStudentPoints] = useState({});
    const [attendance, setAttendance] = useState({});
    const [note, setNote] = useState({});

    const [studentToDelete, setStudentToDelete] = useState("");
    const [showModal, setShowModal] = useState(false);
    console.log(props.toggleDelete);

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

    //starting values for attendance and daily points
    useEffect(() => {
        props.updatePage("Students");
        const studentsExist = props.studentList[classKey];
        if (studentsExist) {
            const totalStudents = props.studentList[classKey].length;
            setStudentPoints((studentPoints) => {
                let newState = {};
                for (let i = 0; i < totalStudents; i++) {
                    let studentId = i + "-student";
                    newState = {
                        ...newState,
                        [studentId]:
                            studentPoints[studentId] || props.dailyPoints,
                    };
                }
                return newState;
            });
            setAttendance((attendance) => {
                let newState = {};
                for (let i = 0; i < totalStudents; i++) {
                    let studentId = i + "-student";
                    newState = {
                        ...newState,
                        [studentId]: attendance[studentId] || "P",
                    };
                }
                return newState;
            });
            setNote((note) => {
                let newState = {};
                for (let i = 0; i < totalStudents; i++) {
                    let note1 = i + "-note1";
                    let note2 = i + "-note2";
                    let note3 = i + "-note3";
                    newState = {
                        ...newState,
                        [note1]: note[note1] || false,
                        [note2]: note[note2] || false,
                        [note3]: note[note3] || false,
                    };
                }
                console.log("note ", newState);
                return newState;
            });
        }
    }, [props, classKey]);

    function handleChange(e) {
        if (e.target.id.slice(2) === "custom-note") {
        }
    }

    function handleDecrement(e) {
        //decrease student points by one.
        let studentId = e.target.id[0];
        if (e.target.id[2] === "-") {
            studentId = e.target.id.slice(0, 2);
        }
        studentId += "-student";
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
        let studentId = e.target.id[0];
        if (e.target.id[2] === "-") {
            studentId = e.target.id.slice(0, 2);
        }
        studentId += "-student";
        let currentPoints = studentPoints[studentId];
        ++currentPoints;
        setStudentPoints((prevState) => ({
            ...prevState,
            [studentId]: currentPoints,
        }));
    }

    function handleAttendance(e) {
        let studentId = e.target.id[0];
        if (e.target.id[2] === "-") {
            studentId = e.target.id.slice(0, 2);
        }
        studentId += "-student";
        let currentAttendance = attendance[studentId];
        if (currentAttendance === "P") {
            setAttendance({ ...attendance, [studentId]: "A" });
        } else if (currentAttendance === "A") {
            setAttendance({ ...attendance, [studentId]: "T" });
        } else {
            setAttendance({ ...attendance, [studentId]: "P" });
        }
    }

    function handleNote(e) {
        let noteId = e.currentTarget.id;
        console.log(e.currentTarget);
        // if note is not active, add the active class and set it to true
        setNote({
            ...note,
            [noteId]: !note[noteId],
        });
    }

    function handleDelete(e) {
        setStudentToDelete(e.currentTarget.id.split("-")[0]);
        setShowModal(true);
    }

    function handleModal(e) {
        setShowModal(false);
        e.target.name === "delete" && props.deleteStudent(studentToDelete);
    }

    const studentButtons = props.studentList[classKey].map((student, i) => {
        const studentId = i + "-student";
        const n = i < 1 ? console.log("note in buttons ", note) : null;

        return (
            <React.Fragment>
                {showModal && (
                    <Confirm
                        item={studentToDelete}
                        showModal={showModal}
                        handleModal={handleModal}
                        warningMessageString={`Permanently delete ${studentToDelete}?`}
                    />
                )}
                <div
                    className={
                        props.toggleDelete ? "student delete" : "student"
                    }
                    name="student-info"
                    id={student + "-info"}
                    onClick={props.toggleDelete ? handleDelete : undefined}
                >
                    <div className="flex-space-between">
                        {/* Student Button with their name */}
                        <input
                            className="tl-round student-button button"
                            type="button"
                            key={student}
                            id={i + "-" + student}
                            name="name"
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
                            className="button absent note"
                            name="note1"
                            type="button"
                            id={i + "-note1"}
                            data-toggle={note[i + "-note1"]}
                            onClick={handleNote}
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
                            name="note4"
                            type="text"
                            id={i + "-custom-note"}
                            placeholder="?"
                            data-toggle="off"
                            defaultValue=""
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </React.Fragment>
        );
    });
    return studentButtons;
}

export default connect(mapStateToProps, mapDispatchToProps)(ListStudents);
