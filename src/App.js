import React from 'react'
import './App.css'

import { BrowserRouter } from 'react-router-dom'

import LeftSidbar from './components/LeftSidbar/leftSidbar.jsx'
import Home from './components/Home/home.jsx'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <LeftSidbar />
        <Home />
      </BrowserRouter>
    </div>
  );
}

export default App
