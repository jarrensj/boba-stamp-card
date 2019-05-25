import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { redeemRewards } from '../../actions/stampcard';

const RedeemRewards = ({ redeemRewards, history }) => {
  const [formData, setFormData] = useState({
    email: '',
    rewards: ''
  });

  const { email, rewards } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 class="large text-primary">
       Redeem Rewards
      </h1>
      <p class="lead">
        <i class="fas fa-code-branch"></i> Redeem their rewards!
      </p>
      <small>* = required field</small>
      <form class="form" onSubmit={e => {
        e.preventDefault();
        redeemRewards(formData, history);
      }}>
        <div class="form-group">
          <h4>* Email: </h4>
          <input type="email" placeholder="Email" name="email" value={email} onChange={e => onChange(e)} required />
        </div>
        <div class="form-group">
          <h4>* Rewards: </h4>
          <input type="number" min="1" max="5" placeholder="" name="rewards" value={rewards} onChange={e => onChange(e)} required />
        </div>
        <input type="submit" class="btn btn-primary my-1" />
        <a class="btn btn-light my-1" href="../dashboard">Go Back</a>
      </form>
    </Fragment>
  )
}

RedeemRewards.propTypes = {
  redeemRewards: PropTypes.func.isRequired
}

export default connect(null, { redeemRewards })(RedeemRewards)