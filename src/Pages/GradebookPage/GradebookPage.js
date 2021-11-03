import React from "react";
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
    console.log(props);
    function ListGradebooks() {
        if (props.gradebookList) {
            return (
                <React.Fragment>
                    <p>or</p>
                    <label for="select-gradebook">Change Gradebook</label>
                    <div className="input-group mb-3 d-flex justify-content-center justify-content-md-start">
                        <select className="custom-select" id="select-gradebook">
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
                        <div class="input-group-append">
                            <label
                                className="input-group-text"
                                for="inputGroupSelect02"
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
                <br/>
                <label for="create-gradebook">Create Gradebook</label>
                <div className="input-group mb-3 d-flex justify-content-center justify-content-md-start">
                    <input
                        id="create-gradebook"
                        type="text"
                        placeholder="Gradebook Name"
                        className="text-input"
                    />
                    <div class="input-group-append">
                        <label
                            className="input-group-text"
                            for="inputGroupSelect02"
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
