import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { updatePage, updateStudentList, deleteStudent } from "../Redux/actions"
import { CiMail } from "react-icons/ci"
import Confirm from "./ConfirmModal"
import { useViewport } from "../utils/utilities"

const mapStateToProps = (state) => ({
  currentPage: state.currentPage,
  gradebook: state.gradebook,
  class: state.class,
  student: state.student,
  studentList: state.studentList,
  dailyPoints: state.settings.dailyPoints,
  settings: state.settings,
  studentInfo: state.studentInfo,
})

const mapDispatchToProps = {
  deleteStudent,
  updatePage,
  updateStudentList,
}

function ListStudents(props) {
  //sets starting values for attendance and daily points
  const { studentList, studentInfo, studentRowDepth, settings, date } = props
  const [studentPoints, setStudentPoints] = useState({})
  const [attendance, setAttendance] = useState({})
  const [note, setNote] = useState({})
  const [studentToDelete, setStudentToDelete] = useState("")
  const [showModal, setShowModal] = useState(false)
  const { screenWidth } = useViewport()

  const uncleanCurrentGb = props.gradebook
  const uncleanCurrentClass = props.class

  // removes symbols that can't be used in a javascript property/key name
  const currentGb = uncleanCurrentGb.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, " ")
  const currentClass = uncleanCurrentClass.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, " ")
  const classKey = currentGb + "-" + currentClass

  useEffect(() => {
    setStudentPoints({})
    setAttendance({})
    setNote({})
  }, [date])

  useEffect(() => {
    props.updatePage("Students")
    let todaysStudentInfoArr = []
    const classInfo = studentInfo[classKey] //check if any grades info have been saved for this class
    const dateLastSubmitted = classInfo // If class grades have been submitted, get last date submitted.
      ? classInfo.dateLastSubmitted
      : null

    const todaysDate = date

    const alreadySubmitted = new Date(dateLastSubmitted) >= new Date(todaysDate)
    if (alreadySubmitted) {
      // let filteredStudentInfo = Object.values(classInfo).filter((value) => Array.isArray(value) && value.slice(-1)[0].date === todaysDate)
      let filteredDay = Object.values(classInfo)
        .filter((value) => Array.isArray(value))
        .map((arr) => {
          let filteredArr = arr.filter((entry) => entry?.date === todaysDate)
          return filteredArr
        })

      // let todaysStudentInfo = filteredStudentInfo.map((arr) => arr.slice(-1))

      todaysStudentInfoArr = filteredDay
    }

    const studentsExist = studentList[classKey]

    if (studentsExist) {
      const totalStudents = studentList[classKey].length
      setStudentPoints((studentPoints) => {
        let newState = {}
        for (let i = 0; i < totalStudents; i++) {
          let studentName = studentList[classKey][i].name
          let studentInfo = null
          if (alreadySubmitted) {
            studentInfo = todaysStudentInfoArr.filter((arr) => arr[0]?.name === studentName)
            //if the name doesn't match, student info should be null, else it is today's studentInfo object for that student
            studentInfo = studentInfo.length < 1 ? null : studentInfo[0][0]
          }

          let studentId = i + "-student"

          newState = {
            ...newState,
            [studentId]:
              //if student points already exists, use that value, otherwise create it with starting daily points.
              //TODO: change this to allow for points to be updated from another device.
              studentPoints[studentId] ? studentPoints[studentId] : studentInfo ? studentInfo.points : props.dailyPoints,
            //track how much the points have changed (i.e., clicking on and off notes)
            [studentId + "changed"]: 0,
          }
        }

        return newState
      })
      setAttendance((attendance) => {
        let attendanceState = {}
        for (let i = 0; i < totalStudents; i++) {
          let studentName = studentList[classKey][i].name
          let studentInfo = null
          if (alreadySubmitted) {
            studentInfo = todaysStudentInfoArr.filter((arr) => arr[0]?.name === studentName)
            //if the name doesn't match, studenent info should be null, else it is today's studentInfo object for that student
            studentInfo = studentInfo.length < 1 ? null : studentInfo[0][0]
          }
          let studentId = i + "-student"

          attendanceState = {
            ...attendanceState,
            [studentId]: attendance[studentId] ? attendance[studentId] : studentInfo ? studentInfo.attendance : "P",
          }
        }

        return attendanceState
      })
      // sets all notes to not-clicked / off
      // setNote((note) => {
      let notesState = {}
      for (let i = 0; i < totalStudents; i++) {
        let note1 = i + "-note1"
        let note2 = i + "-note2"
        let note3 = i + "-note3"
        let note4 = i + "-note4"
        let note5 = i + "-note5"
        let customNote = i + "-customNote"
        notesState = {
          ...notesState,
          [note1]: false,
          [note2]: false,
          [note3]: false,
          [note4]: { active: false, value: props.settings.note4[0], points: props.settings.note4Points[0] },
          [note5]: false,
          [customNote]: "",
        }

        let studentName = studentList[classKey][i].name
        let studentInfo = null
        if (alreadySubmitted) {
          studentInfo = todaysStudentInfoArr.filter((arr) => arr[0]?.name === studentName)

          studentInfo = studentInfo.length < 1 ? null : studentInfo[0][0]

          if (studentInfo && studentInfo.notes) {
            for (let i in studentInfo.notes) {
              switch (studentInfo.notes[i]) {
                // turn on any notes that match notes in settings.
                case props.settings.note1:
                  notesState = {
                    ...notesState,
                    [note1]: true,
                  }
                  break
                case props.settings.note2:
                  notesState = {
                    ...notesState,
                    [note2]: true,
                  }
                  break
                case props.settings.note3:
                  notesState = {
                    ...notesState,
                    [note3]: true,
                  }
                  break
                case props.settings.note4[0]:
                  notesState = {
                    ...notesState,
                    [note4]: { active: true, value: props.settings.note4[0], points: props.settings.note4Points[0] },
                  }
                  break
                case props.settings.note4[1]:
                  notesState = {
                    ...notesState,
                    [note4]: { active: true, value: props.settings.note4[1], points: props.settings.note4Points[1] },
                  }
                  break
                default:
                  notesState = {
                    ...notesState,
                    [note5]: true,
                    [customNote]: studentInfo.notes[i],
                  }
                  break
              }
            }
          } else {
            notesState = { ...notesState, [note1]: false, [note2]: false, [note3]: false, [note4]: { active: false, value: props.settings.note4[0], points: props.settings.note4Points[0] }, [note5]: false, [customNote]: "" }
          }
        }
      }

      setNote(notesState)
      // })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentList, date])

  function handleDecrement(e) {
    //decrease student points by one.
    let studentId = e.target.id[0]
    if (e.target.id[2] === "-") {
      studentId = e.target.id.slice(0, 2)
    }
    studentId += "-student"
    let currentPoints = studentPoints[studentId]
    if (currentPoints > 0) {
      --currentPoints
    }
    setStudentPoints((prevState) => ({
      ...prevState,
      [studentId]: currentPoints,
      [studentId + "changed"]: studentPoints[studentId + "changed"] - 1,
    }))
  }

  function handleIncrement(e) {
    //increase student points by one.
    let studentId = e.target.id[0]

    //if the number of target id is two digits...
    if (e.target.id[2] === "-") {
      studentId = e.target.id.slice(0, 2)
    }
    studentId += "-student"
    let currentPoints = studentPoints[studentId]
    ++currentPoints
    setStudentPoints((prevState) => ({
      ...prevState,
      [studentId]: currentPoints,
      [studentId + "changed"]: studentPoints[studentId + "changed"] + 1,
    }))
  }

  function handleAttendance(e) {
    let buttonName = e.currentTarget.name
    let studentId = e.target.id[0]
    let studentIdNumber = e.target.id[0]
    if (e.target.id[2] === "-") {
      studentId = e.target.id.slice(0, 2)
      studentIdNumber = e.target.id.slice(0, 2)
    }
    studentId += "-student"
    let currentAttendance = attendance[studentId]

    // Change current attendance to "A" (triggers class change on element)
    if (currentAttendance === "P") {
      setAttendance({ ...attendance, [studentId]: "A" })
    } else if (currentAttendance === "A") {
      setAttendance({ ...attendance, [studentId]: "T" })
    } else {
      setAttendance({ ...attendance, [studentId]: "P" })
    }

    handlePoints(e, studentIdNumber, buttonName)
  }

  function handleNote(e) {
    let noteId = e.currentTarget.id

    let studentIdNumber
    let buttonName = e.currentTarget.name
    let noteName = e.currentTarget.name
    let note4active = false
    // if note is not active, add the active class and set it to true.
    if (noteName !== "note5") {
      if (noteName === "note4") {
        // if note4[0], check if button is active, if so, switch to note4[1], else keep note4[0] but set button to active.
        let noteValue = e.currentTarget.value
        if (noteValue === props.settings.note4[0] && note[noteId].active === true) {
          note4active = true //lets handlePoints know that note4 is active immediatley without waiting for state update.
          setNote((prev) => ({
            ...prev,
            [noteId]: { value: props.settings.note4[1], points: props.settings.note4Points[1], active: true },
          }))
        } else if (noteValue === props.settings.note4[0] && note[noteId].active === false) {
          note4active = true
          setNote((prev) => ({
            ...prev,
            [noteId]: { value: props.settings.note4[0], points: props.settings.note4Points[0], active: true },
          }))
        } else {
          note4active = false
          // if it's already on the second note(b), switch it back to the first note(a) and set button to not active.
          setNote((prev) => ({
            ...prev,
            [noteId]: { value: props.settings.note4[0], points: props.settings.note4Points[0], active: false },
          }))
        }
      } else {
        setNote({
          ...note,
          [noteId]: !note[noteId],
        })
      }
      // getting the first character of the note id which is a number.
      studentIdNumber = e.target.id[0]
      // if the note id number is 2 digits...
      if (e.target.id[2] === "-") {
        studentIdNumber = e.target.id.slice(0, 2)
      }

      // check if custom note was clicked, if so, if user entered note, change button to active.
    } else if (noteName === "note5") {
      let noteValue = e.currentTarget.value
      let customNote = noteId.split("-")[0] + "-customNote"

      noteValue.length > 0
        ? setNote({
            ...note,
            [noteId]: true,
            [customNote]: noteValue,
          })
        : setNote({
            ...note,
            [noteId]: false,
            [customNote]: noteValue,
          })
    }
    handlePoints(e, studentIdNumber, buttonName, note4active)
  }

  function handlePoints(e, studentIdNumber, buttonName, note4active = false) {
    const studentId = studentIdNumber + "-student"
    const buttonElements = Array.from(e.target.parentElement.children)
    const buttonsClicked = []

    buttonElements.forEach((button, i) => {
      if (i === 0) {
        if (button.value === "A") {
          buttonName !== "attendance" ? buttonsClicked.push(props.settings.absentPoints) : buttonsClicked.push(props.settings.tardyPoints)
        } else if (button.value === "T") {
          if (buttonName !== "attendance") {
            buttonsClicked.push(props.settings.tardyPoints)
          }
        } else if (buttonName === "attendance") {
          buttonsClicked.push(props.settings.absentPoints)
        }
      }
      // check to see if the notes are clicked.
      else if (i > 0 && i < 4) {
        let buttonClicked = button.getAttribute("data-note")
        let buttonClickedBool = buttonClicked === "true" ? true : false
        if (buttonName === button.name) {
          buttonClickedBool = !buttonClickedBool
        }
        if (buttonClickedBool) {
          buttonsClicked.push(props.settings[button.name + "Points"])
        }
      }
      // check to see note 4a or 4b is clicked.
      else if (i === 4) {
        if (button.value === props.settings.note4[0] && button.getAttribute("data-note") !== "true" && note4active) {
          buttonsClicked.push(Number(props.settings.note4Points[0]))
        } else if (button.value === props.settings.note4[0] && button.getAttribute("data-note") === "true" && note4active) {
          buttonsClicked.push(Number(props.settings.note4Points[1]))
        } else if (button.value === props.settings.note4[0] && button.getAttribute("data-note") === "true" && !note4active) {
          buttonsClicked.push(Number(props.settings.note4Points[0]))
        } else if (buttonName !== button.name && button.value === props.settings.note4[1] && button.getAttribute("data-note") === "true" && !note4active) {
          buttonsClicked.push(Number(props.settings.note4Points[1]))
        }
      }
    })

    let pointValues = buttonsClicked.length > 0 ? buttonsClicked.reduce((total, current) => total + current) : 0
    let pointsChanged = studentPoints[studentId + "changed"] //add to currentPoints to subtract from customized points rather than base value set from daily points.
    let currentPoints = props.settings.dailyPoints + pointValues + pointsChanged
    if (currentPoints < 0) {
      currentPoints = 0
    }
    setStudentPoints((prevState) => ({
      ...prevState,
      [studentId]: currentPoints,
    }))
  }

  function handleDelete(e) {
    const targetArray = e.currentTarget.id.split("-")
    let studentToDelete = targetArray[0]
    if (targetArray.length > 2) {
      studentToDelete = targetArray[0] + "-" + targetArray[1]
    }
    setStudentToDelete(studentToDelete)
    setShowModal(true)
  }

  function handleModal(e) {
    setShowModal(false)
    e.target.name === "delete" && props.deleteStudent(studentToDelete)
  }

  if (settings.alphabetize) props.studentList[classKey].sort((a, b) => (a.name > b.name ? 1 : -1))
  const studentButtons = props.studentList[classKey].map((student, i) => {
    const studentId = i + "-student"

    return (
      <React.Fragment key={student.name + "-info"}>
        {/* place horizontal bar every x students based on row depth */}
        {((i + 1) % studentRowDepth) - 1 === 0 ? (
          <div key={i + student.name} className="row-divide">
            <hr></hr>
            <span>{i / studentRowDepth + 1}</span>
            <hr></hr>
          </div>
        ) : null}
        <div className={props.toggleDelete ? "student delete" : "student"} style={{position:"relative"}} name="student-info" id={student.name + "-info"} onClick={props.toggleDelete ? handleDelete : null}>
          {student.email && screenWidth > 800 && (
            <a className="student-email" style={{ color: "white", position:"absolute", left:-80 }} href={`mailto:${student.email}?subject=Physical Education Class`}>
              <CiMail size={40} />
            </a>
          )}

          <div className="flex-space-between">
            {/* Student Button with their name */}
            <input className="tl-round student-button button" type="button" key={student.name} id={i + "-" + student.name} name="name" value={student.name} onClick={props.toggleDelete ? undefined : handleDecrement} />
            <input className="tr-round button daily-points " key={student.name + "-points"} name="daily-points" type="button" id={i + "-points"} value={studentPoints[studentId]} onClick={props.toggleDelete ? undefined : handleIncrement} />
          </div>
          <div className="flex-space-between notes" data-toggle="off">
            <input className={"bl-round button note " + attendance[studentId]} name="attendance" type="button" key={student.name + "-attendance"} id={i + "-attendance"} data-toggle="off" value={attendance[studentId]} onClick={props.toggleDelete ? undefined : handleAttendance} />
            <input className="button note" name="note1" type="button" id={i + "-note1"} data-note={note[i + "-note1"]} onClick={props.toggleDelete ? undefined : handleNote} value={props.settings.note1} />
            <input className="button note" name="note2" type="button" id={i + "-note2"} data-note={note[i + "-note2"]} onClick={props.toggleDelete ? undefined : handleNote} value={props.settings.note2} />
            <input className="button note " name="note3" type="button" id={i + "-note3"} data-note={note[i + "-note3"]} onClick={props.toggleDelete ? undefined : handleNote} value={props.settings.note3} />
            <input className="button note " name="note4" type="button" id={i + "-note4"} data-note={note[i + "-note4"]?.active || false} onClick={props.toggleDelete ? undefined : handleNote} value={note[i + "-note4"]?.value || props.settings.note4[0]} />
            <input className="br-round button note " style={{ textAlign: "center" }} name="note5" type="text" key={student + "-note5"} id={i + "-note5"} placeholder="?" data-note={note[i + "-note5"]} value={note[i + "-customNote"]} onChange={props.toggleDelete ? undefined : handleNote} />
          </div>
        </div>
      </React.Fragment>
    )
  })
  return (
    <React.Fragment>
      {showModal && <Confirm item={studentToDelete} showModal={showModal} handleModal={handleModal} warningMessageString={`Permanently delete ${studentToDelete}?`} />}
      {studentButtons}
    </React.Fragment>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ListStudents)
