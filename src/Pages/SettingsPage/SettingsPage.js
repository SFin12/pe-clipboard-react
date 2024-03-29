import React, { useRef, useState } from "react"
import { Button } from "react-bootstrap"
import { connect } from "react-redux"
import { updateSettings } from "../../Redux/actions"
import SuccessModal from "../../components/SuccessModal"

import "./SettingsPage.scss"
import ToggleSwitch from "../../components/ToggleSwitch"

const mapStateToProps = (state) => {
  return {
    currentPage: state.currentPage,
    settings: state.settings,
  }
}

const mapDispatchToProps = {
  updateSettings,
}

export function SettingsPage(props) {
  const [showSaved, setShowSaved] = useState(false)
  const [alphabetize, setAlphabetize] = useState(props.settings.alphabetize)
  const dPointsRef = useRef()
  const absentPointsRef = useRef()
  const tardyPointsRef = useRef()
  const n1Ref = useRef()
  const n2Ref = useRef()
  const n3Ref = useRef()
  const n4Ref = useRef([])
  const n1PointsRef = useRef()
  const n2PointsRef = useRef()
  const n3PointsRef = useRef()
  const n4PointsRef = useRef([])

  function handleSubmit(e) {

    e.preventDefault()
    if (e.keyCode !== 13) {
      const settingsObj = {
        alphabetize: alphabetize,
        dailyPoints: Number(dPointsRef.current.value),
        absentPoints: Number(absentPointsRef.current.value),
        tardyPoints: Number(tardyPointsRef.current.value),
        note1: n1Ref.current.value,
        note1Points: Number(n1PointsRef.current.value),
        note2: n2Ref.current.value,
        note2Points: Number(n2PointsRef.current.value),
        note3: n3Ref.current.value,
        note3Points: Number(n3PointsRef.current.value),
        note4: [n4Ref.current[0].value, n4Ref.current[1].value],
        note4Points: [Number(n4PointsRef.current[0].value), Number(n4PointsRef.current[1].value)],
     
      }
      props.updateSettings(settingsObj)
      setShowSaved(true)
      setTimeout(() => {
        setShowSaved(false)
      }, 2000)
    }
  }

  function handleAlphabetizeToggle() {
    setAlphabetize(!alphabetize)

  }

  return (
    <React.Fragment>
      <h1 className="header">Settings</h1>
      
      <hr />
      <div className="form-container">
        <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center  align-items-lg-end settings-form">
          <table>
            <tbody>
              <tr>
                <td>
                  <ToggleSwitch label={"Alphabetize Rosters"} checked={alphabetize} handleToggle={handleAlphabetizeToggle} />
                </td>
              </tr>
              <tr>
                <td>
                  Starting Daily Points: <input type="number" className="mb-4" maxLength={2} min={0} max={99} defaultValue={props.settings.dailyPoints} ref={dPointsRef}></input>
                </td>
              </tr>
            </tbody>
          </table>
          <table className="settings-table">
            <thead>
              <tr>
                <th>Attendance</th>
                <th className="">Points Effect</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Absent: </td>
                <td>
                  Number Value: <input type="number" className="note-settings" maxLength={3} ref={absentPointsRef} defaultValue={props.settings.absentPoints} />
                </td>
              </tr>
              <tr>
                <td>Tardy: </td>
                <td>
                  Number Value: <input type="number" className="note-settings" maxLength={3} ref={tardyPointsRef} defaultValue={props.settings.tardyPoints} />
                </td>
              </tr>
            </tbody>
          </table>
          <table className="settings-table">
            <thead>
              <tr>
                <th>Notes</th>
                <th className="">Points Effect</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  1st Note: <input type="text" className="note-settings" placeholder="Example: EX" maxLength={2} ref={n1Ref} defaultValue={props.settings.note1}></input>
                </td>
                <td>
                  Number Value: <input type="number" className="note-settings" placeholder="Example: -5" maxLength={3} ref={n1PointsRef} defaultValue={props.settings.note1Points} />
                </td>
              </tr>
              <tr>
                <td>
                  2nd Note: <input type="text" className="note-settings" maxLength={2} ref={n2Ref} defaultValue={props.settings.note2} />
                </td>
                <td>
                  Number Value: <input type="number" className="note-settings" maxLength={3} ref={n2PointsRef} defaultValue={props.settings.note2Points} />
                </td>
              </tr>
              <tr>
                <td>
                  3rd Note: <input type="text" className="note-settings" maxLength={2} ref={n3Ref} defaultValue={props.settings.note3} />
                </td>
                <td>
                  Number Value: <input type="number" className="note-settings" maxLength={3} ref={n3PointsRef} defaultValue={props.settings.note3Points} />
                </td>
              </tr>
              <tr>
                <td>
                  4th Note a: <input type="text" className="note-settings" maxLength={2} ref={(inputText)=> n4Ref.current.push(inputText)} defaultValue={props.settings.note4[0]} />
                
                </td>
                <td>
                  Number Value: <input type="number" className="note-settings" maxLength={3} ref={(inputNumber)=> n4PointsRef.current.push(inputNumber)} defaultValue={props.settings.note4Points[0]} />
                </td>
              </tr>
              <tr>
                <td>
                  4th Note b: <input type="text" className="note-settings" maxLength={2} ref={(inputText)=> n4Ref.current.push(inputText)} defaultValue={props.settings.note4[1]} />
                
                </td>
                <td>
                  Number Value: <input type="number" className="note-settings" maxLength={3} ref={(inputNumber)=> n4PointsRef.current.push(inputNumber)} defaultValue={props.settings.note4Points[1]} />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="p-5 d-flex justify-content-center align-items-center settings-btn-container">
            <Button variant="secondary" type="submit" size="lg" id="submit-button" >
              Save
            </Button>
          </div>
        </form>
      </div>
      {showSaved ? <SuccessModal showSuccess={showSaved} title={"Saving"} messageString={"Settings have been updated."} /> : null}
    </React.Fragment>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage)
