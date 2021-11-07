import React, { useState } from "react";
import { connect } from "react-redux";
import { createClass, updateClassList } from "../../Redux/actions";
import { Header } from "../../components/Header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";

import "./ClassesPage.scss";

const mapStateToProps = (state) => {
    return {
        gradebook: state.gradebook,
        classList: state.classList,
        currentPage: state.currentPage,
    };
};

const mapDispatchToProps = {
    createClass,
    updateClassList,
};

function ClassesPage(props) {
    const [toggleAdd, setToggleAdd] = useState(false);
    const [newClass, setNewClass] = useState("");
    console.log(props);

    function ListClasses() {
        if (props.classList.length > 0) {
            console.log("props CL ", props.classList);

            return (
                <React.Fragment>
                    <div className="d-flex flex-column align-items-center">
                        {props.classList.map((c, i) => (
                            <button
                                key={c.className + i}
                                className="class-button"
                            >
                                {c.className}
                            </button>
                        ))}
                    </div>
                </React.Fragment>
            );
        } else {
            return null;
        }
    }

    const inputClass = (
        <React.Fragment>
            <div className="form-container">
                <label htmlFor="create-class">Create class</label>
                <div className="input-group mb-3 d-flex justify-content-center justify-content-md-start">
                    <input
                        id="create-class"
                        type="text"
                        value={newClass}
                        placeholder="class Name"
                        className="text-input"
                        onChange={handleChange}
                    />
                    <div className="input-group-append">
                        <label
                            className="input-group-text"
                            htmlFor="create-class"
                            id="save-class"
                            onClick={handleClick}
                        >
                            save
                        </label>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );

    function handleChange(e) {
        setNewClass(e.target.value);
    }

    function handleClick(e) {
        setToggleAdd(!toggleAdd);
        if (e.target.id === "save-class") {
            props.createClass(newClass);
            props.updateClassList(newClass);
        }
    }
    // Main return for ClassPage
    return (
        <React.Fragment>
            <Header header={props.currentPage} />
            <div className="d-flex justify-content-center">
                <span>
                    <h2 className="subtitle mb-4">
                        {props.gradebook.gradebookName}
                    </h2>
                </span>
            </div>
            <div>
                {toggleAdd ? (
                    inputClass
                ) : (
                    <div>
                        <ListClasses />
                        <div className="d-flex justify-content-center">
                            <FontAwesomeIcon
                                icon={faPlusCircle}
                                className="plus-icon mt-4"
                                onClick={handleClick}
                            />
                        </div>
                    </div>
                )}
            </div>
        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassesPage);
