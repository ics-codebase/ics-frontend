import React from 'react';
import { Link } from 'react-router-dom';

function cleanName(n) {
	return n.replace(/__/g, ' ');
}

const StatementOrgQuestions = (props) => {
	const ng = props.notationgroup;
	const org = props.org;

	const noDataThere = org.notations
		? org.notations.filter((x) => x.group === ng).length === 0 ? true : false
		: true;

	return (
		<div>
			{org.notations ? (
				org.notations.filter((x) => x.group === ng).map((i) => (
					<p className="cer">
						<a style={{ display: 'table-cell' }} href={i.link} target="_blank">
							{cleanName(i.name)}
						</a>

						<span className="logo" style={{ color: '#000', 'font-size': '13px', 'text-align': 'right' }}>
							{i.score ? <div>Score: {i.score}</div> : null}
						</span>
					</p>
				))
			) : null}
			{noDataThere ? <p className="cer">No data provided</p> : null}
		</div>
	);
};

export default StatementOrgQuestions;

// return (
// 	<div>
// 		{org.notations ? (
// 			org.notations.filter((x) => x.group === ng).map((i) => (
// 				<p className="cer">
// 					<div className="container">
// 						<div className="row">
// 							<div className="col">
// 								<Link to={i.link}>{cleanName(i.name)} </Link>
// 							</div>

// 							<div className="col">
// 							</div>
// 						</div>
// 					</div>

// 					<span className="logo" />
// 				</p>
// 			))
// 		) : null}
// 	</div>
// );
