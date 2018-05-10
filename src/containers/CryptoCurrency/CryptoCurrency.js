import React, {Component} from 'react';
import axios from '../../crypto-compare.js';
import {VictoryLine,VictoryChart,VictoryTheme} from 'victory';

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
	render() {
		return (
			<div>
				{this.props.match.params.id}
				<div>
					<VictoryChart theme={VictoryTheme.material}>
						<VictoryLine
							data={this.state.cryptoInfo}
							x="time"
							y="high"
						/>
					</VictoryChart>
				</div>
			</div>
		);
	}
}

export default CryptoCurrency;