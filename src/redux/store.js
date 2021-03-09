import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk';

import toDoReducer from './toDo-reducer.js'
import singleTaskReducer from './singleTask-reducer.js'
import contactReducer from './contact-reducer.js'

const redusers = combineReducers({
    toDoReducer,
    singleTaskReducer,
    contactReducer
})

const store = createStore(redusers, applyMiddleware(thunk))

export default store