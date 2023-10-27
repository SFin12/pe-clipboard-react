import "../StudentPage.scss"


export default function EditStudentDetails({studentDetailInputs, studentDetailsRef, detailType, handleChange, handleEnter}) {
  const inputModeType = {
    number: "numeric",
    gender:"text",
    group: "text",
    email: "email",
    phone: "tel",
    pacer: "numeric",
    mileRun: "decimal",
    laps: "numeric",
    mileResults: "text",
    pushUps: "numeric",
    curlUps: "numeric",
    trunkLift: "numeric",
    shoulderLeft: "text",
    shoulderRight: "text",
    sitReachLeft: "numeric",
    sitReachRight: "numeric",
    height: "numeric",
    weight: "numeric",
    notes: "text",
  }

  return (
    <>
      {studentDetailInputs.map((s, i) => {
        return (
          <div className="d-flex w-100 student-details pl-2 py-1 mw-100 overflow-hidden" key={i + s.name}>
          <div className="d-flex flex-column w-100" >
            <div className="">{s.name}</div>
            </div>
            <div className="d-flex flex-column align-items-end">
              <input
              type="text"
              inputMode={inputModeType[detailType]} // "text" || "numeric" || "tel" || "search" || "email" || "url"
              onFocus={(e) => e.target.select()}
              // min={0}
              // max={99}
                ref={(ref) => {
                  // creates dynamic array of refs
                  studentDetailsRef.current[i] = ref
                }}
                className="text-center"
                id={i + "-student" + detailType}
                value={s[detailType]}
                placeholder={s[detailType]}
                name={s.name}
                onChange={handleChange}
                onKeyDown={handleEnter}
                style={{width: s[detailType]?.length * 12 + 10 || 50, minWidth:50, maxWidth:220}}
              />
            </div>
          </div>
        )
      })}

  </>
  )
}
