import React, { useEffect, useState } from 'react';
import './Task.css';
import { formatDistanceToNow } from 'date-fns';

const TaskInfo = ({ label, onDeleted, onToggleImportant, onToggleDone, done, important, onSaveChange, text, time, id }) =>
{
	const [edit, setEdit] = useState(false)
	const [secondsElapsed, setSecondsElapsed] = useState(122)
	const [timeFlag, setTimeFlag] = useState(false)

	const editToDo = () =>
	{
		setEdit(!edit)
	}

	const getHours = () =>
	{
		return ("0" + Math.floor(secondsElapsed / 3600)).slice(-2);
	}

	const getMinutes = () =>
	{
		return ("0" + Math.floor((secondsElapsed % 3600) / 60)).slice(-2);
	}

	const getSeconds = () =>
	{
		return ("0" + (secondsElapsed % 60)).slice(-2);
	}

	useEffect(() =>
	{
		let countdown = setInterval(function ()
		{
			setSecondsElapsed(secondsElapsed - 1);
		}, 1000)
		if (timeFlag)
		{
			// eslint-disable-next-line no-unused-expressions
			countdown
		} else
		{
			return clearInterval(countdown)
		}
	}, [timeFlag, secondsElapsed])

	let classNames = '';
	let classNamesD = 'description';
	if (done)
	{
		classNames = 'completed';
	}

	if (important)
	{
		classNamesD += ' important';
	}

	return (
		<li className={ classNames }>
			<div className="view">
				<input className="toggle" type="checkbox" onClick={ onToggleImportant } />
				<label>
					{
						edit ?
							<div>
								<input
									className="inputChangeValue"
									defaultValue={ label }
									onKeyDown={ (e) =>
									{
										if (e.key === 'Escape' || e.key === 'Enter')
										{
											onSaveChange(id, e.target.value)
											setEdit(false)
										}
									} }
								/>
							</div>
							: <span className={ classNamesD } onClick={ onToggleDone }>{ label }</span>
					}
					<span className="description">
						<button
							disabled={ timeFlag }
							onClick={ () => setTimeFlag(true) }
							className="icon-play"
						></button>
						<button
							onClick={ () => setTimeFlag(false) }
							className="icon-pause"></button>
						<p className="timeTask">{ getHours() }:{ getMinutes() }:{ getSeconds() }</p>
					</span>
					<span className="created">{ formatDistanceToNow(time, { includeSeconds: true }) }</span>
				</label>
				<button
					className="icon icon-edit"
					onClick={ editToDo }
				></button>
				<button className="icon icon-destroy" onClick={ onDeleted }></button>
			</div>
		</li>
	);
}

export default TaskInfo