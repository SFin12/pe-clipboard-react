

export default function EditStudentNumbers({studentNumberInputs, studentNumbersRef, handleChange, handleEnter}) {
  return (
    <form className="">
      {studentNumberInputs.map((s, i) => {
        return (
          <div className="d-flex w-100">
          <div className="d-flex flex-column w-75" key={i + s.name}>
            <div className="">{s.name}</div>
            </div>
            <div className="d-flex flex-column w-25">
              <input
              type="text"
              inputMode="numeric"
              onFocus={(e) => e.target.select()}
              // min={0}
              // max={99}
                ref={(ref) => {
                  // creates dynamic array of refs
                  studentNumbersRef.current[i] = ref
                }}
                className="w-100 text-center"
                id={i + "-studentNumbers"}
                value={s.number}
                placeholder={s.number}
                name={s.name}
                onChange={handleChange}
                onKeyDown={handleEnter}
              />
            </div>  
          </div>
        )
      })}

  </form>
  )
}
