import { connect } from 'react-redux'
import { updateDbResponse, updateStudentList } from '../../../../Redux/actions'
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

});

const mapDispatchToProps = {
  updateStudentList,
  updateDbResponse,
};


function ClassDetailsPage(
  {studentList}
) {
 
  console.log(studentList)
  return (
    <section className='mt-5 pt-5'>
      <h1 className='mt-5 pt-5 text-white'>Class Details</h1>
      <h1 className='mt-5 pt-5'>Class Details</h1>
      <h1 className='mt-5 pt-5'>Class Details</h1>
      <h1 className='mt-5 pt-5 text-white'>Class Details</h1>
    {/* <div>{studentList.map(s => {
      return (
        

          <div>s.name</div>
      
      )
    })}</div> */}
      </section>
  )
}


export default connect(mapStateToProps, mapDispatchToProps)(ClassDetailsPage);