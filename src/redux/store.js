import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk';

import logger from 'redux-logger'

import toDoReducer from './toDo-reducer.js'
import singleTaskReducer from './singleTask-reducer.js'
import contactReducer from './contact-reducer.js'

const redusers = combineReducers({
    toDoReducer,
    singleTaskReducer,
    contactReducer
})

const applyMiddlewareParams = [thunk]
if (process.env.NODE_ENV === 'development') {
    applyMiddlewareParams.push(logger)
}

const store = createStore(redusers, applyMiddleware(...applyMiddlewareParams))

export default store