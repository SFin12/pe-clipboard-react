import { useEffect, useRef, useState } from "react"
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom"
import { updateStudentDetails } from "../../../../Lib/LinkReduxToDb"
import { updateDbResponse, updateStudentList } from "../../../../Redux/actions"
import "../StudentPage.scss"
import EditStudentDetails from "./EditStudentDetails"
import TimedMileDetails from "./TimedMileDetails"
import { formatMileTime, useViewport } from "../../../../utils/utilities"
import { Button } from "react-bootstrap"
import { CSVLink } from "react-csv"


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

  function handleMileRunChange(newStudentDetailInputs){
    setStudentDetailInputs(newStudentDetailInputs)
  }

  function handleSave(e) {
    e.preventDefault()
    const gradebookClass = props.cleanGradebook + "-" + props.class
    const updatedStudentDetails = studentDetailInputs.map((s) => ({ ...s, mileResults: formatMileTime(s.mileRun)}))
    updateStudentDetails(props.id, gradebookClass, updatedStudentDetails)
    if(detailType !== "mileRun") {
    navigate(-1)
    }
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

  function organizeStundenDetails() {
    const organizedStudentDetails = studentDetailInputs.map((s) => {
      const student = {}
      student["name"] = s.name
      student["number"] = s.number
      student["group"] = s.group
      student["email"] = s.email
      student["phone"] = s.phone
      student["pacer"] = s.pacer
      student["mileRun"] = s.mileRun
      student["laps"] = s.laps
      student["mileResults"] = s.mileResults
      student["pushUps"] = s.pushUps
      student["curlUps"] = s.curlUps
      student["trunkLift"] = s.trunkLift
      student["shoulderLeft"] = s.shoulderLeft
      student["shoulderRight"] = s.shoulderRight
      student["sitReachLeft"] = s.sitReachLeft
      student["sitReachRight"] = s.sitReachRight
      student["height"] = s.height
      student["weight"] = s.weight
      student["notes"] = s.notes
      return student
    })
    return organizedStudentDetails
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
      { screenWidth > 750 && <CSVLink data={organizeStundenDetails(studentDetailInputs)} filename={"student-scores.csv"} className="btn btn-secondary btn-sm">
                      Download as CSV</CSVLink>}
      </div>
      {detailType === "mileRun" ? 
        <TimedMileDetails studentDetailInputs={studentDetailInputs} handleChange={handleMileRunChange} />
        :
       detailType ? <EditStudentDetails studentDetailInputs={studentDetailInputs} studentDetailsRef={studentDetailsRef} detailType={detailType} handleChange={handleStudentDetailChanges} handleEnter={handleEnter} /> : null }
      <div className="d-flex justify-content-center p-4">
        <button className="submit-button" onClick={handleSave}>
          Save
        </button>
      </div>
    </section>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassDetailsPage)
