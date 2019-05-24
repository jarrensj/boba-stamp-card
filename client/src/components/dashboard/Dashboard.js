import React, { useEffect } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getStampcard } from '../../actions/stampcard'

const Dashboard = ({ getStampcard, auth, stampcard }) => {
  useEffect(() => {
    getStampcard();
  }, []);

  return (
    <div>
      Dashboard 
    </div>
  )
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