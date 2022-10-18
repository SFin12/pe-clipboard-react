import React, { useEffect, useState } from "react"
import { connect } from "react-redux"

import { updatePage } from "../../../Redux/actions"
import { useNavigate } from "react-router"

import ListStudentInfo from "../../../components/ListStudentInfo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import FilterDays from "../../../components/FilterDays"
import "react-date-range/dist/styles.css" // main style file
import "react-date-range/dist/theme/default.css" // theme css file
import { Button } from "reactstrap"
import { Link } from "react-router-dom"
import "./studentInfoPage.scss"

const mapStateToProps = (state) => ({
  currentPage: state.currentPage,
  gradebook: state.gradebook,
  class: state.class,
  studentList: state.studentList,
  dailyPoints: state.settings.dailyPoints,
  studentInfo: state.studentInfo,
})

const mapDispatchToProps = {
  updatePage,
}

function StudentInfoPage(props) {
  const [infoExists, setInfoExists] = useState(false)
  const [startDateFilter, setStartDateFilter] = useState("")
  const [endDateFilter, setEndDateFilter] = useState("")

  //Remove punctuation in class & gradebook names to match db key
  const uncleanCurrentGb = props.gradebook
  const uncleanCurrentClass = props.class
  const currentGb = uncleanCurrentGb.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, " ")
  const currentClass = uncleanCurrentClass.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, " ") //key/property used in db for studentLists and studentInfo
  const classKey = currentGb + "-" + currentClass

  const { studentInfo } = props

  useEffect(() => {
    props.updatePage("Student Info")
    if (studentInfo[classKey]) {
      setInfoExists(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const navigate = useNavigate()

  function handleDate(startDate, endDate) {
    setStartDateFilter(startDate)
    setEndDateFilter(endDate)
  }

  function checkFilter(filter) {
    if (!filter) {
      setStartDateFilter(null)
      setEndDateFilter(null)
    }
  }

  return (
    <React.Fragment>
      <h1 className="header">Student Info</h1>
      <FontAwesomeIcon name="left-arrow" icon={faArrowLeft} color="green" className="back-arrow" onClick={() => navigate(-1)} />
      <hr />

      <div className="d-flex justify-content-center">
        <span>
          <h2 className="subtitle mb-4">
            {props.gradebook} - {props.class}
          </h2>
        </span>
      </div>
      <div className="container">
        {!infoExists ? (
          <h3>No student information to display</h3>
        ) : (
          <>
            <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between mb-4">
              

              <FilterDays handleDate={handleDate} checkFilter={checkFilter} />
              <span className="mb-4"  >
                <Link to={"/editStudentInfo"} state={studentInfo[classKey]}>
                  <Button className="edit-button" size="sm">Edit</Button>
                </Link>
              </span>
              
            </div>
            <ListStudentInfo startDate={startDateFilter} endDate={endDateFilter} />
          </>
        )}
      </div>
    </React.Fragment>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentInfoPage)
