import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cryptos: []
    };
  }
  componentDidMount() {
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,IOT&tsyms=USD')
      .then(res=>{
        const cryptos = res.data;
        console.log(cryptos);
        this.setState({cryptos: cryptos});
      })
  }
  render() {
    return(
      <div className="App">
        {Object.keys(this.state.cryptos).map((key) => (
          <div key={key}>
            {key}
            {this.state.cryptos[key].USD}
          </div>
        ))}
      </div>
    );
  }
}

export default App;
