import React from 'react'
import './App.css'

import {useSelector} from 'react-redux'

import { BrowserRouter } from 'react-router-dom'

import LeftSidbar from './components/LeftSidbar/leftSidbar.jsx'
import Home from './components/Home/home.jsx'

import LoaderModal from './components/Features/Loading/loaderModal.jsx'

function App() {

  const loading = useSelector(state => state.toDoReducer.loading)
  
  return (
    <div className="App">
      <BrowserRouter>
        <LeftSidbar />
        <Home />
        {loading && <LoaderModal />}
      </BrowserRouter>
    </div>
  );
}

export default App
