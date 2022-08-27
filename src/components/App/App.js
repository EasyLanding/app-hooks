import React, {  useState } from 'react';
import HeadrsApp from '../HeadrsApp/HeadrsApp';
import Footer from '../Footer/Footer';
import Task from '../Task/Task';
import AddElement from '../AddElement/AddElement';
import '../Footer/Footer.css'
import TasksFilter from '../TaskFilter/TasksFilter';
import ClearComponentButton from '../ClearComponentButton/ClearComponentButton';

let nextId = 100
let keys = 101
let newArr = []

const App = () => {
    const createToDoItem = (label) => 
    {

        return {
            label,
            important: false,
            done: false,
            id: nextId++,
            key: keys++,
            time: new Date()
        }
    }

    const todoData = [createToDoItem("Completed task"),createToDoItem("Active task"),createToDoItem("Editing task")]
    const [todoTask, setTodoTask] = useState(todoData)
    const [term, setTerm] = useState('')
    const [filter, setFilter] = useState('all')
    newArr = [...todoTask]

    const deletedItem = (id) =>
    {
        setTodoTask(( todoTask ) =>
        {
            const index = todoTask.findIndex((el) => el.id === id)

            const beforeArray = todoTask.slice(0, index)
            const afterArray = todoTask.slice(index + 1)
            const newArray = [...beforeArray, ...afterArray]

            return newArray
            
        })
    }

    const onAddItem = (text, time) =>
    {
        const newItem = createToDoItem(text, time)
        setTodoTask(( todoTask ) =>
        {
            const newArr = [...todoTask, newItem]

            return newArr
        })
    }

    const onToggleDone = (id) =>
    {
        setTodoTask((todoTask) =>
        {
            const index = todoTask.findIndex((el) => el.id === id)
            const oldData = todoTask[index]

            const newItem = { ...oldData, done: !oldData.done }

            const newArray = [
                ...todoTask.slice(0, index),
                newItem,
                ...todoTask.slice(index + 1)
            ]

            return newArray
        })
    }

    const onToggleImportant = (id) =>
    {
        setTodoTask((todoTask) =>
        {
            const index = todoTask.findIndex((el) => el.id === id)
            const oldData = todoTask[index]

            const newItem = { ...oldData, important: !oldData.important }

            const newArray = [
                ...todoTask.slice(0, index),
                newItem,
                ...todoTask.slice(index + 1)
            ]

            return newArray
        })
    }

    const onSearchChange = (term) =>
    {
        setTerm( term )
    };

   const searchItems = (items, term)=>
    {
        if (term.length === 0)
        {
            return items;
        }

        return items.filter((item) =>
        {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        });
    }

    const filterTask = (items, filter) =>
    {
        if (filter === 'all')
        {
            return items;
        } else if (filter === 'active')
        {
            return items.filter((item) => (!item.done));
        } else if (filter === 'completed')
        {
            return items.filter((item) => item.done);
        }
    }

    const onFilterChange = (filter) =>
    {
        setFilter( filter );
    };

    const onClearChange = () =>
    {
        todoTask.forEach((el) =>
        {
          
            if (el.done)
            {
                deletedItem(el.id)
            }
        })
    }

    const onSaveChange = (id, text) =>
    {
        setTodoTask((todoTask) =>
        {
            const idx = todoTask.findIndex((el) => el.id === id)
            todoTask[idx].label = text
            return newArr
        })  
    }


    const visibleItems = filterTask(searchItems(todoTask, term), filter)


    const doneCount = todoTask.filter((el) => el.done).length
    const todoCount = todoTask.length - doneCount

    return (
        <section className="todoapp">
            < HeadrsApp
                onSearchChange={ onSearchChange }
            />
            <section className="main">
                <Task
                    todos={ visibleItems }
                    onDeleted={ deletedItem }
                    onToggleImportant={ onToggleImportant }
                    onToggleDone={ onToggleDone }
                    onSaveChange={ onSaveChange }
                />

                < AddElement
                    onAdded={ onAddItem }
                />

            </section>
            <footer className="footer">
                < Footer
                    toDo={ todoCount }
                    done={ doneCount }
                />
                < TasksFilter
                    filter={ filter }
                    onFilterChange={ onFilterChange }
                />
                <ClearComponentButton
                    onClearChange={ onClearChange }
                />
            </footer>
        </section>
    )
}

export default App