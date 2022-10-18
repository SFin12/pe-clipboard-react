import "./ListStudentInfo.scss";

function DesktopStudentInfo(props) {
  
    return (
        <tr>
            <td>{props.student}</td>
            <td>{props.totalPoints}</td>
            <td>{props.pointsPossible}</td>
            <td>{props.gradePercentage}</td>
            <td>{props.notes}</td>
            <td>{props.absences}</td>
            <td>{props.tardies}</td>
        </tr>
    );
}

export default DesktopStudentInfo;
