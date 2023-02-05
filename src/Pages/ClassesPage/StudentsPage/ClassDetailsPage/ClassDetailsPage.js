import { useEffect, useRef, useState } from "react"
import { connect } from "react-redux"
import { updateStudentNumbers } from "../../../../Lib/LinkReduxToDb"
import { updateDbResponse, updateStudentList } from "../../../../Redux/actions"
import EditStudentNumbers from "./EditStudentNumbers"

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
    updateStudentNumbers(props.id, gradebookClass, studentNumberInputs)
  }

  

  function handleEnter(e) {
    let index = e.target.id.slice(0, 2)
    if (index[1] === "-") index = index[0]
    if (e.key === "Enter" || e.keyCode === 40) {
      if (studentNumbersRef.current[+index + 1]) {
        studentNumbersRef.current[+index + 1].focus()
      }
    }
    if (e.keyCode === 38) {
      if (studentNumbersRef.current[+index - 1]) {
        studentNumbersRef.current[+index - 1].focus()
      }
    }
  }

  return (
    <section className="mt-5 pt-5">
      
      <EditStudentNumbers studentNumberInputs={studentNumberInputs} studentNumbersRef={studentNumbersRef} handleChange={handleStudentNumberChanges} handleEnter={handleEnter} />
      <button onClick={handleSave}>Save</button>
    </section>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassDetailsPage)
