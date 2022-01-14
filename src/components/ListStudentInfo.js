import React from "react";
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

    const studentInfo = props.studentList[classKey].map((student, i) => {
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
                            totalPoints={10}
                            gradePercentage={"90%"}
                            notes={""}
                            absences={5}
                            tardies={2}
                        />
                    </div>
                ) : (
                    <DesktopStudentInfo
                        student={student}
                        totalPoints={10}
                        gradePercentage={"90%"}
                        notes={""}
                        absences={5}
                        tardies={2}
                    />
                )}
            </React.Fragment>
        );
    });
    return (
        <div className="d-flex justify-content-center">
            <table className="app-container">
                <thead>
                    <tr>
                        <th className="studentCol">Student</th>
                        <th>Total Points</th>
                        <th>Grade Percentage</th>
                        <th>Notes Summary</th>
                        <th>Absences</th>
                        <th>Tardies</th>
                    </tr>
                </thead>
                <tbody className>{studentInfo}</tbody>
            </table>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ListStudentsInfo);
