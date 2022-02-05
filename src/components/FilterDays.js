import React, { useState } from "react";
import DatePicker from "./DatePicker";
import ToggleSwitch from "./ToggleSwitch";

function FilterDays(props) {
    const date = new Date();
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
    }

    function handleDate(e) {
        const localDate = e.target.value.split("-").join("/");
        if (e.target.name === "from") {
            setStartDate(e.target.value); //sets current date to yyyy-mm-dd

            const startDateToFind = new Date(localDate).toLocaleDateString();

            return;
        }
        const endDateToFind = new Date(localDate).toLocaleDateString();

        return setEndDate(e.target.value);
    }

    return (
        <div
            className="d-inline-flex flex-column flex-lg-row align-items-center justify-content-between w-100 mb-4"
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
                        changeHandler={handleDate}
                        label="Start Date"
                    />
                    <DatePicker
                        id="to"
                        name="to"
                        startDate={endDate}
                        max={endDate}
                        changeHandler={handleDate}
                        label="End Date"
                    />
                </div>
            ) : null}
        </div>
    );
}

export default FilterDays;
