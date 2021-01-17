import React, { Component, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid';

import { Row, Col } from 'react-bootstrap'
import styles from './toDoListFoundation.module.scss'

import taskNote from '../../../images/taskNote.svg'
import { FaPlus } from 'react-icons/fa'

import TasksGrid from '../TasksGrid/tasksGrid.jsx'
import TasksList from '../TasksList/tasksList.jsx'

import { ListOrGridSwitchContext } from '../../../context.js'

class ToDoList extends Component {

    state = {
        title: '',
        description: '',
        tasks: [
            {
                _id: uuidv4(),
                title: 'Vardan',
                description: 'sdf fsadf sagljhljhsdf sdf sadfa'
            },
            {
                _id: uuidv4(),
                title: 'Vardan',
                description: 'sdf fsadf sagljhljhsdf sdf sadfa'
            },
            {
                _id: uuidv4(),
                title: 'Vardan',
                description: 'sdf fsadf sagljhljhsdf sdf sadfa'
            }
        ],
        selectedTasksIds: new Set()
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

    togleSelectTask = (selectedTaskId) => {
        const selectedTasksIds = new Set(this.state.selectedTasksIds)

        if (selectedTasksIds.has(selectedTaskId)) {
            selectedTasksIds.delete(selectedTaskId)
        } else {
            selectedTasksIds.add(selectedTaskId)
        }
        this.setState({ selectedTasksIds })
    }
    deleteSelectedTasks = () => {
        this.setState({
            tasks: this.state.tasks.filter(task => !this.state.selectedTasksIds.has(task._id)),
            selectedTasksIds: new Set()
        })
    }

    render() {
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
                            <button disabled={!!this.state.selectedTasksIds.size}>Add Task</button>
                        </form>
                    </Col>
                </Row>
                <Row>
                    <Tasks
                        tasks={this.state.tasks}
                        selectedTasksIds={this.state.selectedTasksIds}
                        deleteTask={this.deleteTask}
                        togleSelectTask={this.togleSelectTask}
                    />
                </Row>
                {this.state.selectedTasksIds.size
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

const Tasks = ({ tasks, selectedTasksIds, deleteTask, togleSelectTask }) => {
    const switchName = useContext(ListOrGridSwitchContext)
    return (
        <>
            {tasks.length
                ? switchName === 'list'
                    ? <TasksList
                        tasks={tasks}
                        deleteTask={deleteTask}
                    />
                    : <TasksGrid
                        tasks={tasks}
                        selectedTasksIds={selectedTasksIds}
                        deleteTask={deleteTask}
                        togleSelectTask={togleSelectTask}
                    />
                : <Col>
                    <div className={styles.notTasks}>
                        <img alt='taskNote' src={taskNote}></img>
                        <h3>Create your first task</h3>
                        <p>You do not have any tasks yet</p>
                        <button><FaPlus size='1rem' /></button>
                    </div>
                </Col>
            }
        </>
    )
}
