import myFetch from '../Api/myFetch.js'
import { createBrowserHistory } from 'history'

const apiHost=process.env.REACT_APP_API_HOST

const history=createBrowserHistory()

const GET_TASK = 'to-do-list/singleTaskReducer/GET_TASK'
const EDIT_TASK = 'to-do-list/singleTaskReducer/EDIT_TASK'
const DELETE_TASK='to-do-list/singleTaskReducer/DELETE_TASK'
const PENDING = 'to-do-list/singleTaskReducer/PENDING'

const initalState = {
    task: null,
    singleTaskLoading: false
}

const singleTaskReducer = (state = initalState, action) => {
    switch (action.type) {
        case PENDING: {
            return {
                ...state,
                singleTaskLoading: true
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
                singleTaskLoading:false
            }
        }
        case DELETE_TASK: {
            return {
                ...state,
                singleTaskLoading:false
            }
        }
        default: {
            return state
        }
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
        myFetch(`${apiHost}/task/${taskId}`)
            .then(res => {
                dispatch(getTaskAction(res))
            })
            .catch(error => {
                console.log(error)
            })
    }
}
export const editTask = (editedTask) => {
    return dispatch => {
        dispatch({type: PENDING})
        myFetch(`${apiHost}/task/${editedTask._id}`, 'PUT', editedTask)
            .then(res => {
                dispatch(editTaskAction(res))
            })
            .catch(error => {
                console.log(error)
            })
    }
}
export const deleteSingleTask = (taskId) => {
    return dispatch => {
        dispatch({type: PENDING})
        myFetch(`${apiHost}/task/${taskId}`, 'DELETE')
            .then(res => {
                dispatch({type:DELETE_TASK})
                history.push('/')
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export default singleTaskReducer

