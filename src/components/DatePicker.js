import React from "react";
import "./DatePicker.scss";

function DatePicker({
    label,
    name,
    id,
    startDate /*number of days to subtract from current*/,
    max,
    changeHandler,
}) {
    return (
        <React.Fragment>
            <label className="date-picker-label align-self-center">
                {label}
            </label>

            <input
                className="date-input"
                type="date"
                id={id}
                name={name}
                value={startDate}
                max={max ? max : null}
                onChange={changeHandler}
            />
        </React.Fragment>
    );
}

export default DatePicker;
