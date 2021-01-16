import React, { Component, useContext } from 'react'

import { Row, Col } from 'react-bootstrap'
import styles from './toDoListFoundation.module.scss'

import taskNote from '../../../images/taskNote.svg'
import { FaPlus } from 'react-icons/fa'

import AddTaskFormModal from '../AddTaskForm/addTaskFormModal.jsx'
import TasksGrid from '../TasksGrid/tasksGrid.jsx'
import TasksList from '../TasksList/tasksList.jsx'

import { ListOrGridSwitchContext, AddTaskModalContext } from '../../../context.js'

class ToDoList extends Component {

    state = {
        tasks: [],
        selectedTasksIds: new Set()
    }

    createTask = (newTask) => {
        this.setState({
            tasks: [...this.state.tasks, newTask]
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
                <AddTaskFormModal createTask={this.createTask} />
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
    const { setIsShowAddTaskFormModal } = useContext(AddTaskModalContext)

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
                        <button onClick={() => { setIsShowAddTaskFormModal(true) }} >
                            <FaPlus size='1rem' />
                        </button>
                    </div>
                </Col>
            }
        </>
    )
}
