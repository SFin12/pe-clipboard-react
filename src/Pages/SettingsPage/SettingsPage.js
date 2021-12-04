import React from "react";

import { connect } from "react-redux";
import {
    getClasses,
    getGradebookList,
    deleteGradebook,
    deleteClass,
} from "../../Redux/actions";

const mapStateToProps = (state) => {
    return {
        gradebook: state.gradebook,
        getGradebookList: state.getGradebookList,
        classList: state.classList,
        currentPage: state.currentPage,
    };
};

const mapDispatchToProps = {
    getClasses,
    getGradebookList,
    deleteGradebook,
    deleteClass,
};

export function SettingsPage(props) {
    console.log('settingsProps: ',props.currentPage)
    return (
        <React.Fragment>
            <h1 className="header">Settings</h1>
            <hr/>
            <div className="form-container">
                
            </div>
        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
