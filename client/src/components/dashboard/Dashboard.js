import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getStampcard } from '../../actions/stampcard'

const Dashboard = ({ getStampcard, auth: { user }, stampcard: { stampcard, loading } }) => {
  useEffect(() => {
    getStampcard();
  }, [getStampcard]);

  return loading && stampcard === null ? <Spinner /> : <Fragment>
    <h1 className="large text-primary">Dashboard</h1>
    <p className="lead">
      <i className="fas fa-user"></i> Hi {user && user.name}
    </p>
    {stampcard != null ? (
      <Fragment>
        You have {stampcard.points} points right now and {stampcard.rewards} rewards currently available. <br />
        Just give your email address and you'll get your points with your purchase.
      </Fragment>
    ) : (
      <Fragment>
        <p>You have not yet setup a stampcard, please add some info</p>
        <Link to='/join-rewards' className="btn btn-primary my-1">
          Join Rewards Program
        </Link>
      </Fragment>
    )}
  </Fragment>
}

Dashboard.propTypes = {
  getStampcard: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  stampcard: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  stampcard: state.stampcard
});

export default connect(mapStateToProps, { getStampcard })(Dashboard);