import React from "react";
import { Button } from "react-bootstrap"
import { connect } from "react-redux";
import { updatePage, updateStudentList } from "../Redux/actions";
import { useViewport } from "../utils/utilities";
import DesktopStudentInfo from "./DesktopStudentInfo";
import DropDownStudentInfo from "./DropDown/DropDownStudentInfo";
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
    
    updatePage,
    updateStudentList,
};

function ListStudentsInfo(props) {
    const uncleanCurrentGb = props.gradebook;
    const uncleanCurrentClass = props.class;
    let studentInfoArr = [];
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

    //placed outside of getTotalPoints so only needs to be found once for all students rather than on each call to getTotalPoints
    let pointsPossible = Number(props.studentInfo[classKey].totalPoints);

    function getFilteredEntries(studentArr) {
        let startIndex;
        let endIndex;

        if (Array.isArray(studentArr)) {
            startIndex = studentArr.findIndex(
                (student) => new Date(student.date) >= new Date(props.startDate)
            );
            endIndex = studentArr.findIndex(
                (student) => new Date(student.date) > new Date(props.endDate)
            );
        }
        if (startIndex < 0) {
            return [];
        }
        if (endIndex < 0) {
            return studentArr.slice(startIndex);
        } else {
            return studentArr.slice(startIndex, endIndex);
        }
    }

    function getTotalPoints(student) {
        const pointsArray = [];
        const studentArr = props.studentInfo[classKey][student];

        if (props.startDate) {
            const filteredEntries = getFilteredEntries(studentArr);
            filteredEntries.forEach((entry) => pointsArray.push(+entry.points));
            pointsPossible = filteredEntries.length * props.dailyPoints;
        } else if (Array.isArray(studentArr)) {
            studentArr.forEach((entry) => {
                pointsArray.push(+entry.points);
            });
        }

        return pointsArray.reduce((a, b) => a + b, 0);
    }

    function getGradePercentage(student) {
        const pointsArray = [];
        const studentArr = props.studentInfo[classKey][student];

        if (props.startDate) {
            const filteredEntries = getFilteredEntries(studentArr);
            filteredEntries.forEach((entry) => pointsArray.push(+entry.points));
            pointsPossible = filteredEntries.length * props.dailyPoints;
        } else if (Array.isArray(studentArr)) {
            studentArr.forEach((entry) => {
                pointsArray.push(+entry.points);
            });
        }

        return (
            Math.round(
                (pointsArray.reduce((a, b) => a + b, 0) / pointsPossible) * 100
            ) + "%"
        );
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
        let studentArr = props.studentInfo[classKey][student];

        if (Array.isArray(studentArr)) {
            if (props.startDate) {
                const filteredEntries = getFilteredEntries(studentArr);
                studentArr = filteredEntries;
            }
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
        return notesSummary;
    }

    function getAbsences(student) {
        let aCount = 0;
        let studentArr = props.studentInfo[classKey][student];

        if (Array.isArray(studentArr)) {
            if (props.startDate) {
                const filteredEntries = getFilteredEntries(studentArr);
                studentArr = filteredEntries;
            }
            studentArr.forEach((entry) =>
                entry.attendance === "A" ? aCount++ : null
            );
        }
        return aCount;
    }
    function getTardies(student) {
        let tCount = 0;
        let studentArr = props.studentInfo[classKey][student];

        if (Array.isArray(studentArr)) {
            if (props.startDate) {
                const filteredEntries = getFilteredEntries(studentArr);
                studentArr = filteredEntries;
            }
            studentArr.forEach((entry) =>
                entry.attendance === "T" ? tCount++ : null
            );
        }
        return tCount;
    }
    function handleCopy() {
      navigator.permissions.query({name: "clipboard-write"}).then((result) => {
        if (result.state === "granted" || result.state === "prompt") {
          /* write to the clipboard now */
          async function writeToClipboard(){
            try {
              const grades = JSON.stringify(studentInfoArr);
              console.log(grades)
              await navigator.clipboard.writeText(grades);
            } catch (error) {
              alert(error)
            }
          }
          writeToClipboard()
        } else {
          console.log('not permitted')
        }
      });
    }

    
    
    const studentInfo = Object.keys(props.studentInfo[classKey]).map(
        (student, i) => {
            if (student !== "dateLastSubmitted" && student !== "totalPoints") {
                studentInfoArr.push({
                  student:student,
                  totalPoints: getTotalPoints(student, "points"),
                  pointsPossible: pointsPossible,
                  gradePercentage: getGradePercentage(student),
                  notes: getNotes(student),
                  absences: getAbsences(student),
                  tardies: getTardies(student),
                })
                return (
                    <React.Fragment key={student + "-info"}>
                        {screenWidth < breakpoint ? (
                            <div
                                className={"student"}
                                name="student-info"
                                
                            >
                                <DropDownStudentInfo
                                    student={student}
                                    className="student-info-button"
                                    totalPoints={getTotalPoints(
                                        student,
                                        "points"
                                    )}
                                    pointsPossible={pointsPossible}
                                    gradePercentage={getGradePercentage(
                                        student
                                    )}
                                    notes={getNotes(student)}
                                    absences={getAbsences(student)}
                                    tardies={getTardies(student)}
                                    id={i + student}
                                    key={i + student + "-key"}
                                />
                            </div>
                        ) : (
                            <DesktopStudentInfo
                                student={student}
                                totalPoints={getTotalPoints(student, "points")}
                                pointsPossible={pointsPossible}
                                gradePercentage={getGradePercentage(student)}
                                notes={getNotes(student)}
                                absences={getAbsences(student)}
                                tardies={getTardies(student)}
                                key={i + student + "-dKey"}
                            />
                        )}
                    </React.Fragment>
                );
            }
            return null;
        }
    );
    // checks screen size and displays different view.
    return screenWidth < breakpoint ? (
        studentInfo
    ) : (
      <>
       <div className="d-flex justify-content-end">
          

       </div>
        <div className="d-flex justify-content-center">
            <table className="app-container">
                <thead>
                    <tr>
                        <th className="wide"><div><Button size="sm" variant="secondary" onClick={handleCopy}>Copy Grades</Button></div>Student</th>
                        <th className="narrow">Total Points</th>
                        <th className="narrow">Points Possible</th>
                        <th className="narrow">Grade Percentage</th>
                        <th className="wide">Notes Summary</th>
                        <th className="narrow">Absences</th>
                        <th className="narrow">Tardies</th>
                    </tr>
                </thead>
                <tbody>{studentInfo}</tbody>
            </table>
        </div>
        </>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ListStudentsInfo);
