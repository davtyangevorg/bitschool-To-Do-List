import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

//import App from './App'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import Counter from './experiments/Counter/counter.jsx'

const store = createStore(counterReduser)

function counterReduser(state = { count: 0 }, action) {
  if (action.type === 'INCREMENT') {
    return {
      ...state,
      count: state.count + 1
    }
  }
  if (action.type === 'DECREMENT') {
    return {
      ...state,
      count: state.count - 1
    }
  }
  return state
}



ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Counter />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

