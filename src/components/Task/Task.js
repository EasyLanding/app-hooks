import React from 'react';
import './Task.css';
import TaskInfo from './TaskInfo';


const Task = ({ todos, onDeleted, onToggleDone, onToggleImportant, onAdded, onSaveChange, setTimeFromTimer }) =>
{
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
				onSaveChange={ onSaveChange }
				id={ id }
				setTimeFromTimer={ setTimeFromTimer }
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