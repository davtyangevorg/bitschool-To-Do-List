import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid';
import style from './toDoList.module.scss'

import taskNote from '../../images/taskNote.svg'
import { FaPlus } from 'react-icons/fa'

class ToDoList extends Component {

    state = {
        title: '',
        description: '',
        tasks: []
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        if(!this.state.title) return
        this.setState({
            title: '',
            description: '',
            tasks: [...this.state.tasks, {
                id: uuidv4(),
                title: this.state.title,
                description: this.state.description
            }]
        })
    }

    deleteTask = (taskId) => {
        this.setState({
            tasks: this.state.tasks.filter(el => el.id !== taskId)
        })
    }

    render() {
        const TasksList = !this.state.tasks.length
            ? <div className={style.notTasks}>
                <img alt='taskNote' src={taskNote}></img>
                <h3>Create your first task</h3>
                <p>You do not have any tasks yet</p>
                <button><FaPlus size='1rem' /></button>
            </div>
            : this.state.tasks.map(el => {
                return <div className={style.task} key={el.id}>
                    <h4>{el.title}</h4>
                    <p>{el.description}</p>
                    <div onClick={() => { this.deleteTask(el.id) }}>&#10062;</div>
                </div>
            })
        return (
            <div>
                <form onSubmit={this.handleSubmit} className={style.form}>
                    <input
                        name='title'
                        value={this.state.title}
                        onChange={this.handleChange}
                        placeholder='title'
                    />
                    <input
                        name='description'
                        value={this.state.description}
                        onChange={this.handleChange}
                        placeholder='description'
                    />
                    <button>Add Task</button>
                </form>
                <div className={style.tasks}>
                    {TasksList}
                </div>
            </div>
        )
    }
}
export default ToDoList