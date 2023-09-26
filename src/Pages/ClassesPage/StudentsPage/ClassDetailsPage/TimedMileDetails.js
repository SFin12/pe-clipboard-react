import { useEffect, useState } from "react"
import "../StudentPage.scss"
import { formatMileTime } from "../../../../utils/utilities"
import Keypad from "../../../../components/Keypad"

export default function TimedMileDetails({ studentDetailInputs, handleChange }) {
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [studentState, setStudentState] = useState(studentDetailInputs.map((s) => ({ ...s, mileRun: 0, laps: 0 })) || [])
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
    1: "#4200CF", // purple,
    2: "#003FCF", // dark blue
    3: "#007D85",
    4: "yellow",
    5: "#B10000", // red
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
          if (newState[objIndex]["laps"] < 4) {
            newState[objIndex] = { ...newState[objIndex], mileRun: seconds, laps: newState[objIndex]["laps"] + 1 }
          } else {
            newState[objIndex] = { ...newState[objIndex], laps: newState[objIndex]["laps"] + 1 }
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
    const name = e.target.name
    const objIndex = studentState.findIndex((obj) => obj.name === name)
    setStudentState((prev) => {
      const newState = [...prev]
      if (newState[objIndex]["laps"] < 4) {
        newState[objIndex] = { ...newState[objIndex], mileRun: seconds, laps: newState[objIndex]["laps"] + 1 }
      } else {
        newState[objIndex] = { ...newState[objIndex], laps: newState[objIndex]["laps"] + 1 }
      }
      return newState
    })
  }

  return (
    <>
 
       {showKeypad && keypad && <span className="m-auto mt-2 bg-secondary p-1 text-white fixed-top w-25 text-center p-2">{keypad}</span>}
 
      <div className="d-flex w-100 pl-2 py-1 mw-100 overflow-hidden justify-content-between position-relative">
        <button className="submit-button w-25 m-2" onClick={toggleTimer}>
          {seconds ? formatMileTime(seconds) : "Start"}
        </button>
        <button className="submit-button w-25 m-2 bg-danger text-white" onClick={resetTimer}>
          Reset
        </button>
        <button className="submit-button w-25 m-2 px-2 fixed bottom-3 right-3" onClick={() => setShowKeypad((prev) => !prev)}>
          {showKeypad ? "Close" : "Keypad"}
        </button>

      </div>
      {studentState.map((s, i) => {
        if (!showAll && s["laps"] > 3) return null
        return (
          <div className="d-flex w-100 student-details pl-2 py-1 mw-100 overflow-hidden">
            <div className="d-flex flex-column align-items-end text-white w-100">
              <div className="d-flex my-1 p-1 justify-content-between w-100">
                <div>
                  <span className="rounded-circle p-1">{s.number}</span>
                  <button className="text-white border-0 text-start rounded-3 bg-transparent" name={s.name} onClick={stampCurrentTime}>
                    {s.name}
                  </button>
                </div>
                <div className="">
                  <span className="px-2 py-1 rounded-3" style={{ background: s.laps < 4 ? lapColor[s.laps] : lapColor[4], color: s.laps < 4 ? "white" : "black" }}>
                    {s["laps"]}
                  </span>
                  <span className="justify-content-between px-2 rounded-3">{formatMileTime(s["mileRun"])}</span>
                </div>
              </div>
            </div>
          </div>
        )
      })}
      <button className="bg-secondary" onClick={() => setShowAll((prev) => !prev)}>
        {showAll ? "Hide Finished?" : "Show All?"}
      </button>
      <Keypad isKeypadVisible={showKeypad} handleKeypad={handleKeypad} />
    </>
  )
}
