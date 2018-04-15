import React, { Component } from 'react';
import './App.css';
import axios from './crypto-compare.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cryptos: []
    };
  }
  componentDidMount() {
    axios.get('data/coin/generalinfo?fsyms=BTC,MLN,DASH&tsym=USD')
      .then(response => {
        const cryptos = response.data.Data;
        this.setState({cryptos: cryptos});
        console.log(cryptos);
      })
      .catch(error => {
        console.log(error);
      })
  }
  render() {
    return(
      <div className="App">
        {Object.keys(this.state.cryptos).map((key) => (
          <div id="crypto-container" className="container">
            <span className="left">
              <img src={'https://www.cryptocompare.com' + this.state.cryptos[key].CoinInfo.ImageUrl} className="crypto-img" />
              {this.state.cryptos[key].CoinInfo.Name}
              </span>
            <span className="right">{this.state.cryptos[key].CoinInfo.FullName}</span>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
