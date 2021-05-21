import React, { useEffect, Component } from 'react';
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
			history.push('/classify/' + id + '/impactabc');
		}


	}

	function goBack() {
		history.push('/classify/' + id + '/practice');
	}

	return (
		<div>
			<ScrollToTop />
			<div className="container-fluid step1_container">
				<div className="container">
					<div className="row">
						<div className="col-md-12">

							<Steps lineat="performance" />

							<h1>Step 2: Performance</h1>
							<p className="desc">
								Please provide details below on the types of performance data you collect. In the next
								section, you can show how this data is used to assess the fund’s impacts on people, the
								planet and the economy.
							</p>

							<ModalInfo url="https://james536236.typeform.com/to/nWJpxb" />
							

							<DetailsQuestion
								fundid={id}
								thefund={fund}
								questionpath="performance/performancesource"
								title="Does the fund use any third-party sources of social and environmental performance data?"
								notitle="No, it does not"
								yestitle="Yes, it does"
								detailtitle=""
								questions={[
									{ id: '2deg', answer: '2° Investing Initiative', score: false, link: false },
									{ id: 'dec', answer: '60 Decibels', score: false, link: false },
									{ id: 'arsr', answer: 'Arabesque S-Ray', score: false, link: false },
									{ id: 'bles', answer: 'Bloomberg ESG', score: false, link: false },
									{ id: 'blab', answer: 'B Lab', score: false, link: false },
									{ id: 'cgl', answer: 'CGLytics', score: false, link: false },
									{ id: 'cdpc', answer: 'CDP Climate Score', score: false, link: false },
									{ id: 'cpdw', answer: 'CDP Water Score', score: false, link: false },
									{ id: 'cpdf', answer: 'CDP Forest Score', score: false, link: false },
									{ id: 'cokn', answer: 'Corporate Knights', score: false, link: false },
									{ id: 'csrhu', answer: 'CSRHub', score: false, link: false },
									{ id: 'entel', answer: 'Entelligent', score: false, link: false },
									{ id: 'gresb', answer: 'GRESB', score: false, link: false },
									{ id: 'idealr', answer: 'IdealRatings', score: false, link: false },
									{ id: 'imlab', answer: 'Impact Lab (Business Call to Action, UNDP)', score: false, link: false },
									{ id: 'impac', answer: 'Impak Finance', score: false, link: false },
									{ id: 'iss', answer: 'ISS', score: false, link: false },
									{ id: 'mses', answer: 'MSCI ESG', score: false, link: false },
									{ id: 'ftse', answer: 'FTSE', score: false, link: false },
									{ id: 'owan', answer: 'Owl Analytics', score: false, link: false },
									{ id: 'rein', answer: 'Refinitiv', score: false, link: false },
									{ id: 'reri', answer: 'RepRisk', score: false, link: false },
									{ id: 'rosa', answer: 'RobecoSAM', score: false, link: false },
									{ id: 'sefo', answer: 'Sense Folio', score: false, link: false },
									{ id: 'siwa', answer: 'SigWatch', score: false, link: false },
									{ id: 'suan', answer: 'Sustainalytics', score: false, link: false },
									{ id: 'truco', answer: 'Trucost', score: false, link: false },
									{ id: 'truval', answer: 'TruValue Labs', score: false, link: false },
									{ id: 'util', answer: 'Util', score: false, link: false },
									{ id: 'vig', answer: 'Vigeo Eiris', score: false, link: false },
									{ id: 'other', answer: 'Other', score: false, link: false, other: true },
								]}
							/>

							<DetailsQuestion
								fundid={id}
								thefund={fund}
								questionpath="performance/regulardisclosures"
								title="Does the fund regularly obtain data against any particular disclosures or metrics from underlying assets?"
								notitle="No, it does not"
								yestitle="Yes, it does"
								detailtitle=""
								questions={[
									{ id: 'carbon', answer: 'CDP - formerly Carbon Disclosure Project', score: false, link: false },
									{ id: 'clim', answer: 'Climate Disclosure Standards Board (CDSB)', score: false, link: false },
									{ id: 'gri', answer: 'Global Reporting Initiative', score: false, link: false },
									{ id: 'tfcd', answer: 'TCFD Recommended Disclosures', score: false, link: false },									
									{ id: 'iirc', answer: 'International Integrated Reporting Council (IIRC)', score: false, link: false },
									{ id: 'iris', answer: 'IRIS+ Core Metric Sets', score: false, link: false },
									{
										id: 'sasb',
										answer: 'SASB - Sustainability Accounting Standards Board',
										score: false,
										link: false
									},
									{ id: 'bimp', answer: 'B Impact Assessment', score: false, link: false },
									{
										id: 'hipso',
										answer: 'HIPSO - Harmonized Indicators for Private Sector Operations',
										score: false,
										link: false
									},
									{
										id: 'bespoke',
										answer: 'Bespoke metrics from underlying assets',
										score: false,
										link: false
									},
									{ id: 'pacta', answer: 'PACTA', score: false, link: false },
									{ id: 'other', answer: 'Other', score: false, link: false, other: true },

								]}
						/>

							<DetailsQuestion
								fundid={id}
								thefund={fund}
								questionpath="performance/auditperformance"
								title="Does the fund assure its social and environmental performance data?"
								notitle="No, it does not"
								yestitle="Yes, it does"
								detailtitle="DETAILS"
								questions={[
									{ id: 'blu', answer: 'BlueMark, a Tideline company', link: true },
									{ id: 'pwc', answer: 'PricewaterhouseCoopers', link: true },
									{ id: 'erns', answer: 'Ernst and Young', link: true },
									{ id: 'delo', answer: 'Deloitte', link: true },
									{ id: 'kpmg', answer: 'KPMG', link: true },
									{ id: 'int', answer: 'Internal assurance', link: false },
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
