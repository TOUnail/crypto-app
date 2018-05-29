import React from 'react';
import './Percentage.css';

const percentage = (props) => {
	if (props.percent > 0) {
		return (
			<span className="positive-percent">({props.percent.toFixed(2)}%)</span>
		);
	}
	if (props.percent < 0) {
		return (
			<span className="negative-percent">({props.percent.toFixed(2)}%)</span>
		);
	}
}

export default percentage;