import React, { useEffect, useState } from "react"
import "react-date-range/dist/styles.css" // main style file
import "react-date-range/dist/theme/default.css" // theme css file
import DatePicker from "../../../components/DatePicker"
import { connect } from "react-redux"
import { useLocation } from "react-router-dom"
import { formatDate } from "../../../utils/utilities"
import { Button } from "react-bootstrap"
import { updateOldStudentInfo } from "../../../Redux/actions"

const mapStateToProps = (state) => ({
  currentPage: state.currentPage,
  gradebook: state.gradebook,
  class: state.class,
  studentList: state.studentList,
  dailyPoints: state.settings.dailyPoints,
  studentInfo: state.studentInfo,
})

const mapDispatchToProps = {
  updateOldStudentInfo,
}

function EditStudentInfoPage(props) {
  const defaultStartDate = new Date(new Date().setDate(new Date().getDate() - 1))
  const [startDate, setStartDate] = useState(formatDate(defaultStartDate))
  const [student, setStudent] = useState("")
  const [points, setPoints] = useState()
  const [attendance, setAttendance] = useState()
  const [notes, setNotes] = useState()
  const [objIndex, setObjIndex] = useState()
  const [submissionObj, setSubmissionObj] = useState()
  let currentStudentInfo = useLocation().state

  useEffect(() => {
    if (currentStudentInfo[student]) {
      const index = currentStudentInfo[student].findIndex((submission) => submission.date === startDate)

      if (index >= 0) {
        setObjIndex(index)
        setSubmissionObj(currentStudentInfo[student][index])
        setPoints(currentStudentInfo[student][index].points)
        setAttendance(currentStudentInfo[student][index].attendance)
        setNotes(currentStudentInfo[student][index].notes || [])
      }

      if (submissionObj && submissionObj.length > 0) {
        setPoints(Number(submissionObj[0].points))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, student])

  function handleDateChange(e) {
    const date = e.target.value
    setStartDate(() => date)
  }

  function handleStudentChange(e) {
    setStudent(() => e.target.value)
  }

  function handlePointsChange(e) {
    const value = +e.target.value
    if (value >= 0 && value < 100) {
      setPoints(e.target.value)
    } else if (value === "") {
      setPoints(0)
    }
  }

  function handleAttendanceChange(e) {
    setAttendance(e.target.value)
  }

  function handleNotesChange(e) {
    // let notesArray = e.target.value.split(",").map((note) => note.trim())
    setNotes(e.target.value.split(","))
  }

  function handleSave() {
    if (student && objIndex && objIndex >= 0) {
      currentStudentInfo[student][objIndex].attendance = attendance
      currentStudentInfo[student][objIndex].points = points
      currentStudentInfo[student][objIndex].notes = notes
      props.updateOldStudentInfo(currentStudentInfo)
    }
  }

  return (
    <div className="edit-student-info-container">
      <h1 className="header">Edit Student Info</h1>

      <hr />
      <div className="d-flex flex-column align-items-center">
        <label htmlFor="select-student">Select Student</label>
        <select onChange={handleStudentChange} id="select-student">
          <option selected>Select Student</option>
          {Object.keys(currentStudentInfo).map((name, i) => {
            if (name !== "dateLastSubmitted" && name !== "totalPoints") {
              return <option key={i + name}>{name}</option>
            }
            return null
          })}
        </select>
        <DatePicker label={"Choose a date to modify:"} name={"date"} id={"date"} startDate={startDate} changeHandler={handleDateChange} />
        <br />
        {submissionObj && (
          <>
            <label htmlFor="select-attendance">Edit Attendance</label>

            <select value={attendance} type={"text"} id="select-attendance" onChange={handleAttendanceChange}>
              <option value={"P"}>P</option>
              <option value={"A"}>A</option>
              <option value={"T"}>T</option>
            </select>
            <label htmlFor="edit-points">Points</label>

            <input value={points} type={"number"} min={0} max={99} id="edit-points" onChange={handlePointsChange} />
            <label htmlFor="select-student">Notes (comma seperated)</label>

            <input value={notes} type={"text"} maxLength={25} id="edit-notes" onChange={handleNotesChange} />
            <Button onClick={handleSave}>Save</Button>
          </>
        )}
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(EditStudentInfoPage)
