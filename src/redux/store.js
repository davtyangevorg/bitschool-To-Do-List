import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk';

import toDoReducer from './toDo-reducer.js'
import singleTaskReducer from './singleTask-reducer.js'

const redusers = combineReducers({
    toDoReducer,
    singleTaskReducer
})

const store = createStore(redusers, applyMiddleware(thunk))

export default store