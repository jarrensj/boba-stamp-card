import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import AccountActions from './AccountActions';

const Account = ({ auth: { user } }) => {
  return (
    <Fragment>
      <h1 className="large text-primary">Account</h1>
      <p className="lead">
      <i className="fas fa-user"></i> Hi {user && user.admin && <Fragment>Admin</Fragment>} {user && user.name}
      </p>
      {user && 
        <Fragment>
          <AccountActions />
        </Fragment>
      }
    </Fragment>
  )
  
}

Account.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { })(Account);