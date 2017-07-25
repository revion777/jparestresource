import React from 'react';
import { Router, Route } from 'react-router';
import { createHistory } from 'history';
import { useRouterHistory } from 'react-router';
import NotFound from './components/NotFound';
import config from '../config';
import EnsureSwagger from './providers/Swagger';
// import Root from './containers/Root';

import Layout from './containers/Layout';
import App from './containers/App';

const history = useRouterHistory(createHistory)({
  basename: config.get('project_public_path'),
});

const Routes = () => (
  <Router history={history}>
    <Route component={EnsureSwagger}>
      <Route component={Layout}>
        <Route path="/(:uid)" getComponents={
          (location, cb) => {
            cb(null, (props) => (
              <App {...props}/>
            ));
          }}
        />
      </Route>
    </Route>
    <Route path="*" component={NotFound}/>
  </Router>
);

export default Routes;
