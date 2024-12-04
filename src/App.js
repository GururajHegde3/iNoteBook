
import './App.css';
import React from "react";
import Nav from './components/Nav';
import NoteState from './context/notes/NoteState';
import About from './components/About';

import {
  BrowserRouter as Router,
  Route,
  Routes,

} from "react-router-dom";
import Home from './components/Home';

function App() {
  return (
    <>
    <NoteState>
    <Router>
    
        <Nav/>
        <div className='container'>
        <Routes>
          <Route  path="/" element={<Home />}/>
          <Route  path="/about" element={ <About />}/>
        </Routes>
        </div>
      </Router>
      </NoteState>
    </>
      
  );
}

export default App;
