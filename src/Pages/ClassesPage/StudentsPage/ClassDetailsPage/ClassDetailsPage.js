import { connect } from "react-redux"
import { updateDbResponse, updateStudentList } from "../../../../Redux/actions"
// import {
//   updateStudentList,
//   updateDbResponse
// } from "../../../Redux/actions";

const mapStateToProps = (state) => ({
  currentPage: state.currentPage,
  gradebook: state.gradebook,
  class: state.class,
  student: state.student,
  studentList: state.studentList,
})

const mapDispatchToProps = {
  updateStudentList,
  updateDbResponse,
}

function ClassDetailsPage({ studentList }) {

  console.log(studentList)

  return (
    <section className="mt-5 pt-5">
      {/* <div>
        {studentList.map((s, i) => {
          return (
          
              <div key={i + s}>
                <div>{s.name}</div>
                <div>{s.name}</div>
              </div>
          )
        })}
      </div> */}
    </section>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassDetailsPage)
