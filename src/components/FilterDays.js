import React, { useEffect, useState } from "react";
import DatePicker from "./DatePicker";
import ToggleSwitch from "./ToggleSwitch";

function FilterDays(props) {
    const date = new Date();
    const today = date.toISOString().split("T")[0];
    const defaultStartDate = new Date(
        new Date().setDate(new Date().getDate() - 5)
    );

    const [endDate, setEndDate] = useState(date.toISOString().split("T")[0]);
    const [startDate, setStartDate] = useState(
        defaultStartDate.toISOString().split("T")[0]
    );
    
    const [filter, setFilter] = useState(false);

    function handleToggle() {
        setFilter(!filter);
        //tell student info if the filter is on. If off, filter dates will be set to null.
        props.checkFilter(!filter);
    }

    useEffect(() => {
        //if filter is on, send the date filters to studentInfo to handle them
        if (filter) {
            props.handleDate(startDate, endDate);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, startDate, endDate]);

    function handleDateChange(e) {
        if (e.target.name === "from") {
            setStartDate(e.target.value); //sets current date to yyyy-mm-dd

            // props.handleDate(startDateToFind, endDateToFind);

            return;
        }

        // props.handleDate(endDateToFind, endDateToFind);
        return setEndDate(e.target.value);
    }

    return (
        <div
            className="d-inline-flex flex-column flex-lg-row align-items-center justify-content-between mb-4"
            style={{ minHeight: 65 }}
        >
            <div className="">
                <ToggleSwitch
                    checked={filter}
                    handleToggle={handleToggle}
                    label="Filter Results"
                />
            </div>
            {filter ? (
                <div className="d-flex flex-column align-items-end flex-lg-row">
                    <DatePicker
                        id="from"
                        name="from"
                        startDate={startDate} // default calendar date. Format = "yyyy/mm/dd"
                        max={endDate}
                        changeHandler={handleDateChange}
                        label="Start Date"
                    />
                    <DatePicker
                        id="to"
                        name="to"
                        startDate={endDate}
                        max={today}
                        changeHandler={handleDateChange}
                        label="End Date"
                    />
                </div>
            ) : null}
        </div>
    );
}

export default FilterDays;
