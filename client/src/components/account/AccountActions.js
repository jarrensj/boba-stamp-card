import React from 'react';
import { Link } from 'react-router-dom';

const AccountActions = () => {
  return (
    <div class='dash-buttons'>
      <Link to='/change-email' className="btn btn-primary my-1">
        Change Email
      </Link>
      <Link to='/change-password' className="btn btn-primary my-1">
        Change Password
      </Link>
    </div>
  );
};

export default AccountActions;