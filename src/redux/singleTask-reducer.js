import myFetch from '../Api/myFetch.js'

const GET_TASK = 'to-do-list/singleTaskReducer/GET_TASK'
const EDIT_TASK = 'to-do-list/singleTaskReducer/EDIT_TASK'
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
        myFetch(`http://localhost:3001/task/${taskId}`)
            .then(res => {
                dispatch(getTaskAction(res))
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
    }
}
export default singleTaskReducer