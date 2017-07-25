import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Swagger from 'swagger-client';
import * as SwaggerActions from '../actions/SwaggerActions';
import { Message, Loader } from 'semantic-ui-react';

class EnsureSwagger extends Component {
  swaggerClient = null;

  static propTypes = {
    children: PropTypes.element.isRequired,
    swaggerActions: PropTypes.object.isRequired,
    swagger: PropTypes.object.isRequired,
  };

  static childContextTypes = {
    swaggerClient: PropTypes.object,
  }

  getChildContext = () => ({
    swaggerClient: this.swaggerClient,
  });

  componentDidMount() {
    this.initSwagger(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.initSwagger(nextProps);
  }

  initSwagger = (props) => {
    const { initialized, error, loading } = props.swagger;
    const { swaggerInitStart, swaggerInitFinish, swaggerInitError} = props.swaggerActions;
    if ((!initialized || !this.swaggerClient) && !error && !loading) {
      swaggerInitStart();
      new Swagger({
        url: 'https://localhost:8080/jparestresource/web/swagger.json',
        usePromise: true,
      })
        .then((client) => {
          // console.log('client', client);
          this.swaggerClient = client;
          swaggerInitFinish();
        })
        .catch((error) => {
          swaggerInitError(error);
        });
    }
  };

  render() {
    const { initialized, error, loading } = this.props.swagger;
    if (error) {
      return (<div style={{ padding: '1rem' }}>
        <Message error content={error || 'Ошибка загрузки swaggerClient'}/>
      </div>);
    } else if (loading || !initialized || !this.swaggerClient) {
      return (<div style={{ padding: '1rem' }}>Загрузка{' '}<Loader size="mini" inline active/></div>);
    }
    return this.props.children;
  }
}

export default connect(
  state => ({
    swagger: state.swagger,
  }),
  dispatch => ({
    swaggerActions: bindActionCreators(SwaggerActions, dispatch),
  })
)(EnsureSwagger);
