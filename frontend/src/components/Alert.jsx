import React, { useState } from 'react';

function Alert(props) {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false); // Hide the alert by setting `visible` to `false`
  };

  if (!visible || !props.alert) return null; // If not visible or no alert, render nothing

  return (
    <div style={{ height: '50px' }}>
      <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
        {props.alert.msg}
        <button
          type="button"
          className="btn-close"
          onClick={handleClose} // Handle close action
          aria-label="Close"
        ></button>
      </div>
    </div>
  );
}

export default Alert;
