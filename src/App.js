import React, { Component } from 'react';
//import {Route, Switch} from 'react-router-dom';

import CryptoCurrencies from './containers/CryptoCurrencies/CryptoCurrencies';

class App extends Component {
  render() {
    return (
      <div>
          <CryptoCurrencies />
      </div>
    );
  }
}

export default App;
