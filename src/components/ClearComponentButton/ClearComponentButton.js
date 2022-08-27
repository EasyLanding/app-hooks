import React from 'react'
import '../Footer/Footer.css'

const ClearComponentButton = ({ onClearChange }) => {
    return (
        <button
            className="clear-completed"
            key={ "abcdf" }
            onClick={ () => onClearChange() }
        > Clear completed</button>
    )
}

export default ClearComponentButton