import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      
          <div className="ui three item menu">
              <a className="active item" href="documents">Documents</a>

          </div>    
          <div className="ui container">
              {this.props.children && React.cloneElement(this.props.children, {})}
          </div>
      </div>
          );
      }
    }

    export default App;
