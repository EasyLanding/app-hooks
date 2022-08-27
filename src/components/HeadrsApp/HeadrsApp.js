import React, { useState } from 'react';
import "./HeadrsApp.css"

const HeadrsApp = ({ onSearchChange }) => {
    const [term, setTerm] = useState('')

    const onTermChange = (e) => {
        setTerm(e.target.value);

        onSearchChange(e.target.value);
    }

    return (
        <header className="header">
            <h1>todos</h1>
            <input className="new-todo"
                placeholder="Search you Task ToDay..."
                value={ term }
                onChange={ onTermChange }
            />
        </header>
    )
}

export default HeadrsApp