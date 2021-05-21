import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { useHistory, useParams } from 'react-router-dom';
import { FundStore } from '../../store/FundStore';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import SDGRow from '../../components/Classify/SDGRow';
import SDGGrid from '../../components/Classify/SDGRow';
import ScrollToTop from '../../components/Router/ScrollToTop';
import Infobox from '../../components/UI/Infobox';
import ModalInfo from '../../components/UI/ModalInfo'

import * as Yup from 'yup';
import { useStores } from '../../hooks/use-stores';
import * as QueryString from "query-string"
import Steps from '../../components/Classify/Steps';
import ModalWarning from '../../components/UI/ModalWarning';


const ImpactSDG = (props) => {
	let history = useHistory();
	let { id } = useParams();
	const { fundStore } = useStores();
	var fund = fundStore.funds.find((x) => x._id === id);

	if (!fund.impactsdg) {
		fund.impactsdg = {}; 
	}

	if (!fund.impactsdg.focusareas) {
		fund.impactsdg.focusareas = {};
	}

	const handleSubmit = (values) => {
		try {
			if (!fund.impactsdg) {
				fund.impactsdg = {};
			}

			fund.impactsdg.focusareas = {
				primary: values.primary,
				secondary: values.secondary,
				tertiary: values.tertiary
			};

			fundStore.saveFund(fund);
		} catch (err) {
			console.log(err);
		}

		const params = QueryString.parse(props.location.search);
		if (params.review){
			history.push('/classify/' + id + '/review');
		}
		else
		{
			history.push('/classify/' + id + '/investor');
		}
	};

	const validation = Yup.object().shape({});

	function goBack() {
		history.push('/classify/' + id + '/impactabc');
	}


	let disableColumnA = false;
	let disableColumnB = false;
	let disableColumnC = false;

	if (fund.impactabc.doing) {
		disableColumnA = fund.impactabc.doing.findIndex((element) => element.includes('act-')) > -1 ? false : true;
		disableColumnB = fund.impactabc.doing.findIndex((element) => element.includes('benefit-')) > -1 ? false : true;
		disableColumnC =
			fund.impactabc.doing.findIndex((element) => element.includes('contribute-')) > -1 ? false : true;
	}



	return (
		<div>
			<ScrollToTop />

			<ModalWarning
                title="Selecting the Categories"
                message="The next step involves expressing impact according to the SDGs. <br/></br> In this step, only select <b>Contribute to solutions</b> if you assess that the portfolio is generating positive outcomes associated with the SDG, <u>and</u> these outcomes are being generated for people and/or the planet that would not otherwise experience them. In other words, you assess the portfolio is generating new positive outcomes that would not otherwise occur. <br/><br/> For more help on this step, select ‘Before you answer, learn more’ at the top of the page."
                buttontext="Understood"
                show="true"
            />

			<div className="container-fluid step1_container">
				<div className="container">
					<div className="row">
						<div className="col-md-12">

						<Steps lineat="impactsdg" />

							<h1>Step 4: Impact of underlying assets by SDG </h1>
							<p className="desc">
								Next, set underlying asset impact by SDG – move each SDG into the area that best
								describes the impact of the fund’s underlying assets by using the left and right arrows
								or dragging and dropping. If classifying based on expected performance then move the
								SDGs into the area that best describe the goals of the fund.
							</p>

							<ModalInfo url="https://james536236.typeform.com/to/aLYz5z" />


							<div className="ctable">
								<div className="minwidthoftable">
									<div className="sections">
										<div className="leftarrowsrow">
											<div className="forborder" />
											<div className="leftrightslider">
												{/* <p>Floating help:</p>
												<label className="toggle">
													<input type="checkbox" className="floatinghelpc" />
													<div className="slide-toggle" />
													<div className="onoff" />
												</label> */}
											</div>
										</div>
										<div class="harmrow">
											<div class="forborder" style={{}} />
											<p>NOT APPLICABLE<br/>
											<Infobox
														title=""
														info="This means you assess that the fund’s underlying assets <span>do not significantly affect outcomes associated with this SDG.</span>"
													/>											
											</p>
										</div>
										<div class="impactrow">
											<div class="forborder" />
											<div class="tit">
												<p>
													MAY CAUSE HARM <br />
													<Infobox
														title=""
														info="This means the fund's underlying assets are known to be <span>negatively affecting outcomes associated with this SDG</span>, or there is insufficient information to make an assessment."
													/>
												</p>
											</div>
										</div>
										<div class="first">
											<p>
												ACT TO AVOID HARM <br />
													<Infobox
														title=""
														info="This means you assess that the fund’s underlying assets <span>actively mitigate or reduce negative outcomes associated with this SDG</span>."
													/>
											</p>
										</div>
										<div class="nth2">
											<div class="tit">
												<p>
													BENEFIT STAKEHOLDERS <br />
													<Infobox
														title=""
														info="This means you assess that the fund’s <span>underlying assets actively mitigate or reduce negative outcomes</span> AND <span>generate some positive outcomes associated with this SDG</span>."
													/>
												</p>
											</div>
										</div>
										<div class="nth3">
											<div class="tit">
												<p>
													CONTRIBUTE TO SOLUTIONS <br />
													<Infobox
														title=""
														info="This means you assess that the fund’s underlying assets <span>actively mitigate or reduce negative outcomes</span> AND some <span>generate substantial positive change in outcomes for people otherwise underserved with respect to this SDG</span>."
													/>
												</p>
											</div>
										</div>
										<div className="rightarrowrow">
											<div className="forborder" />
										</div>
									</div>

									<SDGGrid sdg="1" fund={fund} disableA={disableColumnA} disableB={disableColumnB} disableC={disableColumnC}  />
									<SDGGrid sdg="2" fund={fund} disableA={disableColumnA} disableB={disableColumnB} disableC={disableColumnC} />
									<SDGGrid sdg="3" fund={fund} disableA={disableColumnA} disableB={disableColumnB} disableC={disableColumnC} />
									<SDGGrid sdg="4" fund={fund} disableA={disableColumnA} disableB={disableColumnB} disableC={disableColumnC} />
									<SDGGrid sdg="5" fund={fund} disableA={disableColumnA} disableB={disableColumnB} disableC={disableColumnC} />
									<SDGGrid sdg="6" fund={fund} disableA={disableColumnA} disableB={disableColumnB} disableC={disableColumnC} />
									<SDGGrid sdg="7" fund={fund} disableA={disableColumnA} disableB={disableColumnB} disableC={disableColumnC} />
									<SDGGrid sdg="8" fund={fund} disableA={disableColumnA} disableB={disableColumnB} disableC={disableColumnC} />
									<SDGGrid sdg="9" fund={fund} disableA={disableColumnA} disableB={disableColumnB} disableC={disableColumnC} />
									<SDGGrid sdg="10" fund={fund} disableA={disableColumnA} disableB={disableColumnB} disableC={disableColumnC} />
									<SDGGrid sdg="11" fund={fund} disableA={disableColumnA} disableB={disableColumnB} disableC={disableColumnC} />
									<SDGGrid sdg="12" fund={fund} disableA={disableColumnA} disableB={disableColumnB} disableC={disableColumnC} />
									<SDGGrid sdg="13" fund={fund} disableA={disableColumnA} disableB={disableColumnB} disableC={disableColumnC} />
									<SDGGrid sdg="14" fund={fund} disableA={disableColumnA} disableB={disableColumnB} disableC={disableColumnC} />
									<SDGGrid sdg="15" fund={fund} disableA={disableColumnA} disableB={disableColumnB} disableC={disableColumnC} />
									<SDGGrid sdg="16" fund={fund} disableA={disableColumnA} disableB={disableColumnB} disableC={disableColumnC} />
									<SDGGrid sdg="17" fund={fund} disableA={disableColumnA} disableB={disableColumnB} disableC={disableColumnC} />
								</div>

								<div className="manage_organisation_information">
									<Formik
										initialValues={{
											primary: fund.impactsdg.focusareas.primary
												? fund.impactsdg.focusareas.primary
												: '',
											secondary: fund.impactsdg.focusareas.secondary
												? fund.impactsdg.focusareas.secondary
												: '',
											tertiary: fund.impactsdg.focusareas.tertiary
												? fund.impactsdg.focusareas.tertiary
												: ''
										}}
										validationSchema={validation}
										onSubmit={(values) => {
											handleSubmit(values);
										}}
									>
										{({ errors, touched, handleChange }) => (
											<Form>
												<div className="buttonsbtn">
													<div className="row" />
												</div>

												<div className="max-width-dd">
													If applicable to your fund, express up to three main impact areas
													<i> (optional) :</i> <br />
													<br />
													<p className="pofinput">Primary Impact Area</p>
													<Field as="select" name="primary">
														<option value="none">None</option>
														<option value="1">SDG1 - No Poverty</option>
														<option value="2">SDG2 - Zero Hunger</option>
														<option value="3">SDG3 - Good Health and Well-Being</option>
														<option value="4">SDG4 - Quality Education</option>
														<option value="5">SDG5 - Gender Equality</option>
														<option value="6">SDG6 - Clean Water and Sanitation</option>
														<option value="7">SDG7 - Affordable and Clean Energy</option>
														<option value="8">
															SDG8 - Decent Work and Economic Growth
														</option>
														<option value="9">
															SDG9 - Industry, Innovation and Infrastructure
														</option>
														<option value="10">SDG10 - Reduced Inequalities</option>
														<option value="11">SDG11 - Sustainable Cities</option>
														<option value="12">
															SDG12 - Responsible Consumption and Production
														</option>
														<option value="13">SDG13 - Climate Action</option>
														<option value="14">SDG14 - Life Below Water</option>
														<option value="15">SDG15 - Life on Land</option>
														<option value="16">
															SDG16 - Peace, Justice and Strong Institutions
														</option>
														<option value="17">SDG17 - Partnerships for the Goals</option>
													</Field>
													<p className="pofinput">Secondary Impact Area</p>
													<Field as="select" name="secondary">
														<option value="none">None</option>
														<option value="1">SDG1 - No Poverty</option>
														<option value="2">SDG2 - Zero Hunger</option>
														<option value="3">SDG3 - Good Health and Well-Being</option>
														<option value="4">SDG4 - Quality Education</option>
														<option value="5">SDG5 - Gender Equality</option>
														<option value="6">SDG6 - Clean Water and Sanitation</option>
														<option value="7">SDG7 - Affordable and Clean Energy</option>
														<option value="8">
															SDG8 - Decent Work and Economic Growth
														</option>
														<option value="9">
															SDG9 - Industry, Innovation and Infrastructure
														</option>
														<option value="10">SDG10 - Reduced Inequalities</option>
														<option value="11">SDG11 - Sustainable Cities</option>
														<option value="12">
															SDG12 - Responsible Consumption and Production
														</option>
														<option value="13">SDG13 - Climate Action</option>
														<option value="14">SDG14 - Life Below Water</option>
														<option value="15">SDG15 - Life on Land</option>
														<option value="16">
															SDG16 - Peace, Justice and Strong Institutions
														</option>
														<option value="17">SDG17 - Partnerships for the Goals</option>
													</Field>
													<p className="pofinput">Tertiary Impact Area</p>
													<Field as="select" name="tertiary">
														<option value="none">None</option>
														<option value="1">SDG1 - No Poverty</option>
														<option value="2">SDG2 - Zero Hunger</option>
														<option value="3">SDG3 - Good Health and Well-Being</option>
														<option value="4">SDG4 - Quality Education</option>
														<option value="5">SDG5 - Gender Equality</option>
														<option value="6">SDG6 - Clean Water and Sanitation</option>
														<option value="7">SDG7 - Affordable and Clean Energy</option>
														<option value="8">
															SDG8 - Decent Work and Economic Growth
														</option>
														<option value="9">
															SDG9 - Industry, Innovation and Infrastructure
														</option>
														<option value="10">SDG10 - Reduced Inequalities</option>
														<option value="11">SDG11 - Sustainable Cities</option>
														<option value="12">
															SDG12 - Responsible Consumption and Production
														</option>
														<option value="13">SDG13 - Climate Action</option>
														<option value="14">SDG14 - Life Below Water</option>
														<option value="15">SDG15 - Life on Land</option>
														<option value="16">
															SDG16 - Peace, Justice and Strong Institutions
														</option>
														<option value="17">SDG17 - Partnerships for the Goals</option>
													</Field>
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
						</div>{' '}
					</div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(ImpactSDG);
