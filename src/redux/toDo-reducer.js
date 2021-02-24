import myFetch from '../Api/myFetch.js'

const GET_TASKS = 'to-do-list/toDoReducer/GET_TASKS'
const CREATE_TASK = 'to-do-list/toDoReducer/CREATE_TASK'
const DELETE_TASK = 'to-do-list/toDoReducer/DELETE_TASK'
const DELETE_SELECTED_TASK = 'to-do-list/toDoReducer/DELETE_SELECTED_TASK'
const EDIT_TASK_ACTION = 'to-do-list/toDoReducer/EDIT_TASK_ACTION'

const initalState = {
    tasks: [],
}

const toDoReducer = (state = initalState, action) => {
    switch (action.type) {
        case GET_TASKS: {
            return {
                ...state,
                tasks: action.tasks
            }
        }
        case CREATE_TASK: {
            return {
                ...state,
                tasks: [...state.tasks, action.newTask]
            }
        }
        case DELETE_TASK: {
            return {
                ...state,
                tasks: state.tasks.filter(task => task._id !== action.taskId)
            }
        }
        case DELETE_SELECTED_TASK: {
            return {
                ...state,
                tasks: state.tasks.filter(task => !action.selectedTasksIds.has(task._id))
            }
        }
        case EDIT_TASK_ACTION: {

            const tasks = [...state.tasks]
            const id = state.tasks.findIndex(el => el._id === action.editedTask._id)
            tasks[id] = action.editedTask

            return {
                ...state,
                tasks: tasks
            }
        }
        default: return state
    }
}

const getTaskAction = (res) => {
    return {
        type: GET_TASKS, tasks: res
    }
}
const createTaskAction = (res) => {
    return {
        type: CREATE_TASK, newTask: res
    }
}
const deleteTaskAction = (taskId) => {
    return {
        type: DELETE_TASK, taskId: taskId
    }
}
const deleteSelectedTasksAction = (selectedTasksIds) => {
    return {
        type: DELETE_SELECTED_TASK, selectedTasksIds: selectedTasksIds
    }
}
const editTaskAction = (res) => {
    return {
        type: EDIT_TASK_ACTION, editedTask: res
    }
}

export const getTasks = () => {
    return dispatch => {
        myFetch('http://localhost:3001/task')
            .then(res => {
                dispatch(getTaskAction(res))
            })
    }
}
export const createTask = (newTask) => {
    return dispatch => {
        myFetch('http://localhost:3001/task', 'POST', newTask)
            .then(res => {
                dispatch(createTaskAction(res))
            })
    }
}
export const deleteTask = (taskId) => {
    return dispatch => {
        myFetch(`http://localhost:3001/task/${taskId}`, 'DELETE')
            .then(res => {
                dispatch(deleteTaskAction(taskId))
            })
    }
}
export const deleteSelectedTasks = (selectedTasksIds) => {
    return dispatch => {
        myFetch(`http://localhost:3001/task`, 'PATCH', { tasks: [...selectedTasksIds] })
            .then(res => {
                dispatch(deleteSelectedTasksAction(selectedTasksIds))
            })
    }
}
export const editTask = (editedTask) => {
    return dispatch => {
        myFetch(`http://localhost:3001/task/${editedTask._id}`, 'PUT', editedTask)
            .then(res => {
                dispatch(editTaskAction(res))
            })
    }
}


export default toDoReducer