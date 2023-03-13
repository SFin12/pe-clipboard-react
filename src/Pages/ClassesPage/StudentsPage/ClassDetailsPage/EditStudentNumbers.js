

export default function EditStudentNumbers({studentNumberInputs, studentNumbersRef, handleChange, handleEnter}) {
  return (
    <form>
    {studentNumberInputs.map((s, i) => {
      return (
        <div className="d-flex justify-content-between" key={i + s.name}>
          <div>{s.name}</div>
          <input
          type="text"
          // inputMode="numeric"
          onFocus={(e) => e.target.select()}
          // min={0}
          // max={99}
            ref={(ref) => {
              // creates dynamic array of refs
              studentNumbersRef.current[i] = ref 
            }}
            className="w-25 text-center"
            id={i + "-studentNumbers"}
            value={s.number}
            placeholder={s.number}
            name={s.name}
            onChange={handleChange}
            onKeyDown={handleEnter}
          />
        </div>
      )
    })}
  </form>
  )
}
