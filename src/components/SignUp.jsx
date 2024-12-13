import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
   const [credentials, setCredentials] = useState({name:'', email: '', password: '',cpassword: '' });
    let navigate = useNavigate();
  
    const handleSubmit = async (e) => {
     const {name,email,password,cpassword}=credentials;
      e.preventDefault();
      try {
        const response = await fetch('http://localhost:5000/api/auth/createuser', {
         
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({name,email,password
          }),
        });
        const json = await response.json();
        console.log(json);
  
        if (json.success) {
          // Handle successful login
          localStorage.setItem('token',json.authtoken);
          navigate('/');
          props.showAlert("Account Created Successfully","success");
        } else {
         props.showAlert("Invalid Credentials","danger");
        }
      } catch (error) {
        console.error('Error during login:', error);
        props.showAlert('An error occurred. Please try again later.',"danger");
      }
    };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    
    <div className='container'>
         <h2 className="text-center mb-4">Sign Up to View Your Notes</h2>
      <form onSubmit={handleSubmit}>
      <div class="mb-3">
      <label htmlFor="name" class="form-label">Name</label>
      <input type="text" class="form-control" id="name" name='name' onChange={onChange} aria-describedby="emailHelp"/>
      </div>
    <div class="mb-3">
      <label htmlFor="email" class="form-label">Email address</label>
      <input type="email" class="form-control" id="email" name='email' onChange={onChange} aria-describedby="emailHelp"/>
      <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div class="mb-3">
      <label htmlFor="password" class="form-label">Password</label>
      <input type="password" class="form-control" name='password' onChange={onChange}  id="password" minLength={5} required/>
    </div>
    <div class="mb-3">
      <label htmlFor="cpassword" class="form-label">Confirm Password</label>
      <input type="password" class="form-control" name='cpassword' onChange={onChange} id="cpassword" minLength={5} required/>
    </div>

    <button type="submit" class="btn btn-primary">Submit</button>
  </form></div>
  )
}

export default SignUp