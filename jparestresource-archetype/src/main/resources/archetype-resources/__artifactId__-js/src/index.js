#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
import React from 'react';
import { Router, Route, useRouterHistory } from 'react-router';
//import { Router, Route, Link, browserHistory } from 'react-router';
import { createHistory } from 'history';
import ReactDOM from 'react-dom';
import Filtrable${domain_objectName}sTable from './${domain_objectName}s';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import './index.css';


const history = useRouterHistory(createHistory)({
  basename: process.env.PUBLIC_URL,
 });

ReactDOM.render((
  <Router history={history}>
    <Route path="/" component={App}>
      <Route path="${domain_packageName}" component={Filtrable${domain_objectName}sTable} />
    </Route>

  </Router>
),
  document.getElementById('root')
);
