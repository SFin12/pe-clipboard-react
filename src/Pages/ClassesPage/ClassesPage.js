import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
    createClass,
    updateClassList,
    deleteClass,
    updatePage,
} from "../../Redux/actions";
import { useHistory } from "react-router";
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
    updatePage,
};

function ClassesPage(props) {
    const [toggleAdd, setToggleAdd] = useState(false);
    const [toggleDelete, setToggleDelete] = useState(false);
    const [buttonClass, setButtonClass] = useState("class-button");
    const [newClass, setNewClass] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState("");
    const history = useHistory();
    const gb = props.gradebook;

    useEffect(() => {
        if (toggleDelete) {
            //highlights classes in red to show they can be deleted.
            setButtonClass("delete-class-button");
            
            //removes red highlight, clickon on them will not delete but rather take you to student page.
        } else {
            setButtonClass("class-button");
        }
    }, [toggleDelete]);

    function ListClasses() {
        if (props.classList[gb] && props.classList[gb].length > 0) {
            return (
                <React.Fragment>
                    <div className="d-flex flex-column align-items-center">
                        {props.classList[gb].map((c, i) => (
                            <button
                                key={c + i}
                                className={buttonClass}
                                onClick={toggleDelete ? handleDelete : handleClassClick }
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
                            onClick={handleAdd}
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

    function handleClassClick(e) {
        const classId = e.target.id;
        if (buttonClass !== "delete-class-button") {
            props.createClass(classId);

            //redirects to studentsPage
            history.push("/students");
        }
    }

    function handleAdd(e) {
        if (e.currentTarget.id === "add-class-button") {
            setToggleAdd(!toggleAdd);
        }
        if (e.target.id === "save-class") {
            setToggleAdd(!toggleAdd);
            if (
                !props.classList[gb].some(
                    (existingClass) => existingClass === newClass
                )
            ) {
                props.createClass(newClass);
                props.updateClassList(newClass);
            }
        }
    }

    function handleDelete(e) {
        if (toggleDelete) {
            setShowModal(true);
            setItemToDelete(e.target.id);
        }
    }

    function handleModal(e) {
        setShowModal(false);
        e.target.name === "delete" && props.deleteClass(itemToDelete);
    }

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
            <div className="form-container">
                {toggleAdd ? (
                    inputClass
                ) : (
                    <div>
                        <ListClasses />
                        <div className="d-flex justify-content-around">
                            <div id="add-class-button" onClick={handleAdd}>
                                <FontAwesomeIcon
                                    name="add-icon"
                                    icon={faPlusCircle}
                                    className="plus-icon mt-4"
                                />
                            </div>

                            <div
                                onClick={() => setToggleDelete(!toggleDelete)}
                                id="delete-a-class"
                            >
                                <FontAwesomeIcon
                                    name="delete-icon"
                                    icon={faMinusCircle}
                                    className={
                                        toggleDelete
                                            ? "minus-icon mt-4 highlight"
                                            : "minus-icon mt-4"
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
