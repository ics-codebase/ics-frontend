import React from 'react';
import { Link } from 'react-router-dom';

const ReviewQuestions = (props) => {
	const qp = props.questionpath;
	const fund = props.fund;

	return (
		<div className="ppfororange">
			<div className="addform">
				<div>
					<p>
						<p className="itemadded">
							Name{' '}
							<span className="rights">
								<a href="">LINK/SCORE</a>
							</span>
						</p>

						{fund.questions.filter((x) => x.questionpath === qp).map((i) => (
							<p className="itemadded scoreadded">
								<div dangerouslySetInnerHTML={{ __html: i.answer }} />
								<span className="rights">
									{i.score ? <span className="score">Score: {i.score}</span> : null}
									{i.link ? (
										<a style={{ display: 'table-cell' }} href={i.link} target="_blank">
											{i.link}
										</a>
									) : null}
									{i.other ? <div style={{ display: 'table-cell' }}>{i.other}</div> : null}
								</span>
							</p>
						))}
					</p>
				</div>
			</div>
		</div>
	);
};

export default ReviewQuestions;
