
import './App.css';
import React,{useState} from "react";
import Nav from './components/Nav';
import NoteState from './context/notes/NoteState';
import About from './components/About';

import Alert from './components/Alert';


import {
  BrowserRouter as Router,
  Route,
  Routes,

} from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
  const[alert,setAlert]=useState(null);
  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setAlert(null)
      
    },4000);
  }
  return (
    <>
    <NoteState>
    <Router>
    
        <Nav/>
        <Alert alert={alert}/>
        <div className='container'>
        <Routes>
          <Route  path="/" element={<Home showAlert={showAlert} />}/>
          <Route  path="/about" element={ <About />}/>
          <Route  path="/login" element={ <Login showAlert={showAlert} />}/>
          <Route  path="/signup" element={ <SignUp showAlert={showAlert}/>}/>

        </Routes>
        </div>
      </Router>
      </NoteState>
    </>
      
  );
}

export default App;
