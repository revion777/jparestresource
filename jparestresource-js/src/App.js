import React, { Component } from 'react';
//import logo from './logo.svg';
import { Menu, Container } from 'semantic-ui-react';
import './App.css';
import { Link } from 'react-router';
import classnames from 'classnames';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Menu>
          <Menu.Item>
            {/* <img className="ui image" alt="BBLogo" src='http://www.bystrobank.ru/img/logo.gif' /> */}
          </Menu.Item>

          <Link to="/"
            className={classnames('item', { active:  window.location.pathname === '/'})}
          >
            Home
          </Link>

          <Link to="/documents"
            className={classnames('item', { active:  window.location.pathname === '/documents'})}
          >
            Documents
          </Link>
        </Menu>

        <Container>
          {this.props.children && React.cloneElement(this.props.children, {})}
        </Container>
      </div>
    );
  }
}

export default App;
