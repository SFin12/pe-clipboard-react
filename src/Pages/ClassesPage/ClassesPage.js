import React, { useState } from "react";
import { connect } from "react-redux";
import { createClass, updateClassList, deleteClass } from "../../Redux/actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import "./ClassesPage.scss";
import Confirm from "../../components/ConfirmModal";

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
    deleteClass,
};

function ClassesPage(props) {
    const [toggleAdd, setToggleAdd] = useState(false);
    const [toggleDelete, setToggleDelete] = useState(true);
    const [buttonClass, setButtonClass] = useState("class-button");
    const [newClass, setNewClass] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState("");

    function ListClasses() {
        const gb = props.gradebook;
        console.log(gb);
        if (props.classList[gb] && props.classList[gb].length > 0) {
            console.log("listClasses", props.classList[gb]);
            return (
                <React.Fragment>
                    <div className="d-flex flex-column align-items-center">
                        {props.classList[gb].map((c, i) => (
                            <button
                                key={c + i}
                                className={buttonClass}
                                onClick={handleClick}
                                id={c}
                            >
                                {c}
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
        if (e.currentTarget.id === "add-class-button") {
            setToggleAdd(!toggleAdd);
        }
        if (e.target.id === "save-class") {
            setToggleAdd(!toggleAdd);
            props.createClass(newClass);
            props.updateClassList(newClass);
        } else if (e.currentTarget.id === "delete-a-class") {
            setToggleDelete(!toggleDelete);

            if (toggleDelete) {
                setButtonClass("delete-class-button");
            } else {
                setButtonClass("class-button");
            }
        } else if (e.target.className === "delete-class-button") {
            setShowModal(true);
            setItemToDelete(e.target.id);
        }
    }

    function handleModal(e) {
        setShowModal(false);
        console.log("delete button: ", e.target.name);
        e.target.name === "delete" && props.deleteClass(itemToDelete);
    }

    console.log("classList: ", props.classList);
    // Main return for ClassPage
    return (
        <React.Fragment>
            {showModal && (
                <Confirm
                    item={itemToDelete}
                    showModal={showModal}
                    handleModal={handleModal}
                />
            )}
            <h1 className="header">Classes</h1>
            <hr />
            <div className="d-flex justify-content-center">
                <span>
                    <h2 className="subtitle mb-4">{props.gradebook}</h2>
                </span>
            </div>
            <div>
                {toggleAdd ? (
                    inputClass
                ) : (
                    <div>
                        <ListClasses />
                        <div className="d-flex justify-content-around">
                            <div id="add-class-button" onClick={handleClick}>
                                <FontAwesomeIcon
                                    name="add-icon"
                                    icon={faPlusCircle}
                                    className="plus-icon mt-4"
                                />
                            </div>

                            <div onClick={handleClick} id="delete-a-class">
                                <FontAwesomeIcon
                                    name="delete-icon"
                                    icon={faMinusCircle}
                                    className={
                                        toggleDelete
                                            ? "minus-icon mt-4"
                                            : "minus-icon mt-4 highlight"
                                    }
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassesPage);
