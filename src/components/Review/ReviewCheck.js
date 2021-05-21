import React from 'react';

const ReviewCheck = (props) => {
	const qp = props.questionpath;
	const fund = props.fund;

	return (
		<div>
			<div className="ppfororange">
				<div className="orangedivcb">
					{fund.questions.filter((x) => x.questionpath === qp).map((i) => (
						<div>
							<div className="box">
								<p className="tit" dangerouslySetInnerHTML={{ __html: i.answer }} />
							</div>
							{i.subanswers ? (
								<div className="box">
									{i.subanswers.sort().map((a) => (
										<div className="col-md-6" key={a}>
											<p className="tit">- {a}</p>
										</div>
									))}
									{qp === 'practice/partofpractice' && fund.practice_exclusions_other ? (
										<div className="col-md-6">
											<p className="tit">- {fund.practice_exclusions_other}</p>
										</div>
									) : null}
								</div>
							) : null}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ReviewCheck;
