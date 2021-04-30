import React, { Component } from 'react';
import './style/App.scss';
import HomePage from './component/HomePage';

class App extends Component {
  render() {
    return (
      <div className="container">
        <HomePage />
      </div>
    );
  }
}

export default App;