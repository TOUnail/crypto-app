import React from 'react';
import './Percentage.css';

const percentage = (props) => {
	if (props.percent > 0) {
		return (
			<span className="positive-percent">({props.percent}%)</span>
		);
	}
	if (props.percent < 0) {
		return (
			<span className="negative-percent">({props.percent}%)</span>
		);
	}
}

export default percentage;