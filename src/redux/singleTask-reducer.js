import myFetch from '../Api/myFetch.js'

import { history } from './history.js'

const apiHost = process.env.REACT_APP_API_HOST

const GET_TASK = 'to-do-list/singleTaskReducer/GET_TASK'
const EDIT_TASK = 'to-do-list/singleTaskReducer/EDIT_TASK'
const DELETE_TASK = 'to-do-list/singleTaskReducer/DELETE_TASK'
const CHANGE_STATUS = 'to-do-list/singleTaskReducer/CHANGE_STATUS'
const PENDING = 'to-do-list/singleTaskReducer/PENDING'
const ERROR = 'to-do-list/singleTaskReducer/ERROR'

const initalState = {
    task: null,
    singleTaskLoading: false,
    successMessage: null,
    errorMessage: null
}

const singleTaskReducer = (state = initalState, action) => {
    switch (action.type) {
        case PENDING: {
            return {
                ...state,
                singleTaskLoading: true,
                successMessage: null,
                errorMessage: null
            }
        }
        case ERROR: {
            return {
                ...state,
                singleTaskLoading: false,
                errorMessage: action.error
            }
        }
        case GET_TASK: {
            return {
                ...state,
                task: action.task,
                singleTaskLoading: false
            }
        }
        case EDIT_TASK: {
            return {
                ...state,
                task: action.editedTask,
                singleTaskLoading: false,
                successMessage: 'Task was successfully edited'
            }
        }
        case DELETE_TASK: {
            return {
                ...state,
                singleTaskLoading: false,
                successMessage: 'Task was successfully deleted'
            }
        }
        case CHANGE_STATUS: {
            return {
                ...state,
                singleTaskLoading: false,
                successMessage: 'Status was successfully changed',
                task: action.changedTask
            }
        }
        default: {
            return state
        }
    }
}

const errorAction = (error) => {
    return {
        type: ERROR, error: error
    }
}
const getTaskAction = (res) => {
    return {
        type: GET_TASK, task: res
    }
}
const editTaskAction = (res) => {
    return {
        type: EDIT_TASK, editedTask: res
    }
}
const changeStatusAction = (res) => {
    return {
        type: CHANGE_STATUS, changedTask: res
    }
}

export const getTask = (taskId) => {
    return dispatch => {
        dispatch({ type: PENDING })
        myFetch(`${apiHost}/task/${taskId}`)
            .then(res => {
                if(!res) return
                dispatch(getTaskAction(res))
            })
            .catch(error => {
                dispatch(errorAction(error.message))
            })
    }
}
export const editTask = (editedTask) => {
    return dispatch => {
        dispatch({ type: PENDING })
        myFetch(`${apiHost}/task/${editedTask._id}`, 'PUT', editedTask)
            .then(res => {
                if(!res) return
                dispatch(editTaskAction(res))
            })
            .catch(error => {
                dispatch(errorAction(error.message))
            })
    }
}
export const deleteSingleTask = (taskId) => {
    return dispatch => {
        dispatch({ type: PENDING })
        myFetch(`${apiHost}/task/${taskId}`, 'DELETE')
            .then(res => {
                if(!res) return
                dispatch({ type: DELETE_TASK })
                history.push('/')
            })
            .catch(error => {
                dispatch(errorAction(error.message))
            })
    }
}

export const changeTaskStatus = (taskId, status) => {
    const putStatusProperty = status === 'active' ? 'done' : 'active'

    return dispatch => {
        dispatch({ type: PENDING })
        myFetch(`${apiHost}/task/${taskId}`, 'PUT', { status: putStatusProperty })
            .then(res => {
                if(!res) return
                dispatch(changeStatusAction(res))
            })
            .catch(error => {
                dispatch(errorAction(error.message))
            })
    }
}

export default singleTaskReducer

