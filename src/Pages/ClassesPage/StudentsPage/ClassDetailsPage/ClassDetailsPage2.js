import { useEffect, useRef, useState } from "react"
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom"
import { updateStudentDetails } from "../../../../Lib/LinkReduxToDb"
import { updateDbResponse, updateStudentList } from "../../../../Redux/actions"
import "../StudentPage.scss"
import EditStudentDetails from "./EditStudentDetails"
import TimedMileDetails from "./TimedMileDetails"
import { formatMileTime, organizeStundenDetails, splitMinutesAndSeconds, useViewport } from "../../../../utils/utilities"
import { Button } from "react-bootstrap"
import { CSVDownload, CSVLink } from "react-csv"


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
  const { screenWidth } = useViewport()
  const navigate = useNavigate()
  const currentGb = props.cleanGradebook.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, " ")
  const currentClass = props.class.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, " ")
   

  useEffect(() => {

    const studentDetails = props.studentList[ currentGb + "-" + currentClass]
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

  function handleMileRunChange(newStudentDetailInputs){
    setStudentDetailInputs(newStudentDetailInputs)
  }

  function handleSave(e) {
    e.preventDefault()
    const gradebookClass = currentGb + "-" + currentClass
    const updatedStudentDetails = studentDetailInputs.map((s) => ({ ...s, mileResults: formatMileTime(s.mileRun)}))
    updateStudentDetails(props.id, gradebookClass, updatedStudentDetails)
    if(detailType !== "mileRun") {
      return true
    }
    return true
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

  function handleCopy(e) {
    navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
      if (result.state === "granted" || result.state === "prompt") {
        /* write to the clipboard now */
        async function writeToClipboard() {
          try {
            const grades = JSON.stringify(organizeStundenDetails(studentDetailInputs))
            await navigator.clipboard.writeText(grades)
          } catch (error) {
            alert(error)
          }
        }
        writeToClipboard()
      } else {
        console.log("not permitted")
      }
    })
  }

  return (
    <section className="mt-5 pt-5 relative w-full">
       { screenWidth > 750 && detailType !== "mileRun" && <div className="position-absolute w-100 d-flex justify-content-between"><div className="left-3">
       
                    </div>
                    <div className="right-3">
                   
                      </div>
                      </div>
      }
      <div className={`d-flex ${screenWidth > 750 ? "justify-content-between" : "justify-content-center"} p-2`}>
      { screenWidth > 750 &&<Button size="sm" variant="secondary" onClick={handleCopy}>
                      Copy Info
                    </Button>}
      <select onChange={(e) => setDetailType(e.currentTarget.value)} defaultValue={""}>
        <option value="number">Student Numbers</option>
        <option value="group">Student Group</option>
        <option value="email">Student Email</option>
        <option value="phone">Student Phone</option>
        <option value="pacer">Pacer</option>
        <option value="mileRun">Mile Run</option>
        <option value="laps">Laps</option>
        <option value="mileResults">Mile Results</option>
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
      { screenWidth > 725 && <CSVLink data={organizeStundenDetails(studentDetailInputs)} filename={"student-scores.csv"} className="btn btn-secondary btn-sm">
                      Download</CSVLink>}
      </div>
      {detailType === "mileRun" ? 
        <TimedMileDetails studentDetailInputs={studentDetailInputs} handleChange={handleMileRunChange} />
        :
       detailType ? <EditStudentDetails studentDetailInputs={studentDetailInputs} studentDetailsRef={studentDetailsRef} detailType={detailType} handleChange={handleStudentDetailChanges} handleEnter={handleEnter} /> : null }
      <div className="d-flex justify-content-center p-4">
          <button className="submit-button w-100" onClick={handleSave}>Save</button>
      </div>
    </section>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassDetailsPage)
