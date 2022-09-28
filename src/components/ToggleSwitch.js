import "./ToggleSwitch.scss";

function ToggleSwitch({ checked, handleToggle, label }) {
  console.log(checked)
    return (
        <div className="d-block">
            <label htmlFor="checkbox" className="mr-3">
                {label}
            </label>
            <label className="switch">
                <input
                    type="checkbox"
                    checked={checked}
                    id="checkbox"
                    onChange={handleToggle}
                />
                <span className="slider round"></span>
            </label>
        </div>
    );
}

export default ToggleSwitch;
