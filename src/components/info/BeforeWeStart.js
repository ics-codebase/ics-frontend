import React from 'react';
import { Link } from 'react-router-dom';
import { useStores } from '../../hooks/use-stores';


const BeforeWeStart = (props) => {

	const { userStore } = useStores();

	return (
		<div className="container-fluid before_we_start">
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<h1>Before we start</h1>
						<p className="desc">
							Self-classification involves using available data to assess your fund’s expected or actual
							impact on people, the planet or the economy. These impacts are expressed as impact classes
							which, like financial asset classes, group investments with similar characteristics. Read
							more about the process below.
						</p>
						<div className="steps">
							<p className="step">
								<span className="no">
									<img src="/assets/img/bws1.png" alt="" />
								</span>
								<span className="title">Practice</span>
								Provide detail on the processes and procedures that influence the fund’s expected
								impact.
							</p>
							<p className="step">
								<span className="no">
									<img src="/assets/img/bws2.png" alt="" />
								</span>
								<span className="title">Performance</span>
								Provide detail on the type of data used to understand actual impact.
							</p>
							<p className="step">
								<span className="no">
									<img src="/assets/img/bws3.png" alt="" />
								</span>
								<span className="title">Impact of underlying assets (ABC)</span>
								Assess how the data available helps you understand the types of impact occurring in the
								portfolio.
							</p>
							<p className="step">
								<span className="no">
									<img src="/assets/img/bws4.png" alt="" />
								</span>
								<span className="title">Impact by SDG</span>
								Express how the fund contributes to the SDGs.
							</p>
							<p className="step">
								<span className="no">
									<img src="/assets/img/bws5.png" alt="" />
								</span>
								<span className="title">Investor contribution</span>
								Show the strategies used by the fund to enable impact within the portfolio.
							</p>
							<p className="step">
								<span className="no">
									<img src="/assets/img/bws6.png" alt="" />
								</span>
								<span className="title">Impact className allocation</span>
								Show the portfolio allocation across different impact classes.
							</p>
							<p className="step">
								<span className="no">
									<img src="/assets/img/bws7.png" alt="" />
								</span>
								<span className="title">Ratings and affiliations</span>
								Add information on fund ratings and affiliations with other organisation.
							</p>
						</div>

						<div className="btnright">
							<Link to="/organisation"><span>Start</span></Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BeforeWeStart;
