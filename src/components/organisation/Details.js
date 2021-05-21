// Render Prop
import React, {useEffect} from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useStores } from '../../hooks/use-stores';
import { useHistory } from "react-router-dom";
import organisationService from '../../services/organisation';
import { observer } from 'mobx-react';
import NotationSection from './Notation'
import ScrollToTop from '../Router/ScrollToTop';
import Infobox from '../../components/UI/Infobox'
import OrgImageUpload from './OrgImageUpload';


 
const DetailsSchema = Yup.object().shape({
	name: Yup.string().required('Required'),
	website: Yup.string().required('Required'),
	identifier: Yup.string().required('Required')
});

const Details = observer(() => {
	const { organisationStore } = useStores();
	const orgexists = organisationStore.organisation.website === '' ? false : true
	const history = useHistory();

	const { userStore } = useStores();
	const orgname = userStore.orgname;

	
	const handleSubmit = (values) => {

		organisationStore.organisation.name = values.name
		organisationStore.organisation.website = values.website
		organisationStore.organisation.identifier = values.identifier
		organisationStore.organisation.identifiertype = values.identifiertype
		organisationStore.organisation.image = values.file
		

		//update store
		organisationStore.saveCurrentOrganisation()

		if (orgexists){
			history.push("/organisation/securities");
		}else{
			history.push("/organisation");
		}
	};


	return (
		<>
			
			<ScrollToTop />
			<div className="tab-content">
				<div id="home" className="container tab-pane active">
					<br />
					<div className="manage_organisation_information">
						<h2>Organisation information</h2>

						<Formik
							initialValues={{
								name: orgexists ? organisationStore.organisation.name : userStore.orgname,
								website: organisationStore.organisation.website,
								identifiertype: organisationStore.organisation.identifiertype,
								identifier: organisationStore.organisation.identifier,
							}}
							validationSchema={DetailsSchema}
							onSubmit={(values) => {
								handleSubmit(values);
							}}
						>
							{({ errors, touched, handleChange, setFieldValue }) => (
								<Form>
									<div className="max-width-dd">
										<div className={errors.name && touched.name ? 'errinput' : ''}>
											<p className="pofinput">Organisation name</p>
											<Field name="name" type="text" />
											{errors.name && touched.name ? (
												<p className="errmsg">{errors.name}</p>
											) : null}
										</div>

										<div className={errors.website && touched.website ? 'errinput' : ''}>
											<p className="pofinput">Website</p>
											<Field name="website" type="text" />
											{errors.website && touched.website ? (
												<p className="errmsg">{errors.website}</p>
											) : null}
										</div>

										<p className="pofinput">Identifier Type</p>

										<Field as="select" name="identifiertype">
										<option value="permid">PermID (Thomson Reuters Global)</option>
										<option value="eoir">Economic Operators Identification and Registration system (EU)</option>
										<option value="comp">Companies House (UK)</option>
										<option value="ein">Employer Identification Number (USA)</option>
										<option value="inter">Internal</option>
										<option value="other">Other / National Company Registry Number</option>

										</Field>

										<div className={errors.identifier && touched.identifier ? 'errinput' : ''}>
											<p className="pofinput">Identifier </p>
											<Field name="identifier" type="text" />
											{errors.identifier && touched.identifier ? (
												<p className="errmsg">{errors.identifier}</p>
											) : null}
										</div>

									</div>


									{orgexists ? <>

									<h2>Organisational practices and performance</h2>

									<NotationSection
										notationgroup="practicesperformance"
										title="Does your organisation adhere to any principles of responsible business conduct?"
										questions={[ 
											{ name: 'CRISA - Code for Responsible Investing in South Africa', score: true, link:true  }, 
											{ name: 'UN Principles for Responsible Investment', score: true, link:true  }, 
											{ name: 'The Ten Principles of the UN Global Compact', score: false, link:true  }, 
											{ name:'UNEP-FI Principles for Responsible Banking', score: false, link:true}, 
											{ name:'UNEP-FI Principles for Responsible Insurance', score: false, link:true},  
											{ name: 'Proprietary Approach', score: false, link:true  }
										]}
										notations={organisationStore.organisation.notations} />

									<NotationSection
										notationgroup="other"
										title="Does your organisation have any accreditations or ratings you would like to share?"
										questions={[ 
											{ name: 'Arabesque S-ray Score', link: true, score:true }, 
											{ name: 'CDP Climate Score', link: true, score:true }, 
											{ name: 'CDP Water Security Score', link: true, score:true }, 
											{ name: 'CDP Forest Score', link: true, score:true }, 
											{ name: 'Certified B Corporation', link: true, score:true }, 
											{ name: 'Corporate Knights Global 100 Ranking', link: true, score:true }, 
											{ name: 'CSRHub Rating', link: true, score:true }, 
											{ name: 'FTSE Russell ESG Rating', link: true, score:true }, 
											{ name: 'GRESB Rating', link: true, score:true }, 
											{ name: 'Impak Score', link: true, score:true }, 
											{ name: 'ISS Quality Score', link: true, score:true }, 
											{ name: 'ISS-Oekom Corporate Rating', link: true, score:true }, 
											{ name: 'MSCI ESG Rating', link: true, score:true }, 
											{ name: 'Refinitiv ESG Score', link: true, score:true }, 
											{ name: 'RepRisk ESG Rating', link: true, score:true }, 
											{ name: 'RobecoSAM Corporate Sustainability Assessment', link: true, score:true }, 
											{ name: 'Sense Folio ESG Score', link: true, score:true }, 
											{ name: 'Sustainalytics ESG Risk Rating', link: true, score:true }, 
											{ name: 'Shareaction - Asset Owner Disclosure Project', link: true, score:true }, 
											{ name: 'Util', link: true, score:true }, 
											{ name: 'Vigeo Eiris Sustainability Rating', link: true, score:true }, 
										]}
										notations={organisationStore.organisation.notations} />
	

									<NotationSection
										notationgroup="sectorinitiatives"
										title="Does your organisation participate in sector-specific initiatives or collective actions in support of the SDGs?"
										questions={[ 
											{ name: 'Climate Action 100', link: true  },
											{ name: 'Collective Commitment to Climate Action CCCA', link: true  },
											{ name: 'GISD Global Investors for Sustainable Development', link: true  },
											{ name: 'Global Alliance for Banking on Values', link: true  },
											{ name: 'Investor Agenda', link: true  },
											{ name: 'Investor Alliance for Human Rights', link: true  },
											{ name: 'Investor Decarbonisation Initiative IDI', link: true  },
											{ name: 'Poseidon Principles', link: true  },
											{ name: 'Powering Past Coal Alliance Finance Principles', link: true  },
											{ name: 'Natural Capital Finance Alliance', link: true  },
											{ name: 'Natural Capital Investment Alliance', link: true  },
											{ name: 'Net Zero Asset Manager Initiative', link: true  },
											{ name: 'Net Zero Asset Owner Alliance', link: true  },
											{ name: 'Tobacco-free Finance Pledge by UNEP-FI', link: true  },
											{ name: 'Transition Pathway Initiative', link: true  },
											{ name: 'Other', other: true  },

										]}
										notations={organisationStore.organisation.notations} />
										
										
										<br/></>
										: null}
									
									{ process.env.NODE_ENV === 'development' ?
									<OrgImageUpload></OrgImageUpload>
									: null}

									<button type="submit" className="savebtn">
										<span>Save changes</span>
									</button> 

									
								</Form>
							)}
						</Formik>


					</div>
				</div>
			</div>
		</>
	);
});

export default Details;
