import React, { useState } from "react";
import { connect } from "react-redux";
import DropDown from "../../../components/DropDown/DropDown";
import {
    updatePage,
    updateStudentList,
    deleteStudentList,
} from "../../../Redux/actions";
import { saveRoster } from "../../../Lib/saveRoster";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router";

const mapStateToProps = (state) => ({
    currentPage: state.currentPage,
    class: state.class,
    student: state.student,
    studentList: state.studentList,
});

const mapDispatchToProps = {
    updatePage,
    updateStudentList,
    deleteStudentList,
};

function RosterPage(props) {
    const [roster, setRoster] = useState("");
    const history = useHistory();

    function handleChange(e) {
        saveRoster(e, (response) => {
            setRoster(response);
            props.deleteStudentList();
            props.updateStudentList(response);
        });
        //props.updateStudentList(response);

        setTimeout(() => {
            history.push("/students");
        }, 1500);
    }

    function ListStudents() {}

    function AddStudents() {
        return (
            <React.Fragment>
                <div className="form-container">
                    <section>
                        <DropDown
                            buttonTitle="Uploading Rosters"
                            content="To upload a roster, the file should be saved as a csv file (ends with .csv). When creating the file through excel, sheets, numbers or a similar spreadsheet program, place all students in the first column with one student in each row.  If you want names to be alphabatized, place last names first folowed by a comma then first names."
                        />
                    </section>
                    <br />
                    <Button
                        variant={roster ? "success" : "primary"}
                        className="mb-4"
                    >
                        <label htmlFor="upload-roster" className="">
                            {roster ? "Success" : "Upload File"}
                        </label>
                    </Button>
                    <div className="input-group mb-3 d-flex justify-content-center justify-content-md-start">
                        <input
                            id="upload-roster"
                            type="file"
                            accept=".csv"
                            className="file"
                            onChange={handleChange}
                            hidden
                        />
                        <div className="input-group-append">
                            <p>
                                ( WARNING: Uploading a roster will overwrite
                                your current roster! )
                            </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(RosterPage);
