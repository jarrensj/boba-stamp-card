import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setAlert } from '../../actions/alert';
import { connect } from 'react-redux';
import { changePassword } from '../../actions/auth';

const ChangePassword = ({ setAlert, changePassword, history }) => {
  const [formData, setFormData] = useState({
    password: '',
    newPassword: '',
    newPassword2: ''
  });

  const { password, newPassword, newPassword2 } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (newPassword !== newPassword2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      changePassword({ password, newPassword }, history);
    }
  }

  return (
    <Fragment>
      <h1 class="large text-primary">
       Change password
      </h1>
      <p class="lead">
        <i class="fas fa-code-branch"></i> Change password for your account!
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div class="form-group">
          <h4>* Current Password: </h4>
          <input type="password" placeholder="password" name="password" value={password} onChange={e => onChange(e)} required />
        </div>
        <div class="form-group">
          <h4>* New Password: </h4>
          <input type="password" placeholder="new password" name="newPassword" value={newPassword} onChange={e => onChange(e)} required />
        </div>
        <div class="form-group">
          <h4>* New Password Confirmation: </h4>
          <input type="password" placeholder="new password" name="newPassword2" value={newPassword2} onChange={e => onChange(e)} required />
        </div>
        <input type="submit" class="btn btn-primary my-1" />
        <a class="btn btn-light my-1" href="../dashboard">Go Back</a>
      </form>
    </Fragment>
  )
}

ChangePassword.propTypes = {
  changePassword: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
}

export default connect(null, { setAlert, changePassword })(ChangePassword)