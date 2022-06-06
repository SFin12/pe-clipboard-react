import React from "react";

export default function StudentButtons(props) {
    const {
        student,
        handleAttendance,
        handleDecrement,
        handleDelete,
        handleIncrement,
        handleNote,
        i,
        attendance,
        studentId,
        note,
        studentPoints,
    } = props;

    return (
        <div
            className={props.toggleDelete ? "student delete" : "student"}
            name="student-info"
            key={student + "-info"}
            id={student + "-info"}
            onClick={props.toggleDelete ? handleDelete : null}
        >
            <div className="flex-space-between">
                {/* Student Button with their name */}
                <input
                    className="tl-round student-button button"
                    type="button"
                    key={student}
                    id={i + "-" + student}
                    name="name"
                    value={student}
                    onClick={props.toggleDelete ? undefined : handleDecrement}
                />
                <input
                    className="tr-round button daily-points "
                    key={student + "-points"}
                    name="daily-points"
                    type="button"
                    id={i + "-points"}
                    value={studentPoints[studentId]}
                    onClick={props.toggleDelete ? undefined : handleIncrement}
                />
            </div>
            <div className="flex-space-between notes" data-toggle="off">
                <input
                    className={
                        "bl-round button absent note" +
                        " " +
                        attendance[studentId]
                    }
                    name="attendance"
                    type="button"
                    key={student + "-attendance"}
                    id={i + "-attendance"}
                    data-toggle="off"
                    value={attendance[studentId]}
                    onClick={props.toggleDelete ? undefined : handleAttendance}
                />
                <input
                    className="button absent note"
                    name="note1"
                    type="button"
                    id={i + "-note1"}
                    data-note={note[i + "-note1"]}
                    onClick={props.toggleDelete ? undefined : handleNote}
                    value={props.settings.note1}
                />
                <input
                    className="button absent note"
                    name="note2"
                    type="button"
                    id={i + "-note2"}
                    data-note={note[i + "-note2"]}
                    onClick={props.toggleDelete ? undefined : handleNote}
                    value={props.settings.note2}
                />
                <input
                    className="button absent note "
                    name="note3"
                    type="button"
                    id={i + "-note3"}
                    data-note={note[i + "-note3"]}
                    onClick={props.toggleDelete ? undefined : handleNote}
                    value={props.settings.note3}
                />
                <input
                    className="br-round button absent note "
                    style={{ textAlign: "center" }}
                    name="note4"
                    type="text"
                    key={student + "-note4"}
                    id={i + "-note4"}
                    placeholder="?"
                    data-note={note[i + "-note4"]}
                    defaultValue=""
                    onChange={props.toggleDelete ? undefined : handleNote}
                />
            </div>
        </div>
    );
}
