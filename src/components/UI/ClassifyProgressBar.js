import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { useHistory, useParams } from 'react-router-dom';

const ClassifyProgressBar = (props) => {
	let history = useHistory();

	let practice = '';
	let performance = '';
	let impactabc = '';
	let impactsdg = '';
	let investor = '';
	let allocation = '';
	let rating = '';
    let review = '';
    let finished = 0;

	switch (props.position) {
		case 'practice':
            practice = 'finsihedtext';
            finished = 1;
			break;
		case 'performance':
			performance = 'finsihedtext';
            finished = 2;
			break;
		case 'impactabc':
			impactabc = 'finsihedtext';
            finished = 3;
			break;
		case 'impactsdg':
			impactsdg = 'finsihedtext';
            finished = 4;
			break;
		case 'investor':
			investor = 'finsihedtext';
            finished = 5;
			break;
		case 'allocation':
			allocation = 'finsihedtext';
            finished = 6;
			break;
		case 'rating':
			rating = 'finsihedtext';
            finished = 7;
			break;
		case 'review':
			review = 'finsihedtext';
            finished = 8;
			break;
		default:
			practice = 'finishedtext';
            finished = 1;
    }
    
   


	return (
		<div className="finishedline">
			<div className="grayline">
				<div className="dot1 dot">
					<div className={'text ' + practice}>
						<p>Practice</p>
					</div>
				</div>
				<div className="dot2 dot">
					<div className={'text ' + performance}>
						<p>Performance</p>
					</div>
				</div>
				<div className="dot3 dot">
					<div className={'text ' + impactabc}>
						<p>Impact of underlying assets (ABC)</p>
					</div>
				</div>
				<div className="dot4 dot">
					<div className={'text ' + impactsdg}>
						<p>
							Impact <br /> by SDG
						</p>
					</div>
				</div>
				<div className="dot5 dot">
					<div className={'text ' + investor}>
						<p>Investor contribution</p>
					</div>
				</div>
				<div className="dot6 dot">
					<div className={'text ' + allocation}>
						<p>Impact className allocation</p>
					</div>
				</div>
				<div className="dot7 dot">
					<div className={'text ' + rating}>
						<p>Ratings and affiliations</p>
					</div>
				</div>
				<div className="dot8 dot">
					<div className={'text ' + review}>
						<p>
							Review <br />&amp; confirm
						</p>
					</div>
				</div>

				<div className={'finsihed finished' + finished} />
			</div>
		</div>
	);
};

export default withRouter(ClassifyProgressBar);
