import React, {Component} from 'react';
import './CryptoCurrency.css';
import axios from '../../crypto-compare.js';
import {VictoryLine,VictoryChart,VictoryAxis,VictoryTheme} from 'victory';

class CryptoCurrency extends Component {
	constructor(props) {
		super(props);
		this.state = {
	      cryptoInfo: []
	      //teststate: {}
	    }
	}
	componentDidMount(props) {
		//console.log('props:', this.props);
		axios.get('data/histominute?fsym='+ this.props.match.params.id +'&tsym=USD&limit=10')
			.then(res=>{
				console.log(res.data)
				const cryptoInfo = res.data.Data;
				this.setState({
					cryptoInfo: cryptoInfo
				})
			})
	    /*axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms='+{this.props}+'&tsyms=USD')
	      .then(res => {
	        const cryptos = res.data;
	        console.log(cryptos);
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
		let time =  + hour + ':' + min + '\n' + month + ' ' + date + ', ' + year;
		return time;
	}
	render() {
		return (
			<div>
				{this.props.match.params.id}
				<div className="chart">
					<VictoryChart theme={VictoryTheme.material} height={200}>
						<VictoryAxis
							tickFormat = {(y)=>(this.timeConverter(y))}
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
							data={this.state.cryptoInfo}
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
							data={this.state.cryptoInfo}
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
							data={this.state.cryptoInfo}
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
							data={this.state.cryptoInfo}
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