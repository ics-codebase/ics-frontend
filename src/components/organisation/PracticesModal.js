// Render Prop
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useStores } from '../../hooks/use-stores';

const PracticesModal = (props) => {
	const { organisationStore } = useStores();

	const InputSchema = Yup.object().shape({
		unprinciples_score: Yup.string().max(3, 'Maximum 3 characters'),
		unglobal_score: Yup.string().max(3, 'Maximum 3 characters'),
		banking_score: Yup.string().max(3, 'Maximum 3 characters'),
		insurance_score: Yup.string().max(3, 'Maximum 3 characters'),
	});

	const handleClose = () => {
		props.closemodal()
	};

	const handleSubmit = (values) => {
		//convert data from form into proper object structure
		const m = [];

		if (values.practices.includes('unprinciples'))
			m.push({ name: 'unprinciples', link: values.unprinciples_link, score: values.unprinciples_score });
		if (values.practices.includes('unglobal'))
			m.push({ name: 'unglobal', link: values.unglobal_link, score: values.unglobal_score });
		if (values.practices.includes('banking'))
			m.push({ name: 'banking', link: values.banking_link, score: values.banking_score });
		if (values.practices.includes('insurance'))
			m.push({ name: 'insurance', link: values.insurance_link, score: values.insurance_score });

		//organisationStore.organisation.practices = {name:'eek', score:'rrr', link:'ooo'};
		organisationStore.organisation.practices = m;
		organisationStore.saveCurrentOrganisation();

		props.closemodal()
	};

	//convert model to something formik intitialisation recognises

	const selectedPractices = [];
	var pformdata = {};

	if (organisationStore.organisation.practices) {
		organisationStore.organisation.practices.forEach((principle) => {
			selectedPractices.push(principle.name);
			pformdata[principle.name + ''] = principle.name;
			pformdata[principle.name + '_link'] = principle.link;
			pformdata[principle.name + '_score'] = principle.score;
		});
	}

	return (
		<div>
			<Modal show={props.showpractices} onHide={handleClose}>
				<Modal.Header />
				<Modal.Body>
					<div className="modalopened">
						<div className="bulkuploadcss">
							<Formik
								initialValues={{
									practices: selectedPractices,
									unprinciples_link:
										'unprinciples_link' in pformdata ? pformdata.unprinciples_link : '',
									unprinciples_score: pformdata.unprinciples_score || '',
									unglobal_link: pformdata.unglobal_link || '',
									unglobal_score: pformdata.unglobal_score || '',
									banking_link: pformdata.banking_link || '',
									banking_score: pformdata.banking_score || '',
									insurance_link: pformdata.insurance_link || '',
									insurance_score: pformdata.insurance_score || ''
								}}
								validationSchema={InputSchema}
								onSubmit={(values) => {
									handleSubmit(values);
								}}
							>
								{({ errors, touched, handleChange }) => (
									<Form>
										<a href="#" onClick={props.closemodal} className="cross">
											<img src="/assets/img/closeicon.png" alt="" />
										</a>
										<div className="boxcont">
											<h1>Add [section label]</h1>
											<p className="undertitle">
												Select all that apply from the list below. For certain [types] you will
												be asked to provide your score and a source if available.
											</p>

											<div className="forscroll">
												<div className="boxs lablechecked">
													<label className="container-checkbox">
														UN Principles
														<Field name="practices" type="checkbox" value="unprinciples" />
														<span className="checkmark" />
													</label>
													<div className="ifyesdiv">
														<p className="pofinput">Provide link (if available)</p>
														<Field name="unprinciples_link" type="text" />
														<p className="pofinput">Rating or score (if available)</p>
														<Field
															name="unprinciples_score"
															type="text"
															className="withmxwidth"
														/>
													</div>
												</div>

												<div className="boxs lablechecked">
													<label className="container-checkbox">
														UN Global
														<Field name="practices" type="checkbox" value="unglobal" />
														<span className="checkmark" />
													</label>
													<div className="ifyesdiv">
														<p className="pofinput">Provide link (if available)</p>
														<Field name="unglobal_link" type="text" />
														<p className="pofinput">Rating or score (if available)</p>
														<Field
															name="unglobal_score"
															type="text"
															className="withmxwidth"
														/>
													</div>
												</div>

												<div className="boxs lablechecked">
													<label className="container-checkbox">
														Banking
														<Field name="practices" type="checkbox" value="banking" />
														<span className="checkmark" />
													</label>
													<div className="ifyesdiv">
														<p className="pofinput">Provide link (if available)</p>
														<Field name="banking_link" type="text" />
														<p className="pofinput">Rating or score (if available)</p>
														<Field
															name="banking_score"
															type="text"
															className="withmxwidth"
														/>
													</div>
												</div>

												<div className="boxs lablechecked">
													<label className="container-checkbox">
														Insurance
														<Field name="practices" type="checkbox" value="insurance" />
														<span className="checkmark" />
													</label>
													<div className="ifyesdiv">
														<p className="pofinput">Provide link (if available)</p>
														<Field name="insurance_link" type="text" />
														<p className="pofinput">Rating or score (if available)</p>
														<Field
															name="insurance_score"
															type="text"
															className="withmxwidth"
														/>
													</div>
												</div>
											</div>
										</div>
										<div className="buttonsbtn">
											<div className="row">
												<div className="col-6 leftside">
													<button data-dismiss="modal" onClick={handleClose}>
														<span>Cancel</span>
													</button>
												</div>
												<div className="col-6 rightside">
													<button type="submit">
														<span>Save Changes</span>
													</button>
												</div>
											</div>
										</div>
									</Form>
								)}
							</Formik>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer />
			</Modal>
		</div>
	);
};

export default PracticesModal;
