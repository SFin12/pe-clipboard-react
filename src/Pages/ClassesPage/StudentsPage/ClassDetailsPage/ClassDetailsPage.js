import { useEffect, useRef, useState } from "react"
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom"
import { updateStudentDetails } from "../../../../Lib/LinkReduxToDb"
import { updateDbResponse, updateStudentList } from "../../../../Redux/actions"
import EditStudentNumbers from "./EditStudentNumbers"
import "../StudentPage.scss"

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
  const [studentNumberInputs, setStudentNumberInputs] = useState([])
  const studentNumbersRef = useRef([])
  const navigate = useNavigate()

  useEffect(() => {
    const studentDetails = props.studentList[props.cleanGradebook + "-" + props.class]
    setStudentNumberInputs(studentDetails)
  }, [props.studentList, props.cleanGradebook, props.class])

  function handleStudentNumberChanges(e) {
    const name = e.target.name
    const number = e.target.value
    const objIndex = studentNumberInputs.findIndex((obj) => obj.name === name)
    setStudentNumberInputs((prev) => {
      prev[objIndex].name = name
      prev[objIndex].number = number
      return [...prev]
    })
  }

  function handleSave(e) {
    e.preventDefault()
    const gradebookClass = props.cleanGradebook + "-" + props.class
    updateStudentDetails(props.id, gradebookClass, studentNumberInputs)
    navigate(-1)
  }

  function handleEnter(e) {
    let index = e.target.id.slice(0, 2)
    if (index[1] === "-") index = index[0]
    // Check for enter or down arrow
    if (e.key === "Enter" || e.keyCode === 40) {
      if (studentNumbersRef.current[+index + 1]) {
        studentNumbersRef.current[+index + 1].focus()
      }
    }
    // Check for up arrow
    if (e.keyCode === 38) {
      if (studentNumbersRef.current[+index - 1]) {
        studentNumbersRef.current[+index - 1].focus()
      }
    }
  }

  return (
    <section className="mt-5 pt-5">
      <div className="d-flex justify-content-center p-2">
      <select>
        <option value="Student Numbers">Student Numbers</option>
        <option value="Current Pacer">Current Pacer</option>
        <option value="Other">Other</option>
      </select>
      </div>
      <EditStudentNumbers studentNumberInputs={studentNumberInputs} studentNumbersRef={studentNumbersRef} handleChange={handleStudentNumberChanges} handleEnter={handleEnter} />
      <div className="d-flex justify-content-center p-4">
        <button className="submit-button" onClick={handleSave}>
          Save
        </button>
      </div>
    </section>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassDetailsPage)
