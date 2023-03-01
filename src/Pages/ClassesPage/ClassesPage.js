import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
    createClass,
    updateClassList,
    deleteClass,
    updatePage,
    updateCleanGradebook
} from "../../Redux/actions";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import "./ClassesPage.scss";
import Confirm from "../../components/ConfirmModal";
import { updateDbCurrentClass } from "../../Lib/LinkReduxToDb"

const mapStateToProps = (state) => {
    return {
        id: state.id,
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
    updateCleanGradebook,
};

function ClassesPage(props) {
    const [toggleDelete, setToggleDelete] = useState(false);
    const [buttonClass, setButtonClass] = useState("class-button");
    const [newClass, setNewClass] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState("");
    const [showAddClassModal, setShowAddClassModal] = useState(false);
    const navigate = useNavigate();
    const uncleanGb = props.gradebook;
    const gb = uncleanGb.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, " ");
    
    useEffect(() => {
      props.updatePage("Classes")
      if(gb){
        props.updateCleanGradebook(gb)

      }
    }, [gb, props])

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
                        {props.classList[gb].map((c, i) => {
                          
                          return (
                            <button
                                key={c.name + i}
                                className={buttonClass}
                                onClick={
                                    toggleDelete
                                        ? handleDelete
                                        : () => handleClassClick(c)
                                }
                                id={c.name}
                                
                                
                            >
                                {c.name}
                            </button>
                          )
        })}
                    </div>
                </React.Fragment>
            );
        } else {
            return null;
        }
    }

    const inputClassModal = (
        <Modal
            show={showAddClassModal}
            centered
            size="sm"
            className="p-4 p-sm-2 p-md-2y"
            onHide={() => setShowAddClassModal(false)}
        >
            <Modal.Header closeButton className="light-header font-weight-bold">
                <Modal.Title className="font-weight-bold text-dark">
                    Add Classes
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-dark">
                <label htmlFor="create-class text-align-center">
                    Add Class
                </label>
                <div className="input-group mb-3 d-flex justify-content-start">
                    <input
                        id="create-class"
                        type="text"
                        value={newClass.name}
                        placeholder="Class Name"
                        className="text-input"
                        onChange={handleChange}
                        onKeyDown={handleSave}
                    />
                </div>
                <p>Press Enter or click add</p>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between">
                <Button
                    className="m-1 green-button text-dark"
                    name="cancel"
                    id="save-class"
                    onClick={handleSave}
                >
                    Add
                </Button>
                <Button
                    className="ml-1 grey-button text-dark"
                    name="finished"
                    onClick={() => setShowAddClassModal(false)}
                >
                    Finished
                </Button>
            </Modal.Footer>
        </Modal>
    );

    function handleSave(e) {
        if (
            (newClass?.name && e.key === "Enter") ||
            (newClass?.name && e.target.id === "save-class")
        ) {
            if (
                !props.classList[gb] ||
                !props.classList[gb].some(
                    (existingClass) => existingClass.name === newClass.name
                )
            ) {
                props.createClass(newClass.name);
                props.updateClassList(newClass);
                setNewClass({});
            }
        }
    }

    function handleChange(e) {
        if (e.target.id === "create-class") {
            setNewClass({name: e.target.value, start: 0, end: 0, rows: 7});
        }
    }

    function handleClassClick(thisClass) {
   
        if (buttonClass !== "delete-class-button") {
          // updates redux to current class  
          props.createClass(thisClass.name);

          updateDbCurrentClass(props.id, {class: thisClass.name} )

            //redirects to studentsPage
            navigate("/students", {state: [gb, thisClass]} );
        }
    }

    function handleDelete(e) {
        if (toggleDelete) {
            setShowModal(true);
            setItemToDelete(e.target.id);
        }
    }

    function handleModal(e) {
        // close delete modal after cancel or delete.
        setShowModal(false);
        // if user confirms delete, delete selected class from redux and firebase.
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
                    warningMessageString={
                        "You will also lose the student roster associated with the class"
                    }
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
                {showAddClassModal ? <div>{inputClassModal}</div> : null}
                <div className="add-delete-container">
                    <ListClasses />
                    <div className="d-flex justify-content-around">
                        <div
                            id="add-class-button"
                            onClick={() => {
                                if (toggleDelete) {
                                    setToggleDelete(false);
                                }
                                return setShowAddClassModal(true);
                            }}
                        >
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
            </div>
        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassesPage);
