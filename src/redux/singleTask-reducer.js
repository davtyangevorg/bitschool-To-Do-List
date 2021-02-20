import myFetch from '../Api/myFetch.js'

const GET_TASK = 'to-do-list/singleTaskReducer/GET_TASK'
const EDIT_TASK = 'to-do-list/singleTaskReducer/EDIT_TASK'

const initalState = {
    task: null
}

const singleTaskReducer = (state = initalState, action) => {
    switch (action.type) {
        case GET_TASK: {
            return {
                ...state,
                task: action.task
            }
        }
        case EDIT_TASK: {
            return {
                ...state,
                task: action.editedTask
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
const editTaskAction = (res)=>{
    return{
        type:EDIT_TASK,editedTask:res
    }
}

export const getTask = (taskId) => {
    return dispatch => {
        myFetch(`http://localhost:3001/task/${taskId}`)
            .then(res => {
                dispatch(getTaskAction(res))
            })
    }
}
export const editTask = (editedTask) => {
    return dispatch => {
        myFetch(`http://localhost:3001/task/${editedTask._id}`,'PUT',editedTask)
            .then(res => {
                dispatch(editTaskAction(res))
            })
    }
}
export default singleTaskReducer