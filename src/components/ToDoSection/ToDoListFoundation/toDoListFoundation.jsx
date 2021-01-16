import React, { Component } from 'react'

import { Row, Col } from 'react-bootstrap'
import styles from './toDoListFoundation.module.scss'

import AddTaskFormModal from '../AddTaskForm/addTaskFormModal.jsx'
import Tasks from '../Tasks/tasks.jsx'

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


