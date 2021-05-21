import React from 'react';
import { Link } from 'react-router-dom';

const StatementMainImpactAreas = (props) => {
	const fundData = props.fund;
	const areas = fundData.impactsdg.focusareas;

	if (fundData.impactsdg.focusareas) {
	}

	return (
		<div style={{ height: '65px' }}>
			{areas.primary !== 'none' && areas.primary !== ''  ? (
				<div style={{ float: 'left', padding: '10px 10px 10px 0px' }}>
					<img src={'/assets/img/SDG' + areas.primary + '.png'} />
				</div>
			) : null}
			{areas.secondary !== 'none' && areas.secondary !== ''   ? (
			<div style={{ float: 'left', padding: '10px 10px 10px 0px' }}>
				<img src={'/assets/img/SDG' + areas.secondary + '.png'} />
			</div>
			) : null}
			{areas.tertiary !== 'none' && areas.tertiary !== ''   ? (
			<div style={{ float: 'left', padding: '10px 10px 10px 0px' }}>
				<img src={'/assets/img/SDG' + areas.tertiary + '.png'} />
			</div>
			) : null}
		</div>
	);
};

export default StatementMainImpactAreas;
