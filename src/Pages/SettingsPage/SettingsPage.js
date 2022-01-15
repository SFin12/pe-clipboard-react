import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { updateSettings } from "../../Redux/actions";

const mapStateToProps = (state) => {
    return {
        currentPage: state.currentPage,
        settings: state.settings,
    };
};

const mapDispatchToProps = {
    updateSettings,
};

export function SettingsPage(props) {
    const dPointsRef = useRef();
    const n1Ref = useRef();
    const n2Ref = useRef();
    const n3Ref = useRef();

    const n1PointsRef = useRef();
    const n2PointsRef = useRef();
    const n3PointsRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        console.log("submitting");
        const settingsObj = {
            dailyPoints: dPointsRef.current.value,
            note1: n1Ref.current.value,
            note1Points: n1PointsRef.current.value,
            note2: n2Ref.current.value,
            note2Points: n2PointsRef.current.value,
            note3: n3Ref.current.value,
            note3Points: n3PointsRef.current.value,
        };
        return props.updateSettings(settingsObj);
    }

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
                                        defaultValue={
                                            props.settings.dailyPoints
                                        }
                                        ref={dPointsRef}
                                    ></input>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table>
                        <thead>
                            <tr>
                                <th>Notes</th>
                                <th>Points Affect</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    First Note:{" "}
                                    <input
                                        type="text"
                                        placeholder="Example: EX"
                                        maxLength={2}
                                        ref={n1Ref}
                                        defaultValue={props.settings.note1}
                                    ></input>
                                </td>
                                <td>
                                    Number Value:{" "}
                                    <input
                                        type="number"
                                        placeholder="Example: -5"
                                        maxLength={3}
                                        ref={n1PointsRef}
                                        defaultValue={
                                            props.settings.note1Points
                                        }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Second Note:{" "}
                                    <input
                                        type="text"
                                        maxLength={2}
                                        ref={n2Ref}
                                        defaultValue={props.settings.note2}
                                    />
                                </td>
                                <td>
                                    Number Value:{" "}
                                    <input
                                        type="number"
                                        maxLength={3}
                                        ref={n2PointsRef}
                                        defaultValue={
                                            props.settings.note2Points
                                        }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Third Note:{" "}
                                    <input
                                        type="text"
                                        maxLength={2}
                                        ref={n3Ref}
                                        defaultValue={props.settings.note3}
                                    />
                                </td>
                                <td>
                                    Number Value:{" "}
                                    <input
                                        type="number"
                                        maxLength={3}
                                        ref={n3PointsRef}
                                        defaultValue={
                                            props.settings.note3Points
                                        }
                                    />
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
