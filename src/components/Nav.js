import React,{useEffect} from 'react'
import {
  Link,
  useLocation

} from "react-router-dom";

function Nav() {
  let location = useLocation();
  useEffect(()=>{
    console.log(location);

  },[location]);
 
  const handleLogout=()=>{
    localStorage.removeItem('token');
    window.location.href="/login";
  }

  return (
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <Link class="navbar-brand " to="/">iNoteBook</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <Link class={`nav-link ${location.pathname==="/"?"active":" "}`} aria-current="page" to="/">Home</Link>
        </li>
        <li class="nav-item">
          <Link class={`nav-link ${location.pathname==="/about"?"active":" "}`} to="/about">About</Link>
        </li>
    
      </ul>
    {!localStorage.getItem('token')? <form class="d-flex" role="search">
      <Link class="btn btn-primary mx-2" to="/login" role="button">Login</Link>
      <Link class="btn btn-primary" to="/signup" role="button">Sign up</Link>
      </form>:<button onClick={handleLogout} className='btn btn-primary'>Logout</button>}
    </div>
  </div>
</nav>
      
    </div>
  )
}

export default Nav
