import React, { useEffect } from 'react'
import './App.css'

import { useSelector } from 'react-redux'

import { BrowserRouter } from 'react-router-dom'

import LeftSidbar from './components/LeftSidbar/leftSidbar.jsx'
import Home from './components/Home/home.jsx'

import Loader from './components/Features/Loading/loader.jsx'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const loading = useSelector(state => state.toDoReducer.loading)
  const singleTaskLoading = useSelector(state => state.singleTaskReducer.singleTaskLoading)
  const successMessage = useSelector(state => state.toDoReducer.successMessage)
  const errorMessage = useSelector(state => state.toDoReducer.errorMessage)

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    if (errorMessage) {
      toast.error(errorMessage, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [successMessage, errorMessage])

  return (
    <div className="App">
      <BrowserRouter>
        <LeftSidbar />
        <Home />
        {(loading ||singleTaskLoading) && <Loader />}
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App
