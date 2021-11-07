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
    console.log('gb props: ', props)
    const [input, setInput] = useState("");
    const [choice, setChoice] = useState("");
    console.log("gb props: ", props)

    function handleChange(e) {
        // If gradebook is being created
        if ( e.target.id === "create-gradebook") {
            setInput(e.target.value)
        // If gradebook is being selected
        } else {
            setChoice(e.target.value)
        }
    }

    function handleClick(e) {
        console.log('current gb state: ', input, choice)
        console.log('target Id: ', e.target)
        // If gradebook was created and saved
        if (e.target.id === "save-gradebook") {
        props.createGradebook(input);
        props.updateGradebookList(input);
        } else /* If gradebook was selected and saved */{
        props.createGradebook(choice);
        props.updateGradebookList(choice);
        };
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
                            value={choice}
                        >
                            {props.gradebookList.map((gradebook, i) => (
                                <option
                                    key={"gb" + i}
                                    value={gradebook.gradebookName}
                                    name={gradebook.gradebookName}
                                >
                                    {gradebook.gradebookName}
                                </option>
                            ))}
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
                        value={input}
                        placeholder="Gradebook Name"
                        className="text-input"
                        onChange={handleChange}
                    />
                    <div className="input-group-append" >
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
                    <p>Current Gradebook:<span ><h4 className="inline"> {props.gradebook.gradebookName}</h4></span></p>
                </span>
                
            </div>
        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(GradebookPage);
