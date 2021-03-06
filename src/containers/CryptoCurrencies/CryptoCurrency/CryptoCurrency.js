import React, {Component} from 'react';
import './CryptoCurrency.css';
import Price from '../../../components/Price/Price';
import Percentage from '../../../components/Percentage/Percentage';
import Loader from '../../../components/Loader/Loader';
import axios from '../../../crypto-compare.js';
import {VictoryLine,VictoryChart,VictoryAxis,VictoryTheme} from 'victory';

class CryptoCurrency extends Component {
	constructor(props) {
		super(props);
		this.state = {
	      cryptoSingleInfo: null,
	      cryptoSinglePrice: null,
	      cryptoHist: null
	    }
	}
	componentDidMount(props) {
		Promise.all([
	      axios.get('data/coin/generalinfo?fsyms='+ this.props.match.params.id +'&tsym=USD'),
	      axios.get('data/pricemultifull?fsyms='+ this.props.match.params.id +'&tsyms=USD'),
	      axios.get('data/histohour?fsym='+ this.props.match.params.id +'&tsym=USD&limit=10')
	    ])
    	.then(([singleGeneralInfo, singlePrice, priceHist]) => {
    		let cryptoData = singleGeneralInfo.data.Data[0];
    		let cryptoPrice = singlePrice.data;
    		let cryptoHist = priceHist.data.Data;
    		console.log(cryptoPrice);
    		this.setState({
				cryptoSingleInfo: cryptoData,
				cryptoSinglePrice: cryptoPrice,
				cryptoHist: cryptoHist
    		});
    	})
    	.catch(error => console.log(error));



		/*axios.get('data/histohour?fsym='+ this.props.match.params.id +'&tsym=USD&limit=10')
			.then(res=>{
				console.log(res.data)
				const cryptoInfo = res.data.Data;
				this.setState({
					cryptoInfo: cryptoInfo
				})
			})*/
	}
	timeConverter(unix_time){
		let a = new Date(unix_time * 1000);
		let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		let year = a.getFullYear();
		let month = months[a.getMonth()];
		let date = a.getDate();
		let hour = a.getHours();
		let min = a.getMinutes();
		let meridian = 'AM';
		let hourFormatted = hour;
		if (hourFormatted >= 12) {
			hourFormatted = hour - 12;
			meridian = 'PM';
		}
		if (hourFormatted === 0) {
			hourFormatted = 12;
		}
		min = min < 10 ? '0' + min : min;

		let time =  + hourFormatted + ':' + min + ' ' + meridian + '\n' + month + ' ' + date + ', ' + year;
		return time;
	}
	formattedNumber(x){
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	render() {
		const data = this.state.cryptoSinglePrice;
		if (data) { 
			return (
				<div className="currency-container">
					<div className="container-header">
						<div className="currency-image">
							<img className="currency-img" alt={this.state.cryptoSingleInfo.CoinInfo.Name} src={'https://www.cryptocompare.com' + this.state.cryptoSingleInfo.CoinInfo.ImageUrl} />
						</div>
						<div className="currency-info">
							<p className="currency-name"><strong>{this.state.cryptoSingleInfo.CoinInfo.FullName} <span className="currency-abbr">({this.props.match.params.id})</span></strong></p>
							$<Price title={this.state.cryptoSinglePrice.RAW[this.props.match.params.id].USD.PRICE.toFixed(2)} />
							<Percentage percent={this.state.cryptoSinglePrice.RAW[this.props.match.params.id].USD.CHANGEPCT24HOUR} />
						</div>
					</div>
					<div className="currency-data">
						<table className="currency-table">
							<thead>
								<tr>
									<th>Market Cap</th>
									<th>Circulating Supply</th>
									<th>Volume (24hr)</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>
										{this.state.cryptoSinglePrice.RAW[this.props.match.params.id].USD.MKTCAP.toLocaleString(navigator.language, { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}
									</td>
									<td>
										{this.state.cryptoSinglePrice.RAW[this.props.match.params.id].USD.SUPPLY.toLocaleString(navigator.language, { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}
									</td>
									<td>
										{this.state.cryptoSinglePrice.RAW[this.props.match.params.id].USD.VOLUME24HOURTO.toLocaleString(navigator.language, { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="chart">
						<VictoryChart theme={VictoryTheme.material} height={250} domainPadding={{y:50}}>
							<VictoryAxis
								tickFormat = {(y)=>(this.timeConverter(y))}
								tickCount = {10}
								style = {{
									tickLabels: {fontSize: 3}
								}}
							/>
							<VictoryAxis
								dependentAxis
								tickFormat = {(x)=>(`$${x.toFixed(2)}`)}
								style = {{
									tickLabels: {fontSize: 5}
								}}
							/>
							<VictoryLine
								style={{
							      data: {
							      	stroke: "#c43a31",
							      	strokeWidth: 0.5
							      }
							    }}
								data={this.state.cryptoHist}
								x="time"
								y="high"
							/>
							<VictoryLine
								style={{
							      data: {
							      	stroke: "#ccc",
							      	strokeWidth: 0.5
							      }
							    }}
								data={this.state.cryptoHist}
								x="time"
								y="low"
							/>
							<VictoryLine
								style={{
							      data: {
							      	stroke: "#00ff00",
							      	strokeWidth: 0.5
							      }
							    }}
								data={this.state.cryptoHist}
								x="time"
								y="open"
							/>
							<VictoryLine
								style={{
							      data: {
							      	stroke: "#0000ff",
							      	strokeWidth: 0.5
							      }
							    }}
								data={this.state.cryptoHist}
								x="time"
								y="close"
							/>
						</VictoryChart>
					</div>
				</div>
			);
		} else {
			return <Loader />;
		}
	}
}

export default CryptoCurrency;