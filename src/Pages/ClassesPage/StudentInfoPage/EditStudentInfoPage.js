import React, { useEffect, useState } from "react"
import "react-date-range/dist/styles.css" // main style file
import "react-date-range/dist/theme/default.css" // theme css file
import DatePicker from "../../../components/DatePicker"
import { connect } from "react-redux"
import { useLocation } from "react-router-dom"
import { formatDate } from "../../../utils/utilities"
import { Button } from "react-bootstrap"

const mapStateToProps = (state) => ({
  currentPage: state.currentPage,
  gradebook: state.gradebook,
  class: state.class,
  studentList: state.studentList,
  dailyPoints: state.settings.dailyPoints,
  studentInfo: state.studentInfo,
})

const mapDispatchToProps = {}

function EditStudentInfoPage() {
  const defaultStartDate = new Date(new Date().setDate(new Date().getDate() - 1))

  const [startDate, setStartDate] = useState(formatDate(defaultStartDate))
  const [student, setStudent] = useState("")
  const [points, setPoints] = useState()
  const [attendance, setAttendance] = useState()
  const [notes, setNotes] = useState()
  const [objIndex, setObjIndex] = useState()
  const [submissionObj, setSubmissionObj] = useState()
  const currentStudentInfo = useLocation().state
  

  useEffect(() => {
    if (currentStudentInfo[student]) {
      const index = currentStudentInfo[student].findIndex((submission) => submission.date === startDate )
      console.log(index)
      console.log(currentStudentInfo[student][index])
      // if(index){
      //   const findObj = currentStudentInfo[student][index]((submission) => {
      //     return submission.date === startDate
      //   })
      // }
      
      if(index > 0){
        setObjIndex(index)
        setSubmissionObj(currentStudentInfo[student][index])
        setPoints(currentStudentInfo[student][index].points)
        setAttendance(currentStudentInfo[student][index].attendance)
        setNotes(currentStudentInfo[student][index].notes || [])
      }
    
 
      if(submissionObj && submissionObj.length > 0) {
        
        setPoints(Number(submissionObj[0].points))
      }
    }
  }, [ startDate, student])

  function handleDateChange(e) {
    const date = e.target.value
    setStartDate(formatDate(date))
  }

  function handleStudentChange(e) {
    setStudent(e.target.value)
  }

  function handlePointsChange(e) {
    setPoints(e.target.value)
  }

  function handleAttendanceChange (e) {
    console.log(e.target.value)
  }
  function handleNotesChange (e) {
    console.log(e.target.value)
  }

  function handleSave(){

  }

  return (
    <div className="mt-5 pt-5">
      <select onChange={handleStudentChange}>
        {Object.keys(currentStudentInfo).map((name, i) => {
          return <option key={i + name}>{name}</option>
        })}
      </select>
      <DatePicker label={"Choose a date to modify:"} name={"date"} id={"date"} startDate={startDate} changeHandler={handleDateChange} />
      {submissionObj && <div>
        <input value={attendance} type={"text"} onChange={handleAttendanceChange} />
        <input value={points} type={"number"} onChange={handlePointsChange} />
        <input value={notes} type={"text"} onChange={handleNotesChange} />
        {console.log(notes)}
      <Button onClick={handleSave}>Save</Button></div>}
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(EditStudentInfoPage)
