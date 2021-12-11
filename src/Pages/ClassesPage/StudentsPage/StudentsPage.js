import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import { updatePage, updateStudentList } from "../../../Redux/actions";
import { saveRoster } from "../../../Lib/saveRoster";

const mapStateToProps = (state) => ({
    currentPage: state.currentPage,
    class: state.class,
    student: state.student,
    studentList: state.studentList,
});

const mapDispatchToProps = {
    updatePage,
    updateStudentList,
};

function StudentsPage(props) {
    const [currentRoster, setCurrentRoster] = useState("");
    //const [saveRoster, setSaveRoster] = useState("");

    function handleChange(e) {
        saveRoster(e)
    }

    function handleSave(e) {
        
    }

    function ListStudents() {}

    function AddStudents() {
        return (
            <React.Fragment>
                <div className="form-container">
                    <label htmlFor="upoload-roster">Upload Roster</label>
                    <div className="input-group mb-3 d-flex justify-content-center justify-content-md-start">
                        <input
                            id="upload-roster"
                            type="file"
                            accept=".csv"
                            placeholder="class Name"
                            className="file"
                            onChange={handleChange}
                        />
                        <div className="input-group-append">
                            <label
                                className="input-group-text"
                                htmlFor="upload-roster"
                                id="save-roster"
                                onClick={handleSave}
                            >
                                save
                            </label>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <h1 className="header">{props.class}</h1>
            <hr />
            {props.studentsList ? <ListStudents /> : <AddStudents />}
        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentsPage);
