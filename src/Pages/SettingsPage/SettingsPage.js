import React from "react";
import { Button } from "react-bootstrap";

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
    function handleSubmit(params) {}

    return (
        <React.Fragment>
            <h1 className="header">Settings</h1>
            <hr />
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    Starting Daily Points:{" "}
                                    <input
                                        type="number"
                                        maxLength={2}
                                        min={0}
                                        max={99}
                                        value={10}
                                    ></input>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table>
                        <thead>
                            <th>Notes</th>
                            <th>Points Affect</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    First Note:{" "}
                                    <input
                                        type="text"
                                        placeholder="Example: EX"
                                        maxLength={2}
                                    ></input>
                                </td>
                                <td>
                                    Number Value:{" "}
                                    <input
                                        type="number"
                                        placeholder="Example: -5"
                                        maxLength={3}
                                    ></input>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Second Note:{" "}
                                    <input type="text" maxLength={2}></input>
                                </td>
                                <td>
                                    Number Value:{" "}
                                    <input type="number" maxLength={3}></input>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Third Note:{" "}
                                    <input type="text" maxLength={2}></input>
                                </td>
                                <td>
                                    Number Value:{" "}
                                    <input type="number" maxLength={3}></input>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <Button variant="secondary" type="submit">
                        Save
                    </Button>
                </form>
            </div>
        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
