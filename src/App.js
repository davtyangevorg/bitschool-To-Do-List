import React from 'react'
import './App.css';

import LeftSidbar from './components/LeftSidbar/leftSidbar.jsx'
import Home from './components/Home/home.jsx'


function App() {
  return (
    <div className="App">
      <LeftSidbar />
      <Home />
    </div>
  );
}

export default App;
