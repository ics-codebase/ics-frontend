import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { useHistory, useParams } from 'react-router-dom';
import DetailsQuestion from '../../components/Classify/DetailsQuestion';
import { useStores } from '../../hooks/use-stores';
import ScrollToTop from '../../components/Router/ScrollToTop';
import ModalInfo from '../../components/UI/ModalInfo';
import * as QueryString from "query-string"
import Steps from '../../components/Classify/Steps';

const Performance = (props) => {
	let history = useHistory();
	let { id } = useParams();
	const { fundStore } = useStores();
	const fund = fundStore.funds.find((x) => x._id === id);

	function saveAndContinue() {

		const params = QueryString.parse(props.location.search);
		if (params.review){
			history.push('/classify/' + id + '/review');
		}
		else
		{
			history.push('/classify/' + id + '/review');
		}

	}

	function goBack() {
		history.push('/classify/' + id + '/allocation');
	}

	return (
		<div>
			<ScrollToTop />
			<div className="container-fluid step1_container">
				<div className="container">
					<div className="row">
						<div className="col-md-12">


<Steps lineat="rating"/>

							<h1>Step 7: Ratings and affiliations</h1>
							<p className="desc">
								Please provide supplementary information on any affiliations or fund ratings.
							</p>

							<ModalInfo url="https://james536236.typeform.com/to/AtrFcC" />

							<DetailsQuestion
								fundid={id}
								thefund={fund}
								questionpath="ratings/affiliated"
								title="Is the fund affiliated with any other organisations?"
								notitle="No, it isnt"
								yestitle="Yes, it is"
								detailtitle="DETAILS"
								questions={[
									{ id: 'avpa', answer: 'African Venture Philanthropy Alliance (AVPA)', score: false, link: false, other: false },
									{ id: 'avpn', answer: 'Asian Venture Philanthropy Network (AVPN)', score: false, link: false, other: false },
									{ id: 'evpa', answer: 'European Venture Philanthropy Association (EVPA)', score: false, link: false, other: false },
									{ id: 'savca', answer: 'Southern African Venture Capital and Private Equity Association (SAVCA)', score: false, link: false, other: false },
									{ id: 'icm', answer: 'Impact Capital Managers', score: false, link: false, other: false },
									{ id: 'ia50', answer: 'Impact Assets 50', score: false, link: false, other: false },
									{ id: 'poi', answer: 'Proof of Impact', score: false, link: false, other: false },
									{ id: 'svc', answer: 'Social Venture Circle', score: false, link: false, other: false },
									{ id: 'toniic', answer: 'Toniic Tracer', score: false, link: false, other: false },
									{ id: 'other', answer: 'Other', score: false, link: false, other: true },

								]}
							/>

							<DetailsQuestion
								fundid={id}
								thefund={fund}
								questionpath="ratings/providers"
								title="Is the fund rated by any ratings providers?"
								notitle="No, they are not"
								yestitle="Yes, they are"
								detailtitle="DETAILS"
								questions={[
									{ id: 'climetrics', answer: 'Climetrics', score: true, link: true },
									{ id: 'msci', answer: 'MSCI ESG Fund Ratings', score: true, link: true },
									{
										id: 'morningstar',
										answer: 'Morningstar Sustainability Rating',
										score: true,
										link: true
									},
									{ id: 'grfusc', answer: 'GRESB Fund Score', score: true, link: true },
									{ id: 'meesra', answer: 'Mercer ESG Rating', score: true, link: true },
									{ id: '3dstra', answer: '3D Star Rating', score: true, link: true },
									{ id: 'imsc', answer: 'Impak Score', score: true, link: true },
									{ id: 'util', answer: 'Util', score: true, link: true },
									{ id: 'other', answer: 'Other', score: false, link: false, other: true },
								]}
							/>

							<div className="buttonsbtn">
								<div className="row">
									<div className="col-6 leftside">
										<button onClick={goBack}>
											<span>Back</span>
										</button>
									</div>
									<div className="col-6 rightside">
										<button onClick={saveAndContinue}>
											<span>Save and Continue</span>
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(Performance);
