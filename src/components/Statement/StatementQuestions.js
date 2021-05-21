import React from 'react';

const StatementQuestions = (props) => {
	const qp = props.questionpath;
	const fund = props.fund;
	const noDataThere = fund.questions.filter((x) => x.questionpath === qp).length === 0 ? true : false;



	return (
		<div>
			{fund.questions.filter((x) => x.questionpath === qp).map((i) => (
				<p className="cer">
					{i.link ? (
						<a style={{ display: 'table-cell' }} href={i.link} target="_blank">
							{i.answer}
						</a>
					) : 
						i.other ? <div style={{ display: 'table-cell' }}>{i.other}</div> : <div>{i.answer}</div>
					}

					<span className="logo" style={{ color: '#000', 'font-size': '13px', 'text-align': 'right' }}>
						{i.score ? <div>Score: {i.score}</div> : null}
					</span>
				</p>
			))}
			{ noDataThere ? <p className="cer">No data provided</p> : null}
		</div>
	);
};

export default StatementQuestions;
