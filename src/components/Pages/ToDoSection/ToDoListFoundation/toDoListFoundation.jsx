import React, { PureComponent } from 'react'

import { Row, Col } from 'react-bootstrap'
import styles from './toDoListFoundation.module.scss'

import { connect } from 'react-redux'
import { getTasks, createTask, deleteTask, deleteSelectedTasks, editTask ,setIsShowAddTaskFormModalAction,setIsShowEditTaskFormModalAction} from '../../../../redux/toDo-reducer.js'

import FormModal from '../FormModal/formModal.jsx'

import Tasks from '../Tasks/tasks.jsx'
import IsDeleteSelectedTasksConfirm from '../../../Features/Confirm/confirm.jsx'

import { SelectedTasksIdsLengthContext } from '../../../../context.js'

class ToDoList extends PureComponent {
    state = {
        selectedTasksIds: new Set(),
        isShowConfirm: false,
        taskForEdit: null
    }


    componentDidMount() {
        this.props.getTasks()
    }

    componentDidUpdate(_, prevState) {
        if (this.state.selectedTasksIds.size !== prevState.selectedTasksIds.size) {
            this.context.setSelectedTasksIdsLength(this.state.selectedTasksIds.size)
        }
    }

    createTask = (newTask) => {
        this.props.createTask(newTask)
    }

    deleteTask = (taskId) => {
        this.props.deleteTask(taskId)
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
        this.props.deleteSelectedTasks(this.state.selectedTasksIds)
        this.setState({
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
        this.props.setIsShowEditTaskFormModal(true)
    }

    editTask = (editedTask) => {
        this.props.editTask(editedTask)
    }


    render() {
        return (
            <>
                {this.props.isShowAddTaskFormModal && <FormModal
                    modalTitle='Add Task'
                    handleTask={this.createTask}
                    setIsShowModal={this.props.setIsShowAddTaskFormModal}
                />}
                {this.props.isShowEditTaskFormModal && <FormModal
                    modalTitle='Edit Task'
                    handleTask={this.editTask}
                    setIsShowModal={this.props.setIsShowEditTaskFormModal}
                    taskForEdit={this.state.taskForEdit}
                />}

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
                <Tasks
                    tasks={this.props.tasks}
                    selectedTasksIds={this.state.selectedTasksIds}
                    deleteTask={this.deleteTask}
                    togleSelectTask={this.togleSelectTask}
                    getTaskForEdit={this.getTaskForEdit}
                />


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

const mapStateToProps = (state) => {

    return {
        tasks: state.toDoReducer.tasks,
        isShowAddTaskFormModal: state.toDoReducer.isShowAddTaskFormModal,
        isShowEditTaskFormModal: state.toDoReducer.isShowEditTaskFormModal
    }
}
const mapDistpatchToProps = (dispatch) => {

    return {
        getTasks: () => {
            dispatch(getTasks())
        },
        createTask: (newTask) => {
            dispatch(createTask(newTask))
        },
        deleteTask: (taskId) => {
            dispatch(deleteTask(taskId))
        },
        deleteSelectedTasks: (selectedTasksIds) => {
            dispatch(deleteSelectedTasks(selectedTasksIds))
        },
        editTask: (editedTask) => {
            dispatch(editTask(editedTask))
        },
        setIsShowAddTaskFormModal:status=>{
            dispatch(setIsShowAddTaskFormModalAction(status))
        },
        setIsShowEditTaskFormModal:status=>{
            dispatch(setIsShowEditTaskFormModalAction(status))
        }
    }
}
export default connect(mapStateToProps, mapDistpatchToProps)(ToDoList)


ToDoList.contextType = SelectedTasksIdsLengthContext;