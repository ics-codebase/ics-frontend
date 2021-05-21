import React from 'react';

const StatementCheck = (props) => {
	const qp = props.questionpath;
	const fund = props.fund;

	
	return (
		<div>
			<div className="ppfororange">
				<div className="orangedivcb whitevcb">
					{fund.questions.filter((x) => x.questionpath === qp).map((i) => (
						<div>
							<div className="box">
								<p className="tit checkaded" dangerouslySetInnerHTML={{ __html: i.answer }} />
							</div>
							{i.subanswers ? (
								<div className="box">
									{i.subanswers.sort().map((a) => (
										<div className="col-md-6" key={a}>
											<p>· {a}</p>
										</div>
									))}
									{qp === 'practice/partofpractice' && fund.practice_exclusions_other ? (
										<div className="col-md-6">
											<p className="tit">. Other: {fund.practice_exclusions_other}</p>
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

export default StatementCheck;

// <div className="box">
// <p className="tit checkaded">
//     <span>Excludes</span> underlying assets/enterprises that cause known harm to
//     people or the planet
// </p>
// <div className="row paddingleft">
//     <div className="col-md-6">
//         <p>· Adult entertainment</p>
//         <p>· Arms production</p>
//         <p>· Arms trade</p>
//         <p>· Alcohol production</p>
//     </div>
//     <div className="col-md-6">
//         <p>· Human rights abuses</p>
//         <p>· Labour standards abuses</p>
//         <p>· Tobacco production</p>
//         <p>· Other: Condimentum ipsum ullamcorper</p>
//     </div>
// </div>
// </div>
