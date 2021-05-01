import React, { Component } from 'react';
import './style/App.scss';
import HomePage from './component/HomePage';
import SearchResults from './component/SearchResults';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div>
        <div className="container">
        <Router>
          <Switch>
              <Route path='/search' render={(props) => <SearchResults {...props}/>}/>
              <Route path='/' component={HomePage}/>
          </Switch>
        </Router>
          {/* <HomePage /> */}
          
        </div>
      </div>
    );
  }
}

export default App;