import React, { Component } from 'react';
import './App.css';
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
      axios.get('data/coin/generalinfo?fsyms=BTC,MLN,DASH&tsym=USD'),
      axios.get('data/pricemulti?fsyms=BTC,MLN,DASH&tsyms=USD')
    ])
    .then(([generalInfo, pricemulti]) => {
      let cryptoData = generalInfo.data.Data.concat(pricemulti.data);
      this.setState({
        crypto:cryptoData,
      });
      console.log(this.state.crypto);
      console.log(this.state.crypto[3]);
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
            </span>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
