import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import CryptoCurrencies from './containers/CryptoCurrencies/CryptoCurrencies';
import CryptoCurrency from './containers/CryptoCurrency/CryptoCurrency';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/coin/:id" exact component={CryptoCurrency} />
            <Route path="/" component={CryptoCurrencies} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
