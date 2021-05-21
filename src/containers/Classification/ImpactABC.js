import React, { Component, useState } from 'react';
import { withRouter } from 'react-router';
import { useHistory, useParams } from 'react-router-dom';
import { FundStore } from '../../store/FundStore';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useStores } from '../../hooks/use-stores';
import ScrollToTop from '../../components/Router/ScrollToTop';
import Infobox from '../../components/UI/Infobox';
import ModalInfo from '../../components/UI/ModalInfo';
import * as QueryString from 'query-string';
import Steps from '../../components/Classify/Steps'

const ImpactABC = (props) => {
	let history = useHistory();
	let { id } = useParams();
	const { fundStore } = useStores();
	var fund = fundStore.funds.find((x) => x._id === id);

	let shouldShowB = false;
	let shouldShowC = false;

	if (fund.impactabc) {
		if (fund.impactabc.doing) {
			var f = fund.impactabc.doing;
			shouldShowB =
				f.includes('act-dataused') ||
				f.includes('act-thirdparty') ||
				f.includes('act-outcomes') ||
				f.includes('act-other')
					? true
					: false;
			shouldShowC =
				f.includes('benefit-dataused') ||
				f.includes('benefit-existing') ||
				f.includes('benefit-outcomes') ||
				f.includes('benefit-other')
					? true
					: false;
		}
	}

	const [ showB, setShowB ] = useState(shouldShowB);
	const [ showC, setShowC ] = useState(shouldShowC);

	function goBack() {
		history.push('/classify/' + id + '/performance');
	}

	if (!fund.impactabc) {
		fund.impactabc = {};
	}

	const handleSubmit = (values) => {
		try {
			const impactabc = {
				doing: values.impactabc,
				act_other: values.act_other,
				benefit_other: values.benefit_other,
				contribute_other: values.contribute_other,
			};

			fund.impactabc = impactabc;
			fundStore.saveFund(fund);
		} catch (err) {
			console.log(err);
		}

		const params = QueryString.parse(props.location.search);
		if (params.review) {
			history.push('/classify/' + id + '/review');
		} else {
			history.push('/classify/' + id + '/impactsdg');
		}
	};

	const validation = Yup.object().shape({});

	return (
		<div>
			<ScrollToTop />
			<div className="container-fluid step1_container">
				<div className="container">
					<div className="row">
						<div className="col-md-12">

							<Steps lineat="impactabc" />

							<h1>Step 3: Impact of underlying assets (ABC)</h1>
							<p className="desc">
								Impacts can be classified as either ‘<b>A</b>ct to avoid harm’, ’<b>B</b>enefit
								stakeholders’ or ‘<b>C</b>ontribute to solutions’. The total impact of an asset – or
								portfolio of assets – is the combination of its impacts on people, the planet and the
								economy. Based on the fund's practices and the performance data available, select the
								options below that best describe how you can classify the impact of the fund's
								underlying assets.
							</p>

							<ModalInfo url="https://james536236.typeform.com/to/MSC48Y" />

							<p className="desc" ><b>[Note: To enable sections B and C, select at least one item from A.]</b></p>

							<Formik
								initialValues={{
									impactabc: fund.impactabc.doing ? fund.impactabc.doing : '',
									act_other: fund.impactabc.act_other ? fund.impactabc.act_other : '',
									benefit_other: fund.impactabc.benefit_other ? fund.impactabc.benefit_other : '',
									contribute_other: fund.impactabc.contribute_other
										? fund.impactabc.contribute_other
										: ''
								}}
								validationSchema={validation}
								onSubmit={(values) => {
									handleSubmit(values);
								}}
							>
								{({ errors, touched, handleChange, setFieldValue }) => ( 
									<Form>
										<div>
											<h3 className="desc3">Act to avoid harm</h3>
											<p className="desc4">
												How do you conclude the fund’s underlying assets{' '}
												<span>mitigate or reduce negative outcomes for people</span>, the planet
												and the economy? Select all that apply.
											</p>
											<div className="checkboxdiv">
												<div className="boxs">
													<label className="container-checkbox">
														<span>
															Rely on due diligence conducted prior to investment
														</span>{' '}
														<Infobox
															key="abc_act_thirparty"
															title="Examples:"
															info="Due diligence prior to investment is used to confirm the underlying asset is likely to act responsibly and avoid causing significant negative outcomes for its stakeholders."
														/>
														<br />
														Conduct a thorough analysis of expected social and environmental impact before investment.
														<Field
															type="checkbox"
															name="impactabc"
															value="act-dd"
															className="showdownifchecked"
															onClick={() => setShowB(true)}
														/>
														<span className="checkmark" />
													</label>
												</div>
												<div className="boxs">
													<label className="container-checkbox">
														<span>Third-party ratings</span>{' '}
														<Infobox
															key="abc_act_thirparty"
															title="Examples:"
															info="MSCI ESG Ratings, Sustainalytics Ratings, Morningstar Sustainability Ratings. Rating used to assess that negative outcomes are being mitigated or reduced."
														/>
														<br />
														We use ratings from third-party data providers to determine
														whether underlying assets are mitigating or reducing negative
														outcomes.
														<Field
															type="checkbox"
															name="impactabc"
															value="act-thirdparty"
															className="showdownifchecked"
															onClick={() => setShowB(true)}
														/>
														<span className="checkmark" />
													</label>
												</div>
												<div className="boxs">
													<label className="container-checkbox">
														<span>Data used as proxies for negative outcomes</span>{' '}
														<Infobox
															key="abc_act_dataused"
															title="Examples"
															info="risk controls (e.g. labour, anti-corruption), number of workplace accidents, exposure to water-intensive operations, revenue exposure to dangerous chemicals. Typically measures of business activity that are connected with negative outcomes. Data suggests that negative outcomes are being mitigated or reduced."
														/>
														<br />
														The data from underlying assets include proxy measures, which
														give some confidence that negative outcomes have been mitigated
														or reduced.
														<Field
															type="checkbox"
															name="impactabc"
															value="act-dataused"
															className="showdownifchecked"
															onClick={() => setShowB(true)}
														/>
														<span className="checkmark" />
													</label>
												</div>
												<div className="boxs">
													<label className="container-checkbox">
														<span>Outcomes data</span>{' '}
														<Infobox
															key="abc_act_outcomes"
															title="Examples:"
															info="tonnes CO2 equivalent emissions, tonnes of waste to landfill. Specific outcomes are directly measured and data shows evidence of mitigation or reduction of negative outcomes."
														/>
														<br />
														Our underlying assets report data that directly measures
														negative outcomes they are mitigating or reducing.
														<Field
															type="checkbox"
															name="impactabc"
															value="act-outcomes"
															className="showdownifchecked"
															onClick={() => setShowB(true)}
														/>
														<span className="checkmark" />
													</label>
												</div>
												<div className="boxs lablechecked">
													<label className="container-checkbox">
														Other
														<Field
															name="impactabc"
															value="act-other"
															type="checkbox"
															className="showdownifchecked"
															onClick={() => {
																setShowB(true);
																setFieldValue('act_other', '')
															}}
														/>
														<span className="checkmark" />
													</label>
													<div className="ifyesdiv">
														<div className="">
															<p className="pofinput">Please specify 'Other':</p>
															<Field type="text" name="act_other" maxlength="320" />
															<ErrorMessage name="other" />
														</div>
													</div>
												</div>
											</div>
										</div>

										<div style={showB ? null : { display: 'none' }}>
											<h3 className="desc3">Benefits stakeholders</h3>
											<p className="desc4">
												How do you conclude which of the fund’s underlying assets{' '}
												<span>generate positive outcomes for people</span>, the planet or the
												economy? Select all that apply.
											</p>
											<div className="checkboxdiv">
												<div className="boxs">
													<label className="container-checkbox">
														<span>
															Rely on due diligence conducted prior to investment
														</span>{' '}
														<Infobox
															key="abc_ben_dd"
															title=""
															info="Due diligence prior to investment is used to confirm the underlying asset is likely to generate positive outcomes for its stakeholders."
														/>
														<br />
														Conduct a thorough analysis of expected social and environmental impact before investment.
														<Field
															type="checkbox"
															name="impactabc"
															value="benefit-dd"
															className="showdownifchecked"
															onClick={() => setShowC(true)}
														/>
														<span className="checkmark" />
													</label>
												</div>

												<div className="boxs">
													<label className="container-checkbox">
														<span>Existing research</span>{' '}
														<Infobox
															key="abc_ben_existing"
															title="Examples:"
															info="research from government, civil society, industry bodies or other research agencies that show a connection between activities of particular sectors, or sub-sectors, and positive outcomes."
														/>
														<br />
														We use existing research to understand if the sectors
														represented in the portfolio are likely to generate positive
														outcomes.
														<Field
															type="checkbox"
															name="impactabc"
															value="benefit-existing"
															className="showdownifchecked"
															onClick={() => setShowC(true)}
														/>
														<span className="checkmark" />
													</label>
												</div>
												<div className="boxs">
													<label className="container-checkbox">
														<span>Data used as proxies for positive outcomes</span>{' '}
														<Infobox
															key="abc_ben_dataused"
															title="Examples:"
															info="percentage revenue from specific products or services expected to generate positive outcomes, R&D spend on development of sustainable products or services, number of customers served. Typically measures of business activity that are connected with positive outcomes. Data suggests that positive outcomes are being generated."
														/>
														<br />
														The data from underlying assets include proxy measures, which
														give some confidence that positive outcomes have occurred.
														<Field
															type="checkbox"
															name="impactabc"
															value="benefit-dataused"
															className="showdownifchecked"
															onClick={() => setShowC(true)}
														/>
														<span className="checkmark" />
													</label>
												</div>
												<div className="boxs">
													<label className="container-checkbox">
														<span>Outcome data</span>{' '}
														<Infobox
															key="abc_ben_outcome"
															title="Examples:"
															info="level of educational attainment, feeling of safety at work, Body Mass Index. Specific outcomes are directly measured and data shows evidence of generating positive outcomes."
														/>
														<br />
														Our underlying assets report data that directly measures
														positive outcomes being generated.
														<Field
															type="checkbox"
															name="impactabc"
															value="benefit-outcome"
															className="showdownifchecked"
															onClick={() => setShowC(true)}
														/>
														<span className="checkmark" />
													</label>
												</div>
												<div className="boxs lablechecked">
													<label className="container-checkbox">
														Other
														<Field
															type="checkbox"
															className="showdownifchecked"
															name="impactabc"
															value="benefit-other"
															onClick={() => {
																setShowC(true)
																setFieldValue('benefit_other', '')															
															}}
														/>
														<span className="checkmark" />
													</label>
													<div className="ifyesdiv">
														<div className="">
															<p className="pofinput">Please specify 'Other':</p>
															<Field type="text" name="benefit_other" maxlength="320" />
														</div>
													</div>
												</div>
											</div>
										</div>

										<div style={showB ? null : { display: 'none' }}>
											<h3 className="desc3">Contribute to solutions</h3>
											<p className="desc4">
												How do you conclude which of the fund’s underlying assets{' '}
												<span>generate positive change</span> for people, the planet or the
												economy that would{' '}
												<span>
													otherwise experience an outcome below the nationally or locally
													acceptable level?
												</span>{' '}
												Select all that apply.
											</p>
											<div className="checkboxdiv">
												<div className="boxs">
													<label className="container-checkbox">
														<span>Existing research</span>{' '}
														<Infobox
															key="abc_con_existing"
															title="Examples:"
															info="research from government, civil society, industry bodies or other research agencies that show a connection between activities of particular sectors, or sub-sectors, and positive outcomes."
															secondtitle="Examples to estimate the experience of those affected:"
															secondinfo="use of national statistics on income as a proxy for experiencing some other outcome below the acceptable level (e.g. access to decent housing); country level research on land, water or air degradation. The data suggests those affected would otherwise experience the outcome below nationally or locally acceptable levels."
														/>
														<br />
														We use existing research to understand if the sectors
														represented in the portfolio are likely to generate positive
														outcomes. We also collect data on whether the stakeholders
														affected would have experienced the outcomes below nationally or
														locally acceptable levels in absence of an asset's activities.
														<Field
															type="checkbox"
															name="impactabc"
															value="contribute-existing"
															className="showdownifchecked"
														/>
														<span className="checkmark" />
													</label>
												</div>
												<div className="boxs">
													<label className="container-checkbox">
														<span>Data used as proxies for positive outcomes</span>{' '}
														<Infobox
															key="abc_con_dataused"
															title="Examples:"
															info="percentage revenue from specific products or services expected to generate positive outcomes, R&D spend on development of sustainable products or services, number of customers served. Typically measures of business activity that are connected with positive outcomes. Data suggests that positive outcomes are being generated."
															secondtitle="Examples to estimate the experience of those affected:"
															secondinfo="use of national statistics on income as a proxy for experiencing some other outcome below the acceptable level (e.g. access to decent housing); country level research on land, water or air degradation. The data suggests those affected would otherwise experience the outcome below nationally or locally acceptable levels."
														/>
														<br />
														The data from underlying assets include proxy measures, which
														give some confidence that positive outcomes have occurred. We
														also collect data on whether the stakeholders affected would
														have experienced the outcomes below nationally or locally
														acceptable levels in absence of an asset's activities.
														<Field
															type="checkbox"
															name="impactabc"
															value="contribute-dataused"
															className="showdownifchecked"
														/>
														<span className="checkmark" />
													</label>
												</div>
												<div className="boxs">
													<label className="container-checkbox">
														<span>Outcome data</span>{' '}
														<Infobox
															key="abc_con_outcome"
															title="Examples"
															info="level of educational attainment, feeling of safety at work, Body Mass Index. Specific outcomes are measured and data shows evidence of generating positive outcomes."
															secondtitle="Examples to estimate the experience of those affecteds:"
															secondinfo="local statistics or data collected directly from those affected; research on land, water or air degradation in the areas affected. Comparison against the nationally or locally acceptable level for the outcome shows that those affected would be otherwise underserved (i.e. would otherwise experience the outcome below an acceptable level)."
														/>
														<br />
														Our underlying assets report data that directly measures
														positive outcomes being generated. We also collect data on
														whether the stakeholders affected would have experienced the
														outcomes below nationally or locally acceptable levels in
														absence of an asset's activities.
														<Field
															type="checkbox"
															name="impactabc"
															className="showdownifchecked"
															value="contribute-outcome"
														/>
														<span className="checkmark" />
													</label>
												</div>
												<div className="boxs lablechecked">
													<label className="container-checkbox">
														Other
														<Field
															type="checkbox"
															className="showdownifchecked"
															name="impactabc"
															value="contribute-other"
															onClick={() => {
																setFieldValue('contribute_other', '')															
															}}															
														/>
														<span className="checkmark" />
													</label>
													<div className="ifyesdiv">
														<div className="">
															<p className="pofinput">Please specify 'Other':</p>
															<Field type="text" name="contribute_other" maxlength="320"/>
														</div>
													</div>
												</div>
											</div>
										</div>


										<div className="buttonsbtn">
											<div className="row">
												<div className="col-6 leftside">
													<button onClick={goBack}>
														<span>Back</span>
													</button>
												</div>
												<div className="col-6 rightside">
													<button type="submit">
														<span>Save and Continue</span>
													</button>
												</div>
											</div>
										</div>
									</Form>
								)}
							</Formik>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(ImpactABC);
