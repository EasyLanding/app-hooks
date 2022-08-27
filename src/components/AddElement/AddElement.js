import React, { useState } from 'react'
import './AddElement.css'

const AddElement = ({ onAdded }) => {

const [label,setLabel] = useState('')
const onLabelChange = (e) => {
    setLabel( e.target.value )
}
const onSubmit = (e) =>{
    e.preventDefault()
    onAdded(label)
    setLabel('')
}

return(

    <form className="addElement"
        onSubmit={ onSubmit }
    >
        <input type="text"
            className="form-control"
            onChange={ onLabelChange }
            placeholder="What needs to be done today?"
            value={ label }
        />

        <input
            className="new-todo-timer input-timer-minutes"
            placeholder="Min"
            //onChange={ onToggleMinutes }
            //value={ minutesField }
            maxLength={ 2 }
            autoFocus
        />
        <input
            className="new-todo-timer input-timer-seconds"
            placeholder="Sec"
            //onChange={ onToggleSeconds }
            //value={ secondsField }
            maxLength={ 2 }
            autoFocus
        />
        <button >Add Task</button>
    </form>
)
}

export default AddElement