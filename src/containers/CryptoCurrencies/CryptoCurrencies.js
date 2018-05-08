import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './CryptoCurrencies.css';
import axios from '../../crypto-compare.js';

import Price from '../../components/Price/Price';

class CryptoCurrencies extends Component {
	constructor(props) {
    super(props);
    this.state = {
      cryptos: {},
      //teststate: {}
    }
  }
  /*fetchResult() {
    axios.get('data/pricemulti?fsyms=BTC,MLN,DASH,DOGE&tsyms=USD')
      .then(res => {
        let updatedPrice = res.data;
        let arrUpdatedPrice = Object.keys(updatedPrice).map(function (k) {
          return {[k]: updatedPrice[k]};
        });
        for(var i = 0; i < arrUpdatedPrice.length; i++) {
          console.log(arrUpdatedPrice[i][this.state.cryptos[i].CoinInfo.Name])
          // try immutability-helper
        }
        console.log(arrUpdatedPrice);
        //console.log(this.teststate);
      })
  }}*/
  componentDidMount() {
    Promise.all([
      axios.get('data/coin/generalinfo?fsyms=BTC,ETH,EOS,BCH,XRP,LTC,TRX,ETC,IOT,NEO&tsym=USD'),
      axios.get('data/pricemulti?fsyms=BTC,ETH,EOS,BCH,XRP,LTC,TRX,ETC,IOT,NEO&tsyms=USD')
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
      //console.log(cryptoData);
      this.setState({
        cryptos: cryptoData
      });
    });
    //this.fetchResult();
  }

  render() {
    return(
      <div className="App">
        {Object.keys(this.state.cryptos).map((key) => (
          <Link to={'/coin/' + this.state.cryptos[key].CoinInfo.Name} params={this.state.cryptos[key].CoinInfo.Name} key={this.state.cryptos[key].CoinInfo.Name}>
            <div id="crypto-container" className="container">
              <div className="coin-image">
                <img src={'https://www.cryptocompare.com' + this.state.cryptos[key].CoinInfo.ImageUrl} alt="" className="crypto-img" />
              </div>
              <div className="coin-name">
                <p><strong>{this.state.cryptos[key].CoinInfo.Name}</strong></p>
                <p>{this.state.cryptos[key].CoinInfo.FullName}</p>
              </div>
              <div className="right">
                <Price title={this.state.cryptos[key].CoinInfo.USD.toFixed(2)} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  }
}

export default CryptoCurrencies;