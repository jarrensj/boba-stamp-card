import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div class='dash-buttons'>
      <Link to='/admin/add-points' className="btn btn-primary my-1">
        Add Points
      </Link>
      <Link to='/redeem-rewards' className="btn btn-primary my-1">
        Redeem Rewards
      </Link>
    </div>
  );
};

export default DashboardActions;