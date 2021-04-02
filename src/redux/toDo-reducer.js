import myFetch, { myFetchWithoutToken } from '../Api/myFetch.js'

import { history } from './history.js'

import { checkLoginStatus } from '../utils.js'

const apiHost = process.env.REACT_APP_API_HOST

const GET_TASKS = 'to-do-list/toDoReducer/GET_TASKS'
const CREATE_TASK = 'to-do-list/toDoReducer/CREATE_TASK'
const DELETE_TASK = 'to-do-list/toDoReducer/DELETE_TASK'
const DELETE_SELECTED_TASK = 'to-do-list/toDoReducer/DELETE_SELECTED_TASK'
const EDIT_TASK_ACTION = 'to-do-list/toDoReducer/EDIT_TASK_ACTION'
const SET_IS_SHOW_ADD_TASK_FORM_MODAL = 'to-do-list/toDoReducer/SET_IS_SHOW_ADD_TASK_FORM_MODAL'
const SET_IS_SHOW_EDIT_TASK_FORM_MODAL = 'to-do-list/toDoReducer/SET_IS_SHOW_EDIT_TASK_FORM_MODAL'
const CHANGE_STATUS = 'to-do-list/toDoReducer/CHANGE_STATUS'
const SIGN_UP = 'to-do-list/toDoReducer/SIGN_UP'
const SIGN_IN = 'to-do-list/toDoReducer/SIGN_IN'
export const LOGOUT = 'to-do-list/toDoReducer/LOGOUT'
const PENDING = 'to-do-list/toDoReducer/PENDING'
const ERROR = 'to-do-list/toDoReducer/ERROR'
const CONTACT_MESSAGE = 'to-do-list/toDoReducer/CONTACT_MESSAGE'

const initalState = {
    tasks: [],
    isShowAddTaskFormModal: false,
    isShowEditTaskFormModal: false,
    loading: false,
    successMessage: null,
    errorMessage: null,
    isAuth: checkLoginStatus()
}

const toDoReducer = (state = initalState, action) => {
    switch (action.type) {
        case PENDING: {
            return {
                ...state,
                loading: true,
                successMessage: null,
                errorMessage: null
            }
        }
        case ERROR: {
            return {
                ...state,
                loading: false,
                errorMessage: action.error
            }
        }
        case SET_IS_SHOW_ADD_TASK_FORM_MODAL: {
            return {
                ...state,
                isShowAddTaskFormModal: action.status
            }
        }
        case SET_IS_SHOW_EDIT_TASK_FORM_MODAL: {
            return {
                ...state,
                isShowEditTaskFormModal: action.status
            }
        }
        case GET_TASKS: {
            return {
                ...state,
                loading: false,
                tasks: action.tasks
            }
        }
        case CREATE_TASK: {
            return {
                ...state,
                tasks: [...state.tasks, action.newTask],
                isShowAddTaskFormModal: false,
                loading: false,
                successMessage: 'Task was successfully created'
            }
        }
        case DELETE_TASK: {
            return {
                ...state,
                tasks: state.tasks.filter(task => task._id !== action.taskId),
                loading: false,
                successMessage: 'Task was successfully deleted'
            }
        }
        case DELETE_SELECTED_TASK: {
            return {
                ...state,
                tasks: state.tasks.filter(task => !action.selectedTasksIds.has(task._id)),
                loading: false,
                successMessage: 'Tasks was successfully deleted'
            }
        }
        case EDIT_TASK_ACTION: {

            const tasks = [...state.tasks]
            const id = state.tasks.findIndex(el => el._id === action.editedTask._id)
            tasks[id] = action.editedTask

            return {
                ...state,
                tasks: tasks,
                isShowEditTaskFormModal: false,
                loading: false,
                successMessage: 'Task was successfully edited'
            }
        }
        case CHANGE_STATUS: {
            return {
                ...state,
                loading: false,
                successMessage: 'Status was successfully changed',
                tasks: state.tasks.map(task => task._id === action.changedTask._id ? action.changedTask : task)
            }
        }
        case SIGN_UP: {
            return {
                ...state,
                loading: false,
                successMessage: 'You are successfully registred'
            }
        }
        case SIGN_IN: {
            return {
                ...state,
                isAuth: true,
                loading: false,
                successMessage: 'You are successfully logined'
            }
        }
        case LOGOUT: {
            return {
                ...state,
                isAuth: false,
                loading: false
            }
        }
        case CONTACT_MESSAGE: {
            return {
                ...state,
                loading: false,
                successMessage: 'Your message successfully sended'
            }
        }
        default: return state
    }
}


const errorAction = (error) => {
    return {
        type: ERROR, error: error
    }
}
export const setIsShowAddTaskFormModalAction = (status) => {
    return {
        type: SET_IS_SHOW_ADD_TASK_FORM_MODAL, status: status
    }
}
export const setIsShowEditTaskFormModalAction = (status) => {
    return {
        type: SET_IS_SHOW_EDIT_TASK_FORM_MODAL, status: status
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
const changeStatus = (res) => {
    return {
        type: CHANGE_STATUS, changedTask: res
    }
}

export const getTasks = (queryParams = {}) => {

    function getQueryString(obj) {
        return Object.entries(obj)
            .map(([key, value]) => `${key}=${value}`)
            .join('&')
    }
    const query = getQueryString(queryParams)

    return dispatch => {
        dispatch({ type: PENDING })
        myFetch(`${apiHost}/task?${query}`)
            .then(res => {
                if (!res) return
                dispatch(getTaskAction(res))
            })
            .catch(error => {
                dispatch(errorAction(error.message))
            })
    }
}
export const createTask = (newTask) => {
    return dispatch => {
        dispatch({ type: PENDING })
        myFetch(`${apiHost}/task`, 'POST', newTask)
            .then(res => {
                if (!res) return
                dispatch(createTaskAction(res))
            })
            .catch(error => {
                dispatch(errorAction(error.message))
            })
    }
}
export const deleteTask = (taskId) => {
    return dispatch => {
        dispatch({ type: PENDING })
        myFetch(`${apiHost}/task/${taskId}`, 'DELETE')
            .then(res => {
                if (!res) return
                dispatch(deleteTaskAction(taskId))
            })
            .catch(error => {
                dispatch(errorAction(error.message))
            })
    }
}
export const deleteSelectedTasks = (selectedTasksIds) => {
    return dispatch => {
        dispatch({ type: PENDING })
        myFetch(`${apiHost}/task`, 'PATCH', { tasks: [...selectedTasksIds] })
            .then(res => {
                if (!res) return
                dispatch(deleteSelectedTasksAction(selectedTasksIds))
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
                if (!res) return
                dispatch(editTaskAction(res))
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
                if (!res) return
                dispatch(changeStatus(res))
            })
            .catch(error => {
                dispatch(errorAction(error.message))
            })
    }
}

export const signUp = (data) => {
    return dispatch => {
        dispatch({ type: PENDING })
        myFetchWithoutToken(`${apiHost}/user`, 'POST', data)
            .then(res => {
                dispatch({ type: SIGN_UP })
                history.push('/sign-in')
            })
            .catch(error => {
                dispatch(errorAction(error.message))
            })
    }
}
export const signIn = (data) => {
    return dispatch => {
        dispatch({ type: PENDING })
        myFetchWithoutToken(`${apiHost}/user/sign-in`, 'POST', data)
            .then(res => {
                localStorage.setItem('token', JSON.stringify(res))
                dispatch({ type: SIGN_IN })
                history.push('/')
            })
            .catch(error => {
                dispatch(errorAction(error.message))
            })
    }
}

export const sendMessage = (data, nulledValues) => {
    return dispatch => {
        dispatch({ type: PENDING })
        myFetchWithoutToken(`${apiHost}/formf`, 'POST', data)
            .then(res => {
                dispatch({ type: CONTACT_MESSAGE })
                nulledValues()
            })
            .catch(error => {
                dispatch(errorAction(error.message))
            })
    }
}

export default toDoReducer