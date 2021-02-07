import React, { PureComponent } from 'react'

import { Row, Col } from 'react-bootstrap'
import styles from './toDoListFoundation.module.scss'

import FormModal from '../FormModal/formModal.jsx'

import Tasks from '../Tasks/tasks.jsx'
import IsDeleteSelectedTasksConfirm from '../../../Features/Confirm/confirm.jsx'

import { SelectedTasksIdsLengthContext, AddTaskModalContext } from '../../../../context.js'

class ToDoList extends PureComponent {

    state = {
        tasks: [],
        selectedTasksIds: new Set(),
        isShowConfirm: false,
        isShowEditeTaskForm: false,
        taskForEdit: null
    }

    componentDidMount() {
        fetch('http://localhost:3001/task', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(async response => {
                const res = await response.json()

                if (response.status >= 400 && response.status < 600) {
                    if (res.error) {
                        throw res.error
                    } else {
                        throw new Error('Error')
                    }
                }

                this.setState({
                    tasks: res
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    componentDidUpdate(_, prevState) {
        if (this.state.selectedTasksIds.size !== prevState.selectedTasksIds.size) {
            this.context.setSelectedTasksIdsLength(this.state.selectedTasksIds.size)
        }
    }

    createTask = (newTask) => {

        fetch('http://localhost:3001/task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask),
        })
            .then(async response => {
                const res = await response.json()

                if (response.status >= 400 && response.status < 600) {
                    if (res.error) {
                        throw res.error
                    } else {
                        throw new Error('Error')
                    }
                }

                this.setState({
                    tasks: [...this.state.tasks, res]
                })
            })
            .catch(error => {
                console.log(error)
            })

    }

    deleteTask = (taskId) => {

        fetch(`http://localhost:3001/task/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(async response => {
                const res = await response.json()

                if (response.status >= 400 && response.status < 600) {
                    if (res.error) {
                        throw res.error
                    } else {
                        throw new Error('Error')
                    }
                }
                this.setState({
                    tasks: this.state.tasks.filter(el => el._id !== taskId)
                })
            })
            .catch(error => {
                console.log(error)
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

        fetch(`http://localhost:3001/task`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tasks: [...this.state.selectedTasksIds]
            })
        })
            .then(async response => {
                const res = await response.json()

                if (response.status >= 400 && response.status < 600) {
                    if (res.error) {
                        throw res.error
                    } else {
                        throw new Error('Error')
                    }
                }

                this.setState({
                    tasks: this.state.tasks.filter(task => !this.state.selectedTasksIds.has(task._id)),
                    selectedTasksIds: new Set()
                })
            })
            .catch(error => {
                console.log(error)
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

        fetch(`http://localhost:3001/task/${editedTask._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedTask)
        })
            .then(async response => {
                const res = await response.json()

                if (response.status >= 400 && response.status < 600) {
                    if (res.error) {
                        throw res.error
                    } else {
                        throw new Error('Error')
                    }
                }

                const tasks = [...this.state.tasks]

                const id = this.state.tasks.findIndex(el => el._id === res._id)
                tasks[id] = res

                this.setState({ tasks })
                this.togleIsShowEditTaskForm()

            })
            .catch(error => {
                console.log(error)
            })

    }


    render() {

        return (
            <>
                <AddTaskModalContext.Consumer>
                    {({ isShowAddTaskFormModal, setIsShowAddTaskFormModal }) => (
                        isShowAddTaskFormModal && <FormModal
                            modalTitle='Add Task'
                            handleTask={this.createTask}
                            setIsShowModal={setIsShowAddTaskFormModal}
                        />
                    )}
                </AddTaskModalContext.Consumer>
                {this.state.isShowEditeTaskForm && <FormModal
                    modalTitle='Edit Task'
                    handleTask={this.editTask}
                    setIsShowModal={this.togleIsShowEditTaskForm}
                    taskForEdit={this.state.taskForEdit}
                />}


                <Tasks
                    tasks={this.state.tasks}
                    selectedTasksIds={this.state.selectedTasksIds}
                    deleteTask={this.deleteTask}
                    togleSelectTask={this.togleSelectTask}
                    getTaskForEdit={this.getTaskForEdit}
                />

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