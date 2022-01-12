import React, { useState } from "react";

import { connect } from "react-redux";
import {
    createGradebook,
    updateGradebookList,
    updatePage,
} from "../../Redux/actions";
import { DropDownHover } from "../../components/DropDown/DropDown";
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
    updatePage,
};

function GradebookPage(props) {
    const [input, setInput] = useState("");
    const [choice, setChoice] = useState("");

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
        } /* If gradebook was selected and saved */ else {
            props.createGradebook(choice);
            props.updateGradebookList(choice);
        }
    }

    function ListGradebooks() {
        if (props.gradebookList.length > 0) {
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
                            value={choice}
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
            </div>
        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(GradebookPage);
