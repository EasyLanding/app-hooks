import React, { useEffect, useState } from 'react';
import './Task.css';
import { formatDistanceToNow } from 'date-fns';

const TaskInfo = ({ label, onDeleted, onToggleImportant, onToggleDone, done, important, onSaveChange, time, id, setTimeFromTimer, min, sec }) =>
{
	const [edit, setEdit] = useState(false)

	const [timeFlag, setTimeFlag] = useState({
		minutes: 0,
		seconds: 0,
	});
	const [timerOn, setTimerOn] = useState(false);

	useEffect(() =>
	{
		setTimeFlag(() =>
		{
			if (min === '')
			{
				min = 0;
			}
			if (sec === '')
			{
				sec = 0;
			}
			return {
				minutes: min,
				seconds: sec,
			};
		});
	}, []);

	useEffect(() =>
	{
		let interval = null;
		if (timerOn)
		{
			interval = setInterval(() =>
			{
				if (timeFlag.seconds > 0)
				{
					setTimeFlag(() =>
					{
						return {
							seconds: timeFlag.seconds - 1,
							minutes: timeFlag.minutes,
						};
					});
					setTimeFromTimer(id, timeFlag.minutes, timeFlag.seconds);
				}
				if (timeFlag.seconds === 0 && timeFlag.minutes > 0)
				{
					setTimeFlag((timeFlag) =>
					{
						return {
							seconds: timeFlag.seconds + 59,
							minutes: timeFlag.minutes - 1,
						};
					});
					setTimeFromTimer(id, timeFlag.minutes, timeFlag.seconds);
				} else
				{
					clearInterval(interval);
				}
			}, 1000);
		}
		return () => clearInterval(interval);
	}, [timerOn, timeFlag.minutes, timeFlag.seconds, setTimeFromTimer, id]);

	let m = timeFlag.minutes;
	let s = timeFlag.seconds;

	m < 10 && (m = '0' + m);
	s < 10 && (s = '0' + s);








	const editToDo = () =>
	{
		setEdit(!edit)
	}

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
							onClick={ () => setTimerOn(true) }
							className="icon-play"
						></button>
						<button
							onClick={ () => setTimerOn(false) }
							className="icon-pause"></button>
						<p className="timeTask">{ m }:{ s }</p>
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