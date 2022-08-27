import React from 'react';
import './Footer.css'

const Footer = ({ toDo, done }) =>
{
    return (


        <span className="todo-count"
        >
            { toDo } more to do, { done } done
        </span>
    )
}
export default Footer