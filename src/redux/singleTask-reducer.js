import myFetch from '../Api/myFetch.js'

import {history} from './history.js'

const GET_TASK = 'to-do-list/singleTaskReducer/GET_TASK'
const EDIT_TASK = 'to-do-list/singleTaskReducer/EDIT_TASK'
const DELETE_TASK='to-do-list/singleTaskReducer/DELETE_TASK'
const PENDING = 'to-do-list/singleTaskReducer/PENDING'
const ERROR = 'to-do-list/singleTaskReducer/ERROR'

const initalState = {
    task: null,
    singleTaskLoading: false,
    successMessage:null,
    errorMessage: null
}

const singleTaskReducer = (state = initalState, action) => {
    switch (action.type) {
        case PENDING: {
            return {
                ...state,
                singleTaskLoading: true,
                successMessage:null,
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
                singleTaskLoading:false
            }
        }
        case EDIT_TASK: {
            return {
                ...state,
                task: action.editedTask,
                singleTaskLoading:false,
                successMessage: 'Task was successfully edited'
            }
        }
        case DELETE_TASK: {
            return {
                ...state,
                singleTaskLoading:false,
                successMessage: 'Task was successfully deleted'
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

export const getTask = (taskId) => {
    return dispatch => {
        dispatch({type: PENDING})
        myFetch(`http://localhost:3001/task/${taskId}`)
            .then(res => {
                dispatch(getTaskAction(res))
            })
            .catch(error => {
                console.log(error)
                dispatch(errorAction(error.message))
            })
    }
}
export const editTask = (editedTask) => {
    return dispatch => {
        dispatch({type: PENDING})
        myFetch(`http://localhost:3001/task/${editedTask._id}`, 'PUT', editedTask)
            .then(res => {
                dispatch(editTaskAction(res))
            })
            .catch(error => {
                console.log(error)
                dispatch(errorAction(error.message))
            })
    }
}
export const deleteSingleTask = (taskId) => {
    return dispatch => {
        dispatch({type: PENDING})
        myFetch(`http://localhost:3001/task/${taskId}`, 'DELETE')
            .then(res => {
                dispatch({type:DELETE_TASK})
                history.push('/')
            })
            .catch(error => {
                console.log(error)
                dispatch(errorAction(error.message))
            })
    }
}

export default singleTaskReducer

