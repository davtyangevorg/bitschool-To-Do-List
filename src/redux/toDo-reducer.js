import myFetch from '../Api/myFetch.js'

const GET_TASKS = 'to-do-list/toDoReducer/GET_TASKS'
const CREATE_TASK = 'to-do-list/toDoReducer/CREATE_TASK'
const DELETE_TASK = 'to-do-list/toDoReducer/DELETE_TASK'
const DELETE_SELECTED_TASK = 'to-do-list/toDoReducer/DELETE_SELECTED_TASK'
const EDIT_TASK_ACTION = 'to-do-list/toDoReducer/EDIT_TASK_ACTION'
const SET_IS_SHOW_ADD_TASK_FORM_MODAL='to-do-list/toDoReducer/SET_IS_SHOW_ADD_TASK_FORM_MODAL'
const SET_IS_SHOW_EDIT_TASK_FORM_MODAL='to-do-list/toDoReducer/SET_IS_SHOW_EDIT_TASK_FORM_MODAL'
const PENDING='to-do-list/toDoReducer/PENDING'

const initalState = {
    tasks: [],
    isShowAddTaskFormModal:false,
    isShowEditTaskFormModal:false,
    loading:false
    // isSuccessCreateTask:false,
    // isSuccessDeleteTask:false,
    // isSuccessDeleteSelectedTasks:false,
    // isSuccessEditeTask:false
}

const toDoReducer = (state = initalState, action) => {
    switch (action.type) {
        case PENDING:{
            return{
                ...state,
                loading:true
            }
        }
        case SET_IS_SHOW_ADD_TASK_FORM_MODAL:{
            return{
                ...state,
                isShowAddTaskFormModal:action.status
            }
        }
        case SET_IS_SHOW_EDIT_TASK_FORM_MODAL:{
            return{
                ...state,
                isShowEditTaskFormModal:action.status
            }
        }
        case GET_TASKS: {
            return {
                ...state,
                tasks: action.tasks
            }
        }
        case CREATE_TASK: {
            return {
                ...state,
                tasks: [...state.tasks, action.newTask],
                isShowAddTaskFormModal:false,
                loading:false
                // isSuccessCreateTask:true
            }
        }
        case DELETE_TASK: {
            return {
                ...state,
                tasks: state.tasks.filter(task => task._id !== action.taskId),
                loading:false
                // isSuccessDeleteTask:true
            }
        }
        case DELETE_SELECTED_TASK: {
            return {
                ...state,
                tasks: state.tasks.filter(task => !action.selectedTasksIds.has(task._id)),
                loading:false
                // isSuccessDeleteSelectedTasks:true
            }
        }
        case EDIT_TASK_ACTION: {

            const tasks = [...state.tasks]
            const id = state.tasks.findIndex(el => el._id === action.editedTask._id)
            tasks[id] = action.editedTask

            return {
                ...state,
                tasks: tasks,
                isShowEditTaskFormModal:false,
                loading:false
                // isSuccessEditeTask:true
            }
        }
        default: return state
    }
}

const pendingAction=()=>{
    return{
        type:PENDING
    }
}

export const setIsShowAddTaskFormModalAction=(status)=>{
    return{
        type:SET_IS_SHOW_ADD_TASK_FORM_MODAL,status:status
    }
}
export const setIsShowEditTaskFormModalAction=(status)=>{
    return{
        type:SET_IS_SHOW_EDIT_TASK_FORM_MODAL,status:status
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
        dispatch(pendingAction())
        myFetch('http://localhost:3001/task', 'POST', newTask)
            .then(res => {
                dispatch(createTaskAction(res))
            })
    }
}
export const deleteTask = (taskId) => {
    return dispatch => {
        dispatch(pendingAction())
        myFetch(`http://localhost:3001/task/${taskId}`, 'DELETE')
            .then(res => {
                dispatch(deleteTaskAction(taskId))
            })
    }
}
export const deleteSelectedTasks = (selectedTasksIds) => {
    return dispatch => {
        dispatch(pendingAction())
        myFetch(`http://localhost:3001/task`, 'PATCH', { tasks: [...selectedTasksIds] })
            .then(res => {
                dispatch(deleteSelectedTasksAction(selectedTasksIds))
            })
    }
}
export const editTask = (editedTask) => {
    return dispatch => {
        dispatch(pendingAction())
        myFetch(`http://localhost:3001/task/${editedTask._id}`, 'PUT', editedTask)
            .then(res => {
                dispatch(editTaskAction(res))
            })
    }
}


export default toDoReducer