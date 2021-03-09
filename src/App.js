import React, { useEffect } from 'react'
import './App.css'

import { useSelector } from 'react-redux'

import { Router } from 'react-router-dom'

import LeftSidbar from './components/LeftSidbar/leftSidbar.jsx'
import Home from './components/Home/home.jsx'

import Loader from './components/Features/Loading/loader.jsx'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {history} from './redux/history.js'

const messageStyles = {
  position: "bottom-left",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}

function App() {

  const loading = useSelector(state => state.toDoReducer.loading)
  const singleTaskLoading = useSelector(state => state.singleTaskReducer.singleTaskLoading)
  const successMessage = useSelector(state => state.toDoReducer.successMessage)
  const errorMessage = useSelector(state => state.toDoReducer.errorMessage)

  const singleTaskSuccessMessage = useSelector(state => state.singleTaskReducer.successMessage)
  const singleTaskErrorMessage = useSelector(state => state.singleTaskReducer.errorMessage)

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, messageStyles)
    }
    if (errorMessage) {
      toast.error(errorMessage, messageStyles)
    }
  }, [successMessage, errorMessage])

  useEffect(() => {
    if (singleTaskSuccessMessage) {
      toast.success(singleTaskSuccessMessage, messageStyles)
    }
    if (singleTaskErrorMessage) {
      toast.error(singleTaskErrorMessage, messageStyles)
    }
  }, [singleTaskSuccessMessage,singleTaskErrorMessage])

  return (
    <div className="App">
      <Router history={history}>
        <LeftSidbar />
        <Home />
        {(loading || singleTaskLoading) && <Loader />}
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App
