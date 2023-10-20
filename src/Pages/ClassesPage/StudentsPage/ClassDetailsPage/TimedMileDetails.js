import { useEffect, useState } from "react"
import "../StudentPage.scss"
import { formatMileTime, organizeStundenDetails } from "../../../../utils/utilities"
import Keypad from "../../../../components/Keypad"
import { CSVLink } from "react-csv"

export default function TimedMileDetails({ studentDetailInputs, handleChange, currentClass }) {
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [studentState, setStudentState] = useState(studentDetailInputs.map((s) => ({ ...s, mileRun: 0, currentLaps: 0 })) || [])
  const [keypad, setKeypad] = useState("")
  const [showKeypad, setShowKeypad] = useState(false)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    let interval

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isRunning])

  useEffect(() => {
    handleChange(studentState)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentState])

  const lapColor = {
    0: "transparent",
    1: "#FFD7B3",
    2: "#FFC0EA",
    3: "#B0F5FF",
    4: "#CDFFB2",
    5: "#F7FF93",
  }

  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setSeconds(0)
  }

  const handleKeypad = (e) => {
    e.preventDefault()

    if (e.target.value === "enter") {
      const number = keypad
      const objIndex = studentState.findIndex((obj) => obj.number === number)
      if (objIndex !== -1) {
        setStudentState((prev) => {
          const newState = [...prev]
          if (newState[objIndex]["currentLaps"] < 4) {
            newState[objIndex] = { ...newState[objIndex], mileRun: seconds, laps: newState[objIndex]["currentLaps"] + 1 }
          } else {
            newState[objIndex] = { ...newState[objIndex], laps: newState[objIndex]["currentLaps"] + 1 }
          }
          return newState
        })
      }
      setKeypad("")
      return
    } else if (e.target.value === "backspace") {
      setKeypad((prev) => prev.slice(0, -1))
      return
    }
    setKeypad((prev) => prev + e.target.value)
  }

  const stampCurrentTime = (e) => {
    const name = e.currentTarget.getAttribute("name")
    const objIndex = studentState.findIndex((obj) => obj.name === name)
    setShowKeypad(false)
    setStudentState((prev) => {
      const newState = [...prev]
      newState[objIndex] = { ...newState[objIndex], mileRun: seconds, currentLaps: newState[objIndex]["currentLaps"] + 1 }
      return newState
    })
  }

  return (
    <>
      {seconds > 0 && <div className="fixed-top w-25 m-auto text-center p-3">{formatMileTime(seconds)}</div>}
      <div className="d-flex w-100 pl-2 py-1 mw-100 overflow-hidden justify-content-between position-relative">
        <button className="submit-button w-25 m-2" onClick={toggleTimer}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button className="submit-button w-25 m-2 bg-danger text-white" onClick={resetTimer}>
          Reset
        </button>
        <button className="submit-button w-25 m-2 px-2 fixed bottom-3 right-3" onClick={() => setShowKeypad((prev) => !prev)}>
          {showKeypad ? "Close" : "Keypad"}
        </button>
      </div>
      {studentState.map((s, i) => {
        if (!showAll && s["currentLaps"] > 3) return null
        return (
          <div className="d-flex w-100 student-details pl-2 py-1 mw-100 overflow-hidden" key={i + s.name}>
            <div className="d-flex flex-column align-items-end text-white w-100">
              <div className="d-flex my-1 p-1 justify-content-between w-100" onClick={stampCurrentTime} name={s.name}>
                <div className="mile-num-name">
                  <span className="p-1">{s.number}</span>
                  <button className="text-white border-0 text-start rounded-3 bg-transparent overflow-elipsis" name={s.name}>
                    {s.name}
                  </button>
                </div>
                <div className="">
                  <span className="px-2 py-1 rounded-3" style={{ background: s.currentLaps < 5 ? lapColor[s.currentLaps] : lapColor[5], color: "black" }}>
                    {s["currentLaps"]}
                  </span>
                  <span className="justify-content-between px-2 rounded-3">{formatMileTime(s["mileRun"])}</span>
                </div>
              </div>
            </div>
          </div>
        )
      })}
      <div className="d-flex justify-content-between m-1">
        <button className="btn btn-secondary w-full" onClick={() => setShowAll((prev) => !prev)}>
          {showAll ? "Hide Finished?" : "Show All?"}
        </button>
        <CSVLink className="btn btn-secondary " data={organizeStundenDetails(studentDetailInputs)} filename={`cc-scores-${currentClass}-${new Date().toLocaleDateString()}.csv`}>
          Download
        </CSVLink>
      </div>
      {showKeypad && keypad && (
        <div className="w-full fixed-top h-100">
          <div className="d-flex w-full h-100 justify-content-center align-items-center">
            <div className={`mile-run-num-popup ${keypad.length == 3 ? "red-background" : keypad.length == 2 ? "green-background" : null}`}>
              <span>{keypad}</span>
            </div>
          </div>
        </div>
      )}
      <Keypad isKeypadVisible={showKeypad} handleKeypad={handleKeypad} />
    </>
  )
}
