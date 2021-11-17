import React from "react";
import { Header } from "../../components/Header/Header";
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
            <Header header={props.currentPage} />
            <div className="form-container">
                
            </div>
        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
