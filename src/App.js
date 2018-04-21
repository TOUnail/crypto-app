import React, { Component } from 'react';
import './App.css';
import axios from './crypto-compare.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cryptos: {}
    }
  }
  componentDidMount() {
    Promise.all([
      //https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=BTC&tsym=USD
      axios.get('data/coin/generalinfo?fsyms=BTC,MLN,DASH&tsym=USD'),
      axios.get('data/pricemulti?fsyms=BTC,MLN,DASH&tsyms=USD')
    ])
    .then(([generalInfo, pricemulti]) => {
      let cryptoData = generalInfo.data.Data;
      let cryptoPrice = pricemulti.data;
      let arrCryptoPrice = Object
        .keys(cryptoPrice)
        .map(function (key) {
          return {[key]: cryptoPrice[key]};
        });
      for(var i = 0; i < cryptoData.length; i++) {
        Object.assign(cryptoData[i].CoinInfo,arrCryptoPrice[i][cryptoData[i].CoinInfo.Name]);
      }
      this.setState({
        cryptos: cryptoData
      });
    });
  }

  render() {
    return(
      <div className="App">
        {Object.keys(this.state.cryptos).map((key) => (
          <div id="crypto-container" className="container" key={key}>
            <span className="left">{this.state.cryptos[key].CoinInfo.Name}</span>
            <span className="right">{this.state.cryptos[key].CoinInfo.USD}</span>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
