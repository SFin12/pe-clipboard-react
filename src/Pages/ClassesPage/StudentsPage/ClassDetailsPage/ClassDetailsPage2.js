import { useEffect, useRef, useState } from "react"
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom"
import { updateStudentDetails } from "../../../../Lib/LinkReduxToDb"
import { updateDbResponse, updateStudentList } from "../../../../Redux/actions"
import "../StudentPage.scss"
import EditStudentDetails from "./EditStudentDetails"

const mapStateToProps = (state) => ({
  id: state.id,
  currentPage: state.currentPage,
  gradebook: state.gradebook,
  cleanGradebook: state.cleanGradebook,
  class: state.class,
  classList: state.classList,
  student: state.student,
  studentList: state.studentList,
})

const mapDispatchToProps = {
  updateStudentList,
  updateDbResponse,
}

function ClassDetailsPage(props) {
  const [studentDetailInputs, setStudentDetailInputs] = useState([])
  const studentDetailsRef = useRef([])
  const [detailType, setDetailType] = useState("number")
  const navigate = useNavigate()

  useEffect(() => {
    const studentDetails = props.studentList[props.cleanGradebook + "-" + props.class]
    setStudentDetailInputs(studentDetails)
  }, [props.studentList, props.cleanGradebook, props.class])

  function handleStudentDetailChanges(e) {
    const name = e.target.name
    const detail = e.target.value
    const objIndex = studentDetailInputs.findIndex((obj) => obj.name === name)
    setStudentDetailInputs((prev) => {
      prev[objIndex].name = name
      prev[objIndex][detailType] = detail
      return [...prev]
    })
  }

  function handleSave(e) {
    e.preventDefault()
    const gradebookClass = props.cleanGradebook + "-" + props.class
    updateStudentDetails(props.id, gradebookClass, studentDetailInputs)
    navigate(-1)
  }

  function handleEnter(e) {
    let index = e.target.id.slice(0, 2)
    if (index[1] === "-") index = index[0]
    // Check for enter or down arrow
    if (e.key === "Enter" || e.keyCode === 40) {
      if (studentDetailsRef.current[+index + 1]) {
        studentDetailsRef.current[+index + 1].focus()
      }
    }
    // Check for up arrow
    if (e.keyCode === 38) {
      if (studentDetailsRef.current[+index - 1]) {
        studentDetailsRef.current[+index - 1].focus()
      }
    }
  }

  return (
    <section className="mt-5 pt-5">
      <div className="d-flex justify-content-center p-2">
      <select onChange={(e) => setDetailType(e.currentTarget.value)} defaultValue={""}>
        <option value="number">Student Numbers</option>
        <option value="group">Student Group</option>
        <option value="email">Student Email</option>
        <option value="phone">Student Phone</option>
        <option value="pacer">Pacer</option>
        <option value="mileRun">Mile Run</option>
        <option value="pushUps">Push Ups</option>
        <option value="curlUps">Curl Ups</option>
        <option value="trunkLift">Trunk Lift</option>
        <option value="shoulderLeft">Shoulder Left</option>
        <option value="shoulderRight">Shoulder Right</option>
        <option value="sitReachLeft">Sit Reach Left</option>
        <option value="sitReachRight">Sit Reach Right</option>
        <option value="height">Height</option>
        <option value="weight">Weight</option>
        <option value="notes">Notes</option>
      </select>
      </div>
      {detailType && <EditStudentDetails studentDetailInputs={studentDetailInputs} studentDetailsRef={studentDetailsRef} detailType={detailType} handleChange={handleStudentDetailChanges} handleEnter={handleEnter} />}
      <div className="d-flex justify-content-center p-4">
        <button className="submit-button" onClick={handleSave}>
          Save
        </button>
      </div>
    </section>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassDetailsPage)
