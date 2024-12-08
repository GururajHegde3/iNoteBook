import React from 'react'

const Alert = (props) => {
  return (
    <div><div class="alert alert-primary d-flex align-items-center" role="alert">
    
    <div>
      {props.message}
    </div>
  </div></div>
  )
}

export default Alert