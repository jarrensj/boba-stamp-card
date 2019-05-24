import React, { Fragment, useState } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AddPoints = () => {

  return (
    <Fragment>
      <h1 class="large text-primary">
       Add Points
      </h1>
    </Fragment>
  )
}

AddPoints.propTypes = {

}

export default connect(null)(withRouter(AddPoints))
