import React, { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateSettings } from "../../Redux/actions";
import SuccessModal from "../../components/SuccessModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import "./SettingsPage.scss";

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
    const [showSaved, setShowSaved] = useState(false);

    const dPointsRef = useRef();
    const n1Ref = useRef();
    const n2Ref = useRef();
    const n3Ref = useRef();
    const n1PointsRef = useRef();
    const n2PointsRef = useRef();
    const n3PointsRef = useRef();

    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        if (e.keyCode !== 13) {
            console.log("submitting");
            const settingsObj = {
                dailyPoints: Number(dPointsRef.current.value),
                note1: n1Ref.current.value,
                note1Points: Number(n1PointsRef.current.value),
                note2: n2Ref.current.value,
                note2Points: Number(n2PointsRef.current.value),
                note3: n3Ref.current.value,
                note3Points: Number(n3PointsRef.current.value),
            };
            props.updateSettings(settingsObj);
            setShowSaved(true);
            setTimeout(() => {
                setShowSaved(false);
            }, 2000);
        }
    }

    return (
        <React.Fragment>
            <h1 className="header">Settings</h1>
            <FontAwesomeIcon
                name="left-arrow"
                icon={faArrowLeft}
                color="green"
                className="back-arrow"
                onClick={() => navigate(-1)}
            />
            <hr />
            <div className="form-container">
                <form
                    onSubmit={handleSubmit}
                    className="d-flex flex-column align-items-center  align-items-lg-end settings-form"
                >
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    Starting Daily Points:{" "}
                                    <input
                                        type="number"
                                        className="mb-4"
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
                    <table className="settings-table">
                        <thead>
                            <tr>
                                <th>Notes</th>
                                <th className="">Points Affect</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    1st Note:{" "}
                                    <input
                                        type="text"
                                        className="note-settings"
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
                                        className="note-settings"
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
                                    2nd Note:{" "}
                                    <input
                                        type="text"
                                        className="note-settings"
                                        maxLength={2}
                                        ref={n2Ref}
                                        defaultValue={props.settings.note2}
                                    />
                                </td>
                                <td>
                                    Number Value:{" "}
                                    <input
                                        type="number"
                                        className="note-settings"
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
                                    3rd Note:{" "}
                                    <input
                                        type="text"
                                        className="note-settings"
                                        maxLength={2}
                                        ref={n3Ref}
                                        defaultValue={props.settings.note3}
                                    />
                                </td>
                                <td>
                                    Number Value:{" "}
                                    <input
                                        type="number"
                                        className="note-settings"
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
                    <div className="p-5 d-flex justify-content-center align-items-center settings-btn-container">
                        <Button
                            variant="secondary"
                            type="submit"
                            size="lg"
                            id="save-settings"
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </div>
            {showSaved ? (
                <SuccessModal
                    showSuccess={showSaved}
                    title={"Saving"}
                    messageString={"Settings have been updated."}
                />
            ) : null}
        </React.Fragment>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
