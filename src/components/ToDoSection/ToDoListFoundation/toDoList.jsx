import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid';

import { Row, Col } from 'react-bootstrap'
import styles from './toDoList.module.scss'

import taskNote from '../../../images/taskNote.svg'
import { FaPlus } from 'react-icons/fa'

class ToDoList extends Component {

    state = {
        title: '',
        description: '',
        tasks: [],
        selectedTasksIds: []
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        if (!this.state.title) return
        this.setState({
            title: '',
            description: '',
            tasks: [...this.state.tasks, {
                _id: uuidv4(),
                title: this.state.title,
                description: this.state.description
            }]
        })
    }

    deleteTask = (taskId) => {
        this.setState({
            tasks: this.state.tasks.filter(el => el._id !== taskId)
        })
    }

    addSelectedTaskId = (selectedId) => {
        this.setState({
            selectedTasksIds: [...this.state.selectedTasksIds, selectedId]
        })
    }
    removeSelectedTaskId = (clickedTaskId) => {
        this.setState({
            selectedTasksIds: this.state.selectedTasksIds.filter(selectedId => selectedId !== clickedTaskId)
        })
    }
    deleteSelectedTasks = () => {
        this.setState({
            tasks: this.state.tasks.filter(task => !this.state.selectedTasksIds.includes(task._id)),
            selectedTasksIds: []
        })
    }

    render() {
        console.log(this.state.selectedTasksIds)
        return (
            <>
                <Row>
                    <Col>
                        <form onSubmit={this.handleSubmit} className={styles.form}>
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
                    </Col>
                </Row>
                <Row>
                    <Tasks
                        tasks={this.state.tasks}
                        deleteTask={this.deleteTask}
                        addSelectedTaskId={this.addSelectedTaskId}
                        removeSelectedTaskId={this.removeSelectedTaskId}
                    />
                </Row>
                {this.state.selectedTasksIds.length
                    ? <Row>
                        <Col>
                            <button onClick={this.deleteSelectedTasks} className={styles.deleteTasksBtn}>Delete Selected Tasks</button>
                        </Col>
                    </Row>
                    : null
                }
            </>
        )
    }
}
export default ToDoList

const Tasks = ({ tasks, deleteTask, addSelectedTaskId, removeSelectedTaskId }) => {
    return (tasks.length
        ? <TasksGrid
            tasks={tasks}
            deleteTask={deleteTask}
            addSelectedTaskId={addSelectedTaskId}
            removeSelectedTaskId={removeSelectedTaskId}
        />
        : <Col>
            <div className={styles.notTasks}>
                <img alt='taskNote' src={taskNote}></img>
                <h3>Create your first task</h3>
                <p>You do not have any tasks yet</p>
                <button><FaPlus size='1rem' /></button>
            </div>
        </Col>
    )
}

const TasksGrid = ({ tasks, deleteTask, addSelectedTaskId, removeSelectedTaskId }) => {

    const selectedTask = (event, taskId) => {
        if (event.target.checked) {
            addSelectedTaskId(taskId)
        } else {
            removeSelectedTaskId(taskId)
        }
    }

    return (
        tasks.map(el => {
            return <Col key={el._id} md={6} lg={4} xl={3} >
                <div className={styles.task} >
                    <input
                        type='checkbox'
                        onChange={(e) => { selectedTask(e, el._id) }}
                    />
                    <h4>{el.title}</h4>
                    <p>{el.description}</p>
                    <div onClick={() => { deleteTask(el._id) }}>&#10062;</div>
                </div>
            </Col>
        })
    )
}