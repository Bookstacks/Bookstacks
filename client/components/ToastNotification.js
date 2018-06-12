import React from 'react';
import { Alert } from 'reactstrap';

const ToastNotification = (props) => {
  return (
    <div>
      <Alert color="success">
        Added item to cart!
      </Alert>
    </div>
  );
};

export default ToastNotification;

