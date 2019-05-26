import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeEmail } from '../../actions/auth';

const ChangeEmail = ({ changeEmail, history }) => {
  const [formData, setFormData] = useState({
    email: ''
  });

  const { email } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 class="large text-primary">
       Change Email
      </h1>
      <p class="lead">
        <i class="fas fa-code-branch"></i> Change email for your account!
      </p>
      <small>* = required field</small>
      <form class="form" onSubmit={e => {
        e.preventDefault();
        changeEmail(formData, history);
      }}>
        <div class="form-group">
          <h4>* Email: </h4>
          <input type="email" placeholder="Email" name="email" value={email} onChange={e => onChange(e)} required />
        </div>
        <input type="submit" class="btn btn-primary my-1" />
        <a class="btn btn-light my-1" href="../dashboard">Go Back</a>
      </form>
    </Fragment>
  )
}

ChangeEmail.propTypes = {
  changeEmail: PropTypes.func.isRequired
}

export default connect(null, { changeEmail })(ChangeEmail)