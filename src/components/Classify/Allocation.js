import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { useHistory, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ScrollToTop from '../Router/ScrollToTop';
import { FundStore } from '../../store/FundStore';
import { useStores } from '../../hooks/use-stores';
import Infobox from '../../components/UI/Infobox';
import * as QueryString from 'query-string';

const AllocationTotal = (props) => {
	return (
		<div>
			<br />
			<p className="">Total so far: {props.total}</p>
		</div>
	);
};

const AllocationError = () => {
	return (
		<div>
			<br />
			<p className="redmsg">
				Your total percentage needs to be below or equal 100%. Please check your entries and try again.
			</p>
		</div>
	);
};

const Allocation = observer((props) => {
	var fund = props.fund;
	let history = useHistory();
	let { id } = useParams();
	const { fundStore } = useStores();
	const [ showAllocationError, setShowAllocationError ] = useState(false);

	var init = {};
	if (fund.allocation) init = fund.allocation;

	const handleSubmit = (values) => {
		let total = 0;

		for (let key in values) {
			let value = values[key];

			if (!value) value = 0

			total += value;
		}



		if (total < 101) {
			try {
				fund.allocation = values;
				console.log('saving')

				props.save();
			} catch (err) {
				console.log(err);
			}
		} else {
			setShowAllocationError(true);
		}
	};

	const validation = Yup.object().shape(
		{
			// c1h: Yup.number().min(0, 'Too low').max(100, 'Too high'),
			// c2h: Yup.number().min(0, 'Too low').max(100, 'Too high'),
			// c3h: Yup.number().min(0, 'Too low').max(100, 'Too high'),
			// c4h: Yup.number().min(0, 'Too low').max(100, 'Too high'),
			// c5h: Yup.number().min(0, 'Too low').max(100, 'Too high'),
			// c6h: Yup.number().min(0, 'Too low').max(100, 'Too high'),
			// c7h: Yup.number().min(0, 'Too low').max(100, 'Too high'),
			// c1a: Yup.number().min(0, 'Too low').max(100, 'Too high'),
			// c2a: Yup.number().min(0, 'Too low').max(100, 'Too high'),
			// c3a: Yup.number().min(0, 'Too low').max(100, 'Too high'),
			// c4a: Yup.number().min(0, 'Too low').max(100, 'Too high'),
			// c5a: Yup.number().min(0, 'Too low').max(100, 'Too high'),
			// c6a: Yup.number().min(0, 'Too low').max(100, 'Too high'),
			// c7a: Yup.number().min(0, 'Too low').max(100, 'Too high'),
			// c1b: Yup.number().min(0, 'Too low').max(100, 'Too high'),
			// c2b: Yup.number().min(0, 'Too low').max(100, 'Too high'),
			// c3b: Yup.number().min(0, 'Too low').max(100, 'Too high'),
			// c4b: Yup.number().min(0, 'Too low').max(100, 'Too high'),
			// c5b: Yup.number().min(0, 'Too low').max(100, 'Too high'),
			// c6b: Yup.number().min(0, 'Too low').max(100, 'Too high'),
			// c7b: Yup.number().min(0, 'Too low').max(100, 'Too high'),
			// c1c: Yup.number().min(0, 'Too low').max(100, 'Too high'),
			// c2c: Yup.number().min(0, 'Too low').max(100, 'Too high'),
			// c3c: Yup.number().min(0, 'Too low').max(100, 'Too high'),
			// c4c: Yup.number().min(0, 'Too low').max(100, 'Too high'),
			// c5c: Yup.number().min(0, 'Too low').max(100, 'Too high'),
			// c6c: Yup.number().min(0, 'Too low').max(100, 'Too high'),
			// c7c: Yup.number().min(0, 'Too low').max(100, 'Too high')
		}
	);

	function goBack() {
		history.push('/classify/' + id + '/investor');
	}

	//fund.impactabc.doing ?	console.log(fund.impactabc.doing.findIndex((element) => element.includes('benefit-'))) : null

	const signal = fund.investor.includes('impactmatterssignal');
	const engage = fund.investor.includes('engage');
	const grow = fund.investor.includes('grow');
	const flex = fund.investor.includes('flexibility');

	const disableRow1 = !signal;
	const disableRow2 = !(signal && engage);
	const disableRow3 = !(signal && grow);
	const disableRow4 = !(signal && engage && grow);
	const disableRow5 = !(signal && grow && flex);
	const disableRow6 = !(signal && engage && grow && flex);

	let disableColumnA = false;
	let disableColumnB = false;
	let disableColumnC = false;

	//disable columns
	if (fund.impactabc.doing) {
		disableColumnA = fund.impactabc.doing.findIndex((element) => element.includes('act-')) > -1 ? false : true;
		disableColumnB = fund.impactabc.doing.findIndex((element) => element.includes('benefit-')) > -1 ? false : true;
		disableColumnC =
			fund.impactabc.doing.findIndex((element) => element.includes('contribute-')) > -1 ? false : true;
	}

	if (fund.allocation) {
		if (disableColumnA) {
			//delete data
			fund.allocation.c1a = 0;
			fund.allocation.c2a = 0;
			fund.allocation.c3a = 0;
			fund.allocation.c4a = 0;
			fund.allocation.c5a = 0;
			fund.allocation.c6a = 0;
		}

		if (disableColumnB) {
			//delete data
			fund.allocation.c1b = 0;
			fund.allocation.c2b = 0;
			fund.allocation.c3b = 0;
			fund.allocation.c4b = 0;
			fund.allocation.c5b = 0;
			fund.allocation.c6b = 0;
		}

		if (disableColumnC) {
			//delete data
			fund.allocation.c1c = 0;
			fund.allocation.c2c = 0;
			fund.allocation.c3c = 0;
			fund.allocation.c4c = 0;
			fund.allocation.c5c = 0;
			fund.allocation.c6c = 0;
		}
	}

	// function handleChange(e) {
	// 	console.log('fired')
	// };


	return (
		<div>
			<Formik
				initialValues={init}
				validationSchema={validation}
				onSubmit={(values) => {
					handleSubmit(values);
				}}
			>
				{({ errors, touched, handleChange  }) => (
					<Form>
						<div className="impactclasstable">
							<div className="boxes">
								<div className="firstboxes">
									<div className={`box ${disableRow1 ? 'disabled' : null}`}>
										<p className="no">1</p>
										<div className="co">
											<p className="ti">
												<span>+</span> Signal that impact matters
											</p>
											<p className="normal">Engage actively</p>
											<p className="normal">Grow new/undersupplied capital markets</p>
											<p className="normal">Provide flexibility on risk-adjusted return</p>
										</div>
									</div>

									<div className={`box ${disableRow2 ? 'disabled' : null}`}>
										<p className="no">2</p>
										<div className="co">
											<p className="ti">
												<span>+</span> Signal that impact matters
											</p>
											<p className="ti">
												<span>+</span> Engage actively
											</p>
											<p className="normal">Grow new/undersupplied capital markets</p>
											<p className="normal">Provide flexibility on risk-adjusted return</p>
										</div>
									</div>

									<div className={`box ${disableRow3 ? 'disabled' : null}`}>
										<p className="no">3</p>
										<div className="co">
											<p className="ti">
												<span>+</span> Signal that impact matters
											</p>
											<p className="normal">Engage actively</p>
											<p className="ti">
												<span>+</span> Grow new/undersupplied capital markets
											</p>
											<p className="normal">Provide flexibility on risk-adjusted return</p>
										</div>
									</div>

									<div className={`box ${disableRow4 ? 'disabled' : null}`}>
										<p className="no">4</p>
										<div className="co">
											<p className="ti">
												<span>+</span> Signal that impact matters
											</p>
											<p className="ti">
												<span>+</span> Engage actively
											</p>
											<p className="ti">
												<span>+</span> Grow new/undersupplied capital markets
											</p>
											<p className="normal">Provide flexibility on risk-adjusted return</p>
										</div>
									</div>
									<div className={`box ${disableRow5 ? 'disabled' : null}`}>
										<p className="no">5</p>
										<div className="co">
											<p className="ti">
												<span>+</span> Signal that impact matters
											</p>
											<p className="normal">Engage actively</p>
											<p className="ti">
												<span>+</span> Grow new/undersupplied capital markets
											</p>
											<p className="ti">
												<span>+</span> Provide flexibility on risk-adjusted return
											</p>
										</div>
									</div>
									<div className={`box ${disableRow6 ? 'disabled' : null}`}>
										<p className="no">6</p>
										<div className="co">
											<p className="ti">
												<span>+</span> Signal that impact matters
											</p>
											<p className="ti">
												<span>+</span> Engage actively
											</p>
											<p className="ti">
												<span>+</span> Grow new/undersupplied capital markets
											</p>
											<p className="ti">
												<span>+</span> Provide flexibility on risk-adjusted return
											</p>
										</div>
									</div>
								</div>

								<div className="others">
									<div className="sections">
										<div className="mycauseharm">
											<p style={{ width: '100%' }}>
												MAY CAUSE <br />HARM <br />
												<Infobox
													key="harm"
													title=""
													info="Allocate assets here that cause <span>known harm or there is insufficient information</span> to make an assessment."
												/>
											</p>
										</div>
										<div className="bluelable">
											<div className="first">
												<p>
													ACT TO AVOID HARM <br />
													<Infobox
														key="avoid"
														title=""
														info="Allocate assets here that <span>actively mitigate or reduce negative outcomes</span> for people and the planet."
													/>
												</p>
											</div>
											<div className="nth2">
												<div className="tit">
													<p>
														BENEFIT STAKEHOLDERS <br />
														<Infobox
															key="ben"
															title=""
															direction="left"
															info="Allocate assets here that <span>actively mitigate or reduce negative outcomes</span> and <span>generate positive outcomes</span> for people or the planet."
														/>
													</p>
												</div>
											</div>
											<div className="nth3">
												<div className="tit">
													<p>
														CONTRIBUTE TO SOLUTIONS<br />
														<Infobox
															key="contri"
															title=""
															direction="left"
															info="Allocate assets here that <span>actively mitigate or reduce negative outcomes</span> and <span>generate substantial positive change for otherwise underserved</span> people or the planet."
														/>{' '}
													</p>
												</div>
											</div>
										</div>
									</div>

									<div className="mbx">
										<div className="row1">
											{' '}
											{/* not a row = a column */}
											<div className={`box ${disableRow1 ? 'disabled' : null}`}>
												<div className="forinput">
													<Field type="number" name="c1h" disabled={disableRow1}  />
												</div>
											</div>
											<div className={`box ${disableRow2 ? 'disabled' : null}`}>
												<div className="forinput">
													<Field type="number" name="c2h" disabled={disableRow2} />
												</div>
											</div>
											<div className={`box ${disableRow3 ? 'disabled' : null}`}>
												<div className="forinput">
													<Field type="number" name="c3h" disabled={disableRow3} />
												</div>
											</div>
											<div className={`box ${disableRow4 ? 'disabled' : null}`}>
												<div className="forinput">
													<Field type="number" name="c4h" disabled={disableRow4} />
												</div>
											</div>
											<div className={`box ${disableRow5 ? 'disabled' : null}`}>
												<div className="forinput">
													<Field type="number" name="c5h" disabled={disableRow5} />
												</div>
											</div>
											<div className={`box ${disableRow6 ? 'disabled' : null}`}>
												<div className="forinput">
													<Field type="number" name="c6h" disabled={disableRow6} />
												</div>
											</div>
										</div>

										<div className={`row2 ${disableColumnA ? 'disabled' : null}`}>
											<div className={`box ${disableRow1 ? 'disabled' : null}`}>
												<div className="forinput">
													<Field
														type="number"
														name="c1a"
														disabled={disableColumnA || disableRow1}
													/>
												</div>
											</div>
											<div className={`box ${disableRow2 ? 'disabled' : null}`}>
												<div className="forinput">
													<Field
														type="number"
														name="c2a"
														disabled={disableColumnA || disableRow2}
													/>
												</div>
											</div>
											<div className={`box ${disableRow3 ? 'disabled' : null}`}>
												<div className="forinput">
													<Field
														type="number"
														name="c3a"
														disabled={disableColumnA || disableRow3}
													/>
												</div>
											</div>
											<div className={`box ${disableRow4 ? 'disabled' : null}`}>
												<div className="forinput">
													<Field
														type="number"
														name="c4a"
														disabled={disableColumnA || disableRow4}
													/>
												</div>
											</div>
											<div className={`box ${disableRow5 ? 'disabled' : null}`}>
												<div className="forinput">
													<Field
														type="number"
														name="c5a"
														disabled={disableColumnA || disableRow5}
													/>
												</div>
											</div>
											<div className={`box ${disableRow6 ? 'disabled' : null}`}>
												<div className="forinput">
													<Field
														type="number"
														name="c6a"
														disabled={disableColumnA || disableRow6}
													/>
												</div>
											</div>
										</div>

										<div className={`row3 ${disableColumnB ? 'disabled' : null}`}>
											<div className={`box ${disableRow1 ? 'disabled' : null}`}>
												<div className="forinput">
													<Field
														type="number"
														name="c1b"
														disabled={disableColumnB || disableRow1}
													/>
												</div>
											</div>
											<div className={`box ${disableRow2 ? 'disabled' : null}`}>
												<div className="forinput">
													<Field
														type="number"
														name="c2b"
														disabled={disableColumnB || disableRow2}
													/>
												</div>
											</div>
											<div className={`box ${disableRow3 ? 'disabled' : null}`}>
												<div className="forinput">
													<Field
														type="number"
														name="c3b"
														disabled={disableColumnB || disableRow3}
													/>
												</div>
											</div>
											<div className={`box ${disableRow4 ? 'disabled' : null}`}>
												<div className="forinput">
													<Field
														type="number"
														name="c4b"
														disabled={disableColumnB || disableRow4}
													/>
												</div>
											</div>
											<div className={`box ${disableRow5 ? 'disabled' : null}`}>
												<div className="forinput">
													<Field
														type="number"
														name="c5b"
														disabled={disableColumnB || disableRow5}
													/>
												</div>
											</div>
											<div className={`box ${disableRow6 ? 'disabled' : null}`}>
												<div className="forinput">
													<Field
														type="number"
														name="c6b"
														disabled={disableColumnB || disableRow6}
													/>
												</div>
											</div>
										</div>

										<div className={`row4 ${disableColumnC ? 'disabled' : null}`}>
											<div className={`box ${disableRow1 ? 'disabled' : null}`}>
												<div className="forinput">
													<Field
														type="number"
														name="c1c"
														disabled={disableColumnC || disableRow1}
													/>
												</div>
											</div>
											<div className={`box ${disableRow2 ? 'disabled' : null}`}>
												<div className="forinput">
													<Field
														type="number"
														name="c2c"
														disabled={disableColumnC || disableRow2}
													/>
												</div>
											</div>
											<div className={`box ${disableRow3 ? 'disabled' : null}`}>
												<div className="forinput">
													<Field
														type="number"
														name="c3c"
														disabled={disableColumnC || disableRow3}
													/>
												</div>
											</div>
											<div className={`box ${disableRow4 ? 'disabled' : null}`}>
												<div className="forinput">
													<Field
														type="number"
														name="c4c"
														disabled={disableColumnC || disableRow4}
													/>
												</div>
											</div>
											<div className={`box ${disableRow5 ? 'disabled' : null}`}>
												<div className="forinput">
													<Field
														type="number"
														name="c5c"
														disabled={disableColumnC || disableRow5}
													/>
												</div>
											</div>
											<div className={`box ${disableRow6 ? 'disabled' : null}`}>
												<div className="forinput">
													<Field
														type="number"
														name="c6c"
														disabled={disableColumnC || disableRow6}
													/>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="buttonsbtn">
							{showAllocationError ? <AllocationError /> : null}

							<br />
							<div className="row">
								<div className="col-6 leftside">
									<button onClick={() => history.push('/classify/' + id + '/investor')}>
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
	);
});

export default Allocation;
