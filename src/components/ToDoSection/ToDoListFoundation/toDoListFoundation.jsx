import React, { Component } from 'react'

import { Row, Col } from 'react-bootstrap'
import styles from './toDoListFoundation.module.scss'

import AddTaskFormModal from '../AddTaskForm/addTaskFormModal.jsx'
import EditTaskFormModal from '../EditeTaskForm/editeTaskFormModal.jsx'

import Tasks from '../Tasks/tasks.jsx'
import IsDeleteSelectedTasksConfirm from '../../Features/Confirm/confirm.jsx'

import { SelectedTasksIdsLengthContext } from '../../../context.js'

class ToDoList extends Component {

    state = {
        tasks: [],
        selectedTasksIds: new Set(),
        isShowConfirm: false,
        isShowEditeTaskForm: false,
        taskForEdit: null
    }

    componentDidUpdate(_, prevState) {
        if (this.state.selectedTasksIds.size !== prevState.selectedTasksIds.size) {
            this.context.setSelectedTasksIdsLength(this.state.selectedTasksIds.size)
        }
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

    togleConfirm = () => {
        this.setState({
            isShowConfirm: !this.state.isShowConfirm
        })
    }

    getTaskForEdit = (task) => {
        this.setState({
            taskForEdit: task
        })
        this.togleIsShowEditTaskForm()
    }
    togleIsShowEditTaskForm = () => {
        this.setState({
            isShowEditeTaskForm: !this.state.isShowEditeTaskForm
        })
    }
    editTask = (editedTask) => {
        const tasks = [...this.state.tasks]
        
        const id = this.state.tasks.findIndex(el => el._id === editedTask._id)
        tasks[id] = editedTask

        this.setState({tasks})
        this.togleIsShowEditTaskForm()
    }


    render() {
        return (
            <>
                <AddTaskFormModal createTask={this.createTask} />
                {this.state.isShowEditeTaskForm && <EditTaskFormModal
                    taskForEdit={this.state.taskForEdit}
                    togleIsShowEditTaskForm={this.togleIsShowEditTaskForm}
                    editTask={this.editTask}
                />}

                <Row>
                    <Tasks
                        tasks={this.state.tasks}
                        selectedTasksIds={this.state.selectedTasksIds}
                        deleteTask={this.deleteTask}
                        togleSelectTask={this.togleSelectTask}
                        getTaskForEdit={this.getTaskForEdit}
                    />
                </Row>
                {
                    this.state.selectedTasksIds.size
                        ? <Row>
                            <Col>
                                <button
                                    onClick={this.togleConfirm}
                                    className={styles.deleteTasksBtn}
                                >
                                    Delete Selected Tasks
                            </button>
                            </Col>
                        </Row>
                        : null
                }
                <IsDeleteSelectedTasksConfirm
                    closeConfirm={this.togleConfirm}
                    deleteConfirm={this.deleteSelectedTasks}
                    title='Delete'
                    text={`Are you sure you want to delete this ${this.state.selectedTasksIds.size > 1 ? 'tasks' : 'task'}?`}
                    isShowConfirm={this.state.isShowConfirm}
                />
            </>
        )
    }
}
export default ToDoList


ToDoList.contextType = SelectedTasksIdsLengthContext;