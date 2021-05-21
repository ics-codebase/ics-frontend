import React, { useState } from 'react';


const ReviewInvestorContibution = (props) => {
	const investor = props.fund.investor;

	return (
		<div>
			<div className="ppfororange">
				<div className="orangedivcb">
					{investor.includes('impactmatterssignal') ? (
						<div className="box">
							<p className="tit">· Signal that impact matters</p>
						</div>
					) : null}
					{investor.includes('engage') ? (
						<div className="box">
							<p className="tit">· Engage Actively</p>
						</div>
					) : null}
					{investor.includes('grow') ? (
						<div className="box">
							<p className="tit">· Grow new/undersupplied capital markets</p>
						</div>
					) : null}
					{investor.includes('flexibility') ? (
						<div className="box">
							<p className="tit">· Provide flexibility on risk-adjusted financial return</p>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default ReviewInvestorContibution;