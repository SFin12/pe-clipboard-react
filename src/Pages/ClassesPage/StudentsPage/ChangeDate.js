import { useState } from "react"
import "react-date-range/dist/styles.css" // main style file
import "react-date-range/dist/theme/default.css" // theme css file
import DatePicker from "../../../components/DatePicker"
import { connect } from "react-redux"
import { formatDate } from "../../../utils/utilities"
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

function ChangeDate(props) {
  const defaultStartDate = new Date(new Date().setDate(new Date().getDate()))
  const [startDate, setStartDate] = useState(formatDate(defaultStartDate))

  function handleDateChange(e) {
    const date = e.target.value
    setStartDate(() => date)
  }

  return (
    <>
      <DatePicker label={"Choose a date to modify:"} name={"date"} id={"date"} startDate={startDate} changeHandler={handleDateChange} />
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeDate)
