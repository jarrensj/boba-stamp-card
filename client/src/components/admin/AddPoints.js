import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPoints } from '../../actions/stampcard';

const AddPoints = ({ addPoints, history }) => {
  const [formData, setFormData] = useState({
    email: '',
    points: ''
  });

  const { email, points } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 class="large text-primary">
       Add Points
      </h1>
      <p class="lead">
        <i class="fas fa-code-branch"></i> Add points for their purchase!
      </p>
      <small>* = required field</small>
      <form class="form" onSubmit={e => {
        e.preventDefault();
        addPoints(formData, history);
      }}>
        <div class="form-group">
          <h4>* Email: </h4>
          <input type="email" placeholder="Email" name="email" value={email} onChange={e => onChange(e)} required />
        </div>
        <div class="form-group">
          <h4>* Points: </h4>
          <input type="number" min="0" max="10" placeholder="" name="points" value={points} onChange={e => onChange(e)} required />
        </div>
        <input type="submit" class="btn btn-primary my-1" />
        <a class="btn btn-light my-1" href="../dashboard">Go Back</a>
      </form>
    </Fragment>
  )
}

AddPoints.propTypes = {
  addPoints: PropTypes.func.isRequired
}

export default connect(null, { addPoints })(AddPoints)