import React from 'react';
import './Task.css';
import TaskInfo from './TaskInfo';


const Task = ({ todos, onDeleted, onToggleDone, onToggleImportant, onAdded, onSaveChange, statusHandler }) => {
	const elements = todos.map((el) =>
	{
		const { id, ...itemProps } = el;
		return (
			<TaskInfo
				key={ id }
				{ ...itemProps }
				onDeleted={ () => onDeleted(id) }
				onToggleImportant={ () => onToggleImportant(id) }
				onToggleDone={ () => onToggleDone(id) }
				onAdded={ () => onAdded(id) }
				text={  itemProps.text }
				onSaveChange={onSaveChange}
				id={id}
			/>
		);
	});
	return (
		<ul className="todo-list">
			{ elements }
		</ul>
	);
}

export default Task