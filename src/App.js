import React, { Component } from 'react';
import './App.css';
import Price from './components/Price/Price';
import axios from './crypto-compare.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      crypto: []
    }
  }
  componentDidMount() {
    Promise.all([
      //https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=BTC&tsym=USD
      axios.get('data/coin/generalinfo?fsyms=BTC,MLN,DASH&tsym=USD'),
      axios.get('data/pricemultifull?fsyms=BTC,MLN,DASH&tsyms=USD')
    ])
    .then(([generalInfo, pricemulti]) => {
      let cryptoData = generalInfo.data.Data.concat(pricemulti.data);
      this.setState({
        crypto:cryptoData
      });
      console.log(this.state.crypto);
    });
  }

  render() {
    return(
      <div className="App">
        {Object.keys(this.state.crypto.slice(0,-1)).map((key) => (
          <div id="crypto-container" className="container" key={key}>
            <span className="left">
              {this.state.crypto[key].CoinInfo.Name}
              <img src={'https://www.cryptocompare.com' + this.state.crypto[key].CoinInfo.ImageUrl} alt="" className="crypto-img" />
            </span>
            <span className="right">
              {this.state.crypto.slice(-1)[0].RAW.BTC.USD.FROMSYMBOL}
              <Price />
            </span>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
