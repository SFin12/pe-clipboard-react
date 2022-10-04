import React, { useState } from "react";
import { connect } from "react-redux";
import { DropDownHover } from "../../../components/DropDown/DropDown";
import {
    updatePage,
    updateStudentList,
  
    deleteRoster,
} from "../../../Redux/actions";
import { saveRoster } from "../../../Lib/saveRoster";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import ListStudents from "../../../components/ListStudents"

const mapStateToProps = (state) => ({
    currentPage: state.currentPage,
    class: state.class,
    student: state.student,
    studentList: state.studentList,
});

const mapDispatchToProps = {
    updatePage,
    updateStudentList,
 
    deleteRoster,
};

function RosterPage(props) {
    const [roster, setRoster] = useState("");
    const navigate = useNavigate();

    function handleChange(e) {
        saveRoster(e, (response) => {
            setRoster(response);
            props.deleteRoster();
            props.updateStudentList(response);
        });
        //props.updateStudentList(response);

        setTimeout(() => {
            navigate("/students");
        }, 1500);
    }

    

    function AddStudents() {
        return (
            <React.Fragment>
                <div className="form-container">
                    <section>
                        <DropDownHover
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
            {props.hideHeader ? null : (
                <div>
                    <div className="d-inline">
                        <h1 className="header">{props.class}</h1>
                        <FontAwesomeIcon
                            name="left-arrow"
                            icon={faArrowLeft}
                            color="green"
                            className="back-arrow"
                            onClick={() => navigate(-1)}
                        />
                    </div>
                    <hr />
                </div>
            )}
            {props.studentsList ? <ListStudents /> : <AddStudents />}
        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(RosterPage);
