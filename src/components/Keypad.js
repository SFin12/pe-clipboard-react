import './Keypad.scss'

export default function Keypad({ isKeypadVisible, handleKeypad }) {
  return (
    <div className={`keypad ${isKeypadVisible ? 'visible' : ''}`} onClick={handleKeypad}>
        <div className="keypad-row">
          <button className='keypad-button' value={1}>1</button>
          <button className='keypad-button' value={2}>2</button>
          <button className='keypad-button' value={3}>3</button>
        </div>
        <div className="keypad-row">
          <button className='keypad-button' value={4}>4</button>
          <button className='keypad-button' value={5}>5</button>
          <button className='keypad-button' value={6}>6</button>
        </div>
        <div className="keypad-row">
          <button className='keypad-button' value={7}>7</button>
          <button className='keypad-button' value={8}>8</button>
          <button className='keypad-button' value={9}>9</button>
        </div>
        <div className="keypad-row">
          <button className="keypad-button enter-btn" value={"enter"}>Enter</button>
          <button className='keypad-button' value={0}>0</button>
          <button value={"backspace"} className='keypad-button backspace'>{'<<'}</button>
        </div>
      </div>
  )
}