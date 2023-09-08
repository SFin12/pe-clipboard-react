import React, { useRef, useEffect } from 'react';
import "./AutoExpandTextarea.scss"

function AutoExpandTextarea({ value, onChange }) {
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [value]); // Recompute when the value changes

    return (
        <textarea
            ref={textareaRef}
            className="auto-expand"
            value={value}
            onChange={onChange}
            rows="1"
        />
    );
}

export default AutoExpandTextarea;
