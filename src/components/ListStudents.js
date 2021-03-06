import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updatePage, updateStudentList, deleteStudent } from "../Redux/actions";
import Confirm from "./ConfirmModal";

const mapStateToProps = (state) => ({
    currentPage: state.currentPage,
    gradebook: state.gradebook,
    class: state.class,
    student: state.student,
    studentList: state.studentList,
    dailyPoints: state.settings.dailyPoints,
    settings: state.settings,
    studentInfo: state.studentInfo,
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

    const uncleanCurrentGb = props.gradebook;
    const uncleanCurrentClass = props.class;

    // removes symbols that can't be used in a javascript property/key name
    const currentGb = uncleanCurrentGb.replace(
        /[.,/#!$%^&*;:{}=\-_`~()]/g,
        " "
    );
    const currentClass = uncleanCurrentClass.replace(
        /[.,/#!$%^&*;:{}=\-_`~()]/g,
        " "
    );
    const classKey = currentGb + "-" + currentClass;

    //sets starting values for attendance and daily points
    const { studentList, studentInfo } = props;

    useEffect(() => {
        props.updatePage("Students");
        let todaysStudentInfoArr;
        const classInfo = studentInfo[classKey]; //check if any grades info have been saved for this class
        const dateLastSubmitted = classInfo // If class grades have been submitted, get last date submitted.
            ? classInfo.dateLastSubmitted
            : null;
        const todaysDate = new Date().toLocaleDateString();
        const alreadySubmitted =
            dateLastSubmitted === todaysDate ? true : false;
        if (alreadySubmitted) {
            let currentStudentInfo = Object.values(classInfo);

            // contains student info for todays date if info has been submitted.
            todaysStudentInfoArr = [];
            currentStudentInfo.forEach((student) => {
                // make sure it is a student object not date or string.
                if (Array.isArray(student)) {
                    todaysStudentInfoArr.push(
                        student.filter(
                            (todaysStudentInfo) =>
                                todaysStudentInfo.date === todaysDate
                        )
                    );
                }
            });
        }

        const studentsExist = studentList[classKey];

        if (studentsExist) {
            const totalStudents = studentList[classKey].length;
            setStudentPoints((studentPoints) => {
                let newState = {};
                for (let i = 0; i < totalStudents; i++) {
                    let studentName = studentList[classKey][i];
                    let studentInfo = null;
                    if (alreadySubmitted) {
                        studentInfo = todaysStudentInfoArr.filter(
                            (studentInfo) => studentInfo[0].name === studentName
                        )[0];
                    }
                    let studentId = i + "-student";
                    newState = {
                        ...newState,
                        [studentId]:
                            //if student points already exists, use that value, otherwise create it with starting daily points.
                            studentPoints[studentId] !== undefined
                                ? studentPoints[studentId]
                                : studentInfo !== null
                                ? studentInfo[0].points
                                : props.dailyPoints,
                        [studentId + "changed"]: 0,
                    };
                }

                return newState;
            });
            setAttendance((attendance) => {
                let newState = {};
                for (let i = 0; i < totalStudents; i++) {
                    let studentName = studentList[classKey][i];
                    let studentInfo = null;
                    if (alreadySubmitted) {
                        studentInfo = todaysStudentInfoArr.filter(
                            (studentInfo) => studentInfo[0].name === studentName
                        )[0];
                    }
                    let studentId = i + "-student";
                    newState = {
                        ...newState,
                        [studentId]:
                            attendance[studentId] !== undefined
                                ? attendance[studentId]
                                : studentInfo !== null
                                ? studentInfo[0].attendance
                                : "P",
                    };
                }

                return newState;
            });
            // sets all notes to not-clicked / off
            setNote((note) => {
                let newState = {};
                for (let i = 0; i < totalStudents; i++) {
                    let note1 = i + "-note1";
                    let note2 = i + "-note2";
                    let note3 = i + "-note3";
                    let note4 = i + "-note4";
                    newState = {
                        ...newState,
                        [note1]: note[note1] || false,
                        [note2]: note[note2] || false,
                        [note3]: note[note3] || false,
                        [note4]: note[note4] || false,
                    };
                    let studentName = studentList[classKey][i];
                    let studentInfo = null;
                    if (alreadySubmitted) {
                        studentInfo = todaysStudentInfoArr.filter(
                            (studentInfo) => studentInfo[0].name === studentName
                        )[0];
                        if (studentInfo[0].notes) {
                            for (let i in studentInfo[0].notes) {
                                console.log(props.settings.note1);
                                switch (studentInfo[0].notes[i]) {
                                    case props.settings.note1:
                                        newState = {
                                            ...newState,
                                            [note1]: true,
                                        };
                                        break;
                                    case props.settings.note2:
                                        newState = {
                                            ...newState,
                                            [note2]: true,
                                        };
                                        break;
                                    case props.settings.note3:
                                        newState = {
                                            ...newState,
                                            [note3]: true,
                                        };
                                        break;
                                    default:
                                        console.log("note: ", note);
                                        break;
                                }
                            }
                        }
                    }
                }

                return newState;
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [studentList]);

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
            [studentId + "changed"]: studentPoints[studentId + "changed"] - 1,
        }));
    }

    function handleIncrement(e) {
        //increase student points by one.
        let studentId = e.target.id[0];

        //if the number of target id is two digits...
        if (e.target.id[2] === "-") {
            studentId = e.target.id.slice(0, 2);
        }
        studentId += "-student";
        let currentPoints = studentPoints[studentId];
        ++currentPoints;
        setStudentPoints((prevState) => ({
            ...prevState,
            [studentId]: currentPoints,
            [studentId + "changed"]: studentPoints[studentId + "changed"] + 1,
        }));
    }

    function handleAttendance(e) {
        let buttonName = e.currentTarget.name;
        let studentId = e.target.id[0];
        let studentIdNumber = e.target.id[0];
        if (e.target.id[2] === "-") {
            studentId = e.target.id.slice(0, 2);
            studentIdNumber = e.target.id.slice(0, 2);
        }
        studentId += "-student";
        let currentAttendance = attendance[studentId];

        // Change current attendance to "A" (triggers class change on element)
        if (currentAttendance === "P") {
            setAttendance({ ...attendance, [studentId]: "A" });
        } else if (currentAttendance === "A") {
            setAttendance({ ...attendance, [studentId]: "T" });
        } else {
            setAttendance({ ...attendance, [studentId]: "P" });
        }

        handlePoints(e, studentIdNumber, buttonName);
    }

    function handleNote(e) {
        let noteId = e.currentTarget.id;
        let studentIdNumber;
        let buttonName = e.currentTarget.name;
        let noteName = e.currentTarget.name;

        // if note is not active, add the active class and set it to true.
        if (noteName !== "note4") {
            setNote({
                ...note,
                [noteId]: !note[noteId],
            });
            // getting the first character of the note id which is a number.
            studentIdNumber = e.target.id[0];
            // if the note id number is 2 digits...
            if (e.target.id[2] === "-") {
                studentIdNumber = e.target.id.slice(0, 2);
            }

            // check if custom note was clicked, if so, if user entered note, change button to active.
        } else if (noteName === "note4") {
            e.currentTarget.value.length > 0
                ? setNote({
                      ...note,
                      [noteId]: true,
                  })
                : setNote({
                      ...note,
                      [noteId]: false,
                  });
        }
        handlePoints(e, studentIdNumber, buttonName);
    }

    function handlePoints(e, studentIdNumber, buttonName) {
        const studentId = studentIdNumber + "-student";
        const buttonElements = Array.from(e.target.parentElement.children);
        const buttonsClicked = [];

        buttonElements.forEach((button, i) => {
            if (i === 0) {
                if (button.value === "A") {
                    buttonName !== "attendance"
                        ? buttonsClicked.push(props.settings.absentPoints)
                        : buttonsClicked.push(props.settings.tardyPoints);
                } else if (button.value === "T") {
                    if (buttonName !== "attendance") {
                        buttonsClicked.push(props.settings.tardyPoints);
                    }
                } else if (buttonName === "attendance") {
                    buttonsClicked.push(props.settings.absentPoints);
                }
            }
            // check to see if the notes are clicked.
            else if (i > 0 && i < 4) {
                let buttonClicked = button.getAttribute("data-note");
                let buttonClickedBool = buttonClicked === "true" ? true : false;
                if (buttonName === button.name) {
                    buttonClickedBool = !buttonClickedBool;
                }
                if (buttonClickedBool) {
                    buttonsClicked.push(props.settings[button.name + "Points"]);
                }
            }
        });
        let pointValues =
            buttonsClicked.length > 0
                ? buttonsClicked.reduce((total, current) => total + current)
                : 0;
        let pointsChanged = studentPoints[studentId + "changed"]; //add to currentPoints to subtract from customized points rather than base value set from daily points.
        let currentPoints =
            props.settings.dailyPoints + pointValues + pointsChanged;

        if (currentPoints < 0) {
            currentPoints = 0;
        }
        setStudentPoints((prevState) => ({
            ...prevState,
            [studentId]: currentPoints,
        }));
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

        return (
            <React.Fragment>
                <div
                    className={
                        props.toggleDelete ? "student delete" : "student"
                    }
                    name="student-info"
                    key={student + "-info"}
                    id={student + "-info"}
                    onClick={props.toggleDelete ? handleDelete : null}
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
                            onClick={
                                props.toggleDelete ? undefined : handleDecrement
                            }
                        />
                        <input
                            className="tr-round button daily-points "
                            key={student + "-points"}
                            name="daily-points"
                            type="button"
                            id={i + "-points"}
                            value={studentPoints[studentId]}
                            onClick={
                                props.toggleDelete ? undefined : handleIncrement
                            }
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
                            key={student + "-attendance"}
                            id={i + "-attendance"}
                            data-toggle="off"
                            value={attendance[studentId]}
                            onClick={
                                props.toggleDelete
                                    ? undefined
                                    : handleAttendance
                            }
                        />
                        <input
                            className="button absent note"
                            name="note1"
                            type="button"
                            id={i + "-note1"}
                            data-note={note[i + "-note1"]}
                            onClick={
                                props.toggleDelete ? undefined : handleNote
                            }
                            value={props.settings.note1}
                        />
                        <input
                            className="button absent note"
                            name="note2"
                            type="button"
                            id={i + "-note2"}
                            data-note={note[i + "-note2"]}
                            onClick={
                                props.toggleDelete ? undefined : handleNote
                            }
                            value={props.settings.note2}
                        />
                        <input
                            className="button absent note "
                            name="note3"
                            type="button"
                            id={i + "-note3"}
                            data-note={note[i + "-note3"]}
                            onClick={
                                props.toggleDelete ? undefined : handleNote
                            }
                            value={props.settings.note3}
                        />
                        <input
                            className="br-round button absent note "
                            style={{ textAlign: "center" }}
                            name="note4"
                            type="text"
                            key={student + "-note4"}
                            id={i + "-note4"}
                            placeholder="?"
                            data-note={note[i + "-note4"]}
                            defaultValue=""
                            onChange={
                                props.toggleDelete ? undefined : handleNote
                            }
                        />
                    </div>
                </div>
            </React.Fragment>
        );
    });
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
            {studentButtons}
        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ListStudents);
