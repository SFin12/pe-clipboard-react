import React, { useState } from "react";
import { Header } from "../../components/Header/Header";
import { connect } from "react-redux";
import { createGradebook, updateGradebookList } from "../../Redux/actions";
import DropDown from "../../components/DropDown/DropDown";
import "./GradebookPage.scss";

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
};

function GradebookPage(props) {
    const [input, setInput] = useState();

    let currentSelect = {};
    if (props.gradebook) {
        currentSelect = props.gradebook;
    } else if (props.gradebookList.length > 0) {
        currentSelect = props.gradebookList[0];
    }
    console.log(props.gradebookList);
    function handleChange(e) {
        console.log(e.target.value);
        if (e.target.id === "select-gradebook") {
            currentSelect.gradebookId = e.target.value;
            currentSelect.gradebookName = e.target.selectedOptions[0].text;
        } else {
            setInput(e.target.value);
            currentSelect.gradebookName = input;
            currentSelect.gradebookId = input + "Id";
            console.log(currentSelect.gradebookId);
            
        }
    }

    function handleClick(e) {
        props.createGradebook(
            currentSelect.gradebookId,
            currentSelect.gradebookName
        );
        props.updateGradebookList(
            currentSelect.gradebookId,
            currentSelect.gradebookName
        );
    }
    function ListGradebooks() {
        if (props.gradebookList.length > 0) {
            console.log("props gbl ", props.gradebookList);
            return (
                <React.Fragment>
                    <p>or</p>
                    <label htmlFor="select-gradebook">Change Gradebook</label>
                    <div className="input-group mb-3 d-flex justify-content-center justify-content-md-start">
                        <select
                            // defaultValue={currentSelect.gradebookName}
                            className="custom-select"
                            id="select-gradebook"
                            onChange={handleChange}
                        >
                            {props.gradebookList.map((gradebook, i) => (
                                <option
                                    key={"gb" + i}
                                    value={gradebook.gradebookId}
                                    name={gradebook.gradebookName}
                                >
                                    {gradebook.gradebookName}
                                </option>
                            ))}
                        </select>
                        <div
                            className="input-group-append"
                            onClick={handleClick}
                        >
                            <label
                                className="input-group-text"
                                htmlFor="inputGroupSelect02"
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
            <Header header={props.currentPage} />
            <div className="form-container">
                <section>
                    <DropDown
                        buttonTitle="First Gradebook?"
                        content="Creating a gradebook will automatically create a new
                            google sheet in your PE Clipboard folder. Any
                            classes you add will be added as tabs. To customize
                            daily points and notes change them in settings from
                            the app. you may change values within the google
                            sheets in the daily points and weekly points columns
                            but changing anything else in google sheets may cause problems with the
                            app."
                    />
                </section>
                <br />

                <label htmlFor="create-gradebook">Create Gradebook</label>
                <div className="input-group mb-3 d-flex justify-content-center justify-content-md-start">
                    <input
                        id="create-gradebook"
                        type="text"
                        
                        placeholder="Gradebook Name"
                        className="text-input"
                        onChange={handleChange}
                    />
                    <div className="input-group-append" onClick={handleClick}>
                        <label
                            className="input-group-text"
                            htmlFor="inputGroupSelect02"
                        >
                            save
                        </label>
                    </div>
                </div>

                <ListGradebooks />
            </div>
        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(GradebookPage);
