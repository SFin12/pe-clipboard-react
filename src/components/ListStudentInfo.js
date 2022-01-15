import React, { useEffect } from "react";
import { connect } from "react-redux";
import { updatePage, updateStudentList, deleteStudent } from "../Redux/actions";
import { useViewport } from "../utils/utilities";
import DesktopStudentInfo from "./DesktopStudentInfo";
import DropDownBs from "./DropDown/DropDownBs";
import "./ListStudentInfo.scss";

const mapStateToProps = (state) => ({
    currentPage: state.currentPage,
    gradebook: state.gradebook,
    class: state.class,
    student: state.student,
    studentList: state.studentList,
    studentInfo: state.studentInfo,
    dailyPoints: state.settings.dailyPoints,
    settings: state.settings,
});

const mapDispatchToProps = {
    deleteStudent,
    updatePage,
    updateStudentList,
};

function ListStudentsInfo(props) {
    const uncleanCurrentGb = props.gradebook;
    const uncleanCurrentClass = props.class;
    const { screenWidth } = useViewport();
    const breakpoint = 800;
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
    // useEffect(() => {
    //     const students = Object.keys(props.studentInfo[classKey]);
    //     console.log("StudentInfo Students:", students);
    // }, []);

    function getTotalPoints(student) {
        const pointsArray = [];
        const studentArr = props.studentInfo[classKey][student];
        if (Array.isArray(studentArr)) {
            studentArr.forEach((entry) => {
                pointsArray.push(+entry.points);
            });
        }

        return pointsArray.reduce((a, b) => a + b, 0);
    }

    function getNotes(student) {
        const [note1, note2, note3] = [
            props.settings.note1,
            props.settings.note2,
            props.settings.note3,
        ];
        let n1Count = 0;
        let n2Count = 0;
        let n3Count = 0;

        const notesArray = [];
        const studentArr = props.studentInfo[classKey][student];
        if (Array.isArray(studentArr)) {
            studentArr.forEach((entry) => {
                if (Array.isArray(entry.notes)) {
                    entry.notes.forEach((note) => {
                        if (note === note1) {
                            n1Count++;
                        } else if (note === note2) {
                            n2Count++;
                        } else if (note === note3) {
                            n3Count++;
                        } else {
                            notesArray.push(" " + note);
                        }
                    });
                }
            });
        }
        let notesSummary = "";
        if (n1Count) {
            notesSummary += `${note1}:${n1Count} `;
        }
        if (n2Count) {
            notesSummary += `${note2}:${n2Count} `;
        }
        if (n3Count) {
            notesSummary += `${note3}:${n3Count} `;
        }
        if (notesArray.length > 0) {
            notesSummary += "other:" + notesArray;
        }
        return notesSummary + notesArray;
    }

    function getAbsences(student) {
        let aCount = 0;

        const studentArr = props.studentInfo[classKey][student];
        if (Array.isArray(studentArr)) {
            studentArr.forEach((entry) =>
                entry.attendance === "A" ? aCount++ : null
            );
        }
        return aCount;
    }
    function getTardies(student) {
        let tCount = 0;

        const studentArr = props.studentInfo[classKey][student];
        if (Array.isArray(studentArr)) {
            studentArr.forEach((entry) =>
                entry.attendance === "T" ? tCount++ : null
            );
        }
        return tCount;
    }

    const studentInfo = Object.keys(props.studentInfo[classKey]).map(
        (student, i) => {
            if (student !== "dateLastSubmitted" || student !== "totalPoints") {
                return (
                    <React.Fragment>
                        {screenWidth < breakpoint ? (
                            <div
                                className={"student"}
                                name="student-info"
                                key={student + "-info"}
                            >
                                <DropDownBs
                                    student={student}
                                    totalPoints={getTotalPoints(
                                        student,
                                        "points"
                                    )}
                                    gradePercentage={"90%"}
                                    notes={getNotes(student)}
                                    absences={getAbsences(student)}
                                    tardies={getTardies(student)}
                                />
                            </div>
                        ) : (
                            <DesktopStudentInfo
                                student={student}
                                totalPoints={getTotalPoints(student, "points")}
                                gradePercentage={"90%"}
                                notes={getNotes(student)}
                                absences={getAbsences(student)}
                                tardies={getTardies(student)}
                            />
                        )}
                    </React.Fragment>
                );
            }
        }
    );
    return screenWidth < breakpoint ? (
        studentInfo
    ) : (
        <div className="d-flex justify-content-center">
            <table className="app-container">
                <thead>
                    <tr>
                        <th className="wide">Student</th>
                        <th className="narrow">Total Points</th>
                        <th className="narrow">Grade Percentage</th>
                        <th className="wide">Notes Summary</th>
                        <th className="narrow">Absences</th>
                        <th className="narrow">Tardies</th>
                    </tr>
                </thead>
                <tbody className>{studentInfo}</tbody>
            </table>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ListStudentsInfo);
