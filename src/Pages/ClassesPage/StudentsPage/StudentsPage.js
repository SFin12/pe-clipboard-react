import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import { updatePage, updateStudentList } from "../../../Redux/actions";
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
};

function StudentsPage(props) {
    const classKey = props.gradebook + "-" + props.class;

    useEffect(() => {
        props.updatePage("Students");
    }, []);

    const history = useHistory();

    function ListStudents() {
        
        const studentButtons = props.studentList[classKey].map(
            (student, i) => {
                return (
                    <div class="student">
                        <div className="flex-space-between">
                       
                            {/* Student Button with their name */}
                            <input
                                className="tl-round student-button button"
                                type="button"
                                key={student}
                                id={student}
                                name="student"
                                value={student}
                            />
                            <input
                                className="tr-round button daily-points "
                                key={i + "-points"}
                                name="daily-points"
                                type="button"
                                id={i + "-points"}
                                value={props.dailyPoints}
                            />
                        </div>
                        {/* <div className="flex-space-between notes" data-toggle="off">
            <input className="bl-round button absent note" name="attendance" type="button" id="${i}-attendance" data-toggle="off" value="P" />
            <input className="button absent note " name="note1" type="button" id="${i}-note1" data-toggle="off" value="${note1}" />
            <input className="button absent note" name="note2" type="button" id="${i}-note2" data-toggle="off" value="${note2}" />
            <input className="button absent note " name="note3" type="button" id="${i}-note3" data-toggle="off" value="${note3}" />
            <input className="br-round button absent note " name="note4" type="button" id="${i}-note4" data-toggle="off" value="${note4}" />
          </div> */}
                    </div>
                );
            }
        );
        return studentButtons;
    }

    function addStudents() {
        history.push("/roster");
    }

    return (
        <React.Fragment>
            <h1 className="header">{props.class}</h1>
            <hr />
            <div className="form-container">
                {props.studentList[classKey] ? (
                    <ListStudents />
                ) : (
                    addStudents
                )}
            </div>
        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentsPage);
