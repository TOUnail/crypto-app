import React, {Component} from 'react';
import './CryptoCurrency.css';
import axios from '../../crypto-compare.js';
import {VictoryLine,VictoryChart,VictoryAxis,VictoryTheme} from 'victory';

class CryptoCurrency extends Component {
	constructor(props) {
		super(props);
		this.state = {
	      cryptoSingleInfo: [],
	      cryptoSinglePrice: null,
	      cryptoHist: []
	      //teststate: {}
	    }
	}
	componentDidMount(props) {
		Promise.all([
	      axios.get('data/coin/generalinfo?fsyms='+ this.props.match.params.id +'&tsym=USD'),
	      axios.get('data/price?fsym='+ this.props.match.params.id +'&tsyms=USD'),
	      axios.get('data/histohour?fsym='+ this.props.match.params.id +'&tsym=USD&limit=10')
	    ])
    	.then(([singleGeneralInfo, singlePrice, priceHist]) => {
    		let cryptoData = singleGeneralInfo.data.Data;
    		let cryptoPrice = singlePrice.data;
    		let cryptoHist = priceHist.data.Data;
    		this.setState({
				cryptoSingleInfo: cryptoData,
				cryptoSinglePrice: cryptoPrice,
				cryptoHist: cryptoHist
    		})
    		/*let arrSingleCryptoPrice = Object
		        .keys(cryptoPrice)
		        .map(function (key) {
		          return {[key]: cryptoPrice[key]};
	        });
	        let merge = {}
	        Object.assign(merge,...cryptoData,...arrSingleCryptoPrice);
	        for(var i = 0; i < cryptoHist.length; i++) {
	        	console.log(cryptoHist[i])
	        	Object.assign(merge,...cryptoHist[i]);
	    	}
	    	console.log(cryptoData);
	    	console.log(arrSingleCryptoPrice);
	    	console.log(cryptoHist);
	        console.log(merge);
	        console.log(arrSingleCryptoPrice);
	        console.log(cryptoHist);
	        console.log(merge);*/
    	})



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
	render() {
		return (
			<div className="currency-container">
			
				{this.props.match.params.id}
				<div className="chart" style={{ display: "flex", flexWrap: "wrap" }}>
					<VictoryChart theme={VictoryTheme.material} height={250} domainPadding={{y:50}} style={{ parent: { maxWidth: "100%" } }}>
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
	}
}

export default CryptoCurrency;