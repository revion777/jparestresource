import React from 'react';
import PropTypes from 'prop-types';

export default class StoreWrapper extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    store: PropTypes.object.isRequired,
  };

  static childContextTypes = {
    store: PropTypes.object.isRequired,
  }

  getChildContext = () => ({
    store: this.props.store,
  });

  render () {
    return this.props.children;
  }
}
