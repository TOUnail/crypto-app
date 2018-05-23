import React, { Component } from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import './App.css';
import CryptoCurrencies from './containers/CryptoCurrencies/CryptoCurrencies';
import CryptoCurrency from './containers/CryptoCurrencies/CryptoCurrency/CryptoCurrency';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/coin/:id" component={CryptoCurrency} />
            <Route path="/" exact component={CryptoCurrencies} />
            <Redirect from="/coin" to="/" />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
