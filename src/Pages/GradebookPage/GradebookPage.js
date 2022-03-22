import React, { useEffect, useRef, useState } from "react";

import { connect } from "react-redux";
import {
    createGradebook,
    updateGradebookList,
    updatePage,
    deleteGradebook,
} from "../../Redux/actions";
import {
    DropDownClick,
    DropDownHover,
} from "../../components/DropDown/DropDown";
import "./GradebookPage.scss";
import Confirm from "../../components/ConfirmModal";
import { useNavigate } from "react-router-dom";

const mapStateToProps = (state) => {
    return {
        gradebook: state.gradebook,
        gradebookList: state.gradebookList,
        currentPage: state.currentPage,
    };
};

const mapDispatchToProps = {
    createGradebook,
    updateGradebookList,
    updatePage,
    deleteGradebook,
};

function GradebookPage(props) {
    const [input, setInput] = useState("");
    const [choice, setChoice] = useState("");
    const [toggleDelete, setToggleDelete] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const selectRef = useRef(choice);

    const navigate = useNavigate();

    useEffect(() => {
        const select = document.getElementById("select-gradebook");
        if (select) {
            setChoice(select.value);
        }
    }, [choice]);

    function handleChange(e) {
        // If gradebook is being created
        if (e.target.id === "create-gradebook") {
            setInput(e.target.value);
            // If gradebook is being selected
        } else {
            setChoice(e.target.value);
        }
    }

    function handleClick(e) {
        // If gradebook was created and saved
        if (e.target.id === "save-gradebook") {
            props.createGradebook(input);
            props.updateGradebookList(input);
            navigate("/classes");
        } else {
            /* If gradebook was selected and saved */
            if (!toggleDelete) {
                props.createGradebook(choice);
                props.updateGradebookList(choice);
                navigate("/classes");
            } else {
                setShowConfirmModal(true);
            }
        }
    }

    function handleDelete() {
        toggleDelete ? setToggleDelete(false) : setToggleDelete(true);
        setChoice("");
    }

    function handleModal(e) {
        // close delete modal after cancel or delete.
        setShowConfirmModal(false);
        // if user confirms delete, delete selected class from redux and firebase.
        e.target.name === "delete" && props.deleteGradebook(choice);
        props.createGradebook("");
        setChoice("");
        console.log("post modal ", choice);
    }

    function ListGradebooks() {
        if (props.gradebookList.length > 0) {
            let selectClass = "custom-select";
            toggleDelete
                ? (selectClass = "custom-select-delete")
                : (selectClass = "custom-select");
            return (
                <React.Fragment>
                    <p>or</p>
                    <label htmlFor="select-gradebook">Change Gradebook</label>

                    <div className="input-group mb-3 d-flex justify-content-center justify-content-md-start">
                        <select
                            className={selectClass}
                            id="select-gradebook"
                            onChange={handleChange}
                            value={choice}
                            ref={selectRef}
                        >
                            {props.gradebookList.map((gradebook, i) => {
                                return (
                                    <option
                                        key={"gb" + i}
                                        value={gradebook}
                                        name={gradebook}
                                    >
                                        {gradebook}
                                    </option>
                                );
                            })}
                        </select>
                        <div
                            className="input-group-append"
                            onClick={handleClick}
                            id="save-gradebook"
                        >
                            <label
                                className="input-group-text"
                                htmlFor="inputGroupSelect02"
                                id="save-gradebook-label"
                            >
                                save
                            </label>
                        </div>
                    </div>
                </React.Fragment>
            );
        } else {
            return null;
        }
    }

    return (
        <React.Fragment>
            <h1 className="header">Gradebook</h1>
            <hr />
            <div className="form-container">
                <section>
                    <DropDownHover
                        buttonTitle="First Gradebook?"
                        content='Before adding classes, create a gradebook name such as "First Semester" or "Spring 22". Start a new gradebook for each grading period. To customize daily points and notes change them in settings.'
                    />
                </section>
                <br />

                <label htmlFor="create-gradebook">Create Gradebook</label>
                <div className="input-group mb-3 d-flex justify-content-center justify-content-md-start">
                    <input
                        id="create-gradebook"
                        type="text"
                        value={input}
                        placeholder="Gradebook Name"
                        className="text-input"
                        onChange={handleChange}
                    />
                    <div className="input-group-append">
                        <label
                            className="input-group-text"
                            htmlFor="create-gradebook"
                            id="save-gradebook"
                            onClick={handleClick}
                        >
                            save
                        </label>
                    </div>
                </div>

                <ListGradebooks />
                <span>
                    <div>
                        Current Gradebook:
                        <span>
                            <h4 className="inline"> {props.gradebook}</h4>
                        </span>
                    </div>
                </span>
                {props.gradebookList.length ? (
                    <div className="mt-4">
                        <DropDownClick
                            toggleDelete={handleDelete}
                            buttonTitle="Delete gradebook?"
                            content="You will lose all classes and information associated with a deleted gradebook.  Make sure you no longer need the information."
                        />
                    </div>
                ) : null}
                <Confirm
                    item={choice}
                    showModal={showConfirmModal}
                    handleModal={handleModal}
                    warningMessageString={
                        "are you sure you want to delete " + choice + "?"
                    }
                />
            </div>
        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(GradebookPage);
