import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import AdminRoute from './components/routing/AdminRoute';
import AddPoints from './components/admin/AddPoints';
import RedeemRewards from './components/admin/RedeemRewards';
import Account from './components/account/Account';
import ChangeEmail from './components/account/ChangeEmail';
import ChangePassword from './components/account/ChangePassword';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <AdminRoute exact path="/admin/add-points" component={AddPoints} />
              <AdminRoute exact path="/admin/redeem-rewards" component={RedeemRewards} />
              <PrivateRoute exact path="/change-email" component={ChangeEmail} />
              <PrivateRoute exact path="/change-password" component={ChangePassword} />
              <PrivateRoute exact path="/account" component={Account} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App;