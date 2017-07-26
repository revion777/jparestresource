import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Segment, Header } from 'semantic-ui-react';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import Documents from '../Documents';

class App extends Component {
  render() {
    return (
      <Segment>
        <Helmet title="Jparestresource frontend"/>
        <Header content="Jparestresource frontend"/>
        <Documents/>
      </Segment>
    );
  }
}

export default compose(
  pure,
)(App);
