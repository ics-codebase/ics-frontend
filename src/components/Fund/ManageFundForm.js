// Render Prop
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, yupToFormErrors } from 'formik';
import * as Yup from 'yup';
import { useStores } from '../../hooks/use-stores';
import { useHistory, useParams } from 'react-router-dom';
import fundService from '../../services/fund';
import { observer } from 'mobx-react';
import Infobox from '../../components/UI/Infobox';
import * as QueryString from 'query-string';
import { withRouter } from 'react-router';
import NumberFormat from 'react-number-format';
import { industry, region, groupedRegions, groupedIndustries } from './data';
import Select from 'react-select';

const TextInput = ({
	field, // { name, value, onChange, onBlur }
	form: { touched, errors, handleChange }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	...props
}) => (
	<div>
		<div className={errors[field.name] && touched[field.name] ? 'errinput' : ''}>
			<p className="pofinput">
				{props.title} {props.infobox ? (
					<Infobox id={props.infobox} title="" info={props.infobox_info} />
				) : null}{' '}
			</p>
			<input type="text" {...field} {...props} />
			{errors[field.name] && touched[field.name] ? <p className="errmsg">{errors[field.name]}</p> : null}
		</div>
	</div>
);

const NumberInput = ({
	field, // { name, value, onChange, onBlur }
	form: { touched, errors, handleChange }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
	...props
}) => (
	<div>
		<div className={errors[field.name] && touched[field.name] ? 'errinput' : ''}>
			<p className="pofinput">
				{props.title} {props.infobox ? (
					<Infobox id={props.infobox} title="" info={props.infobox_info} />
				) : null}{' '}
			</p>
			<NumberFormat
				thousandSeparator={true}
				prefix={''}
				name="minimuminvestment"
				inputmode="numeric"
				{...field}
				{...props}
			/>

			{errors[field.name] && touched[field.name] ? <p className="errmsg">{errors[field.name]}</p> : null}
		</div>
	</div>
);

const customStyles = {
	input: () => ({
		maxHeight: '38px'
	})
};

const ManageFundFormSchema = Yup.object().shape({
	name: Yup.string().min(4, 'Too short').required('Required'),
	fundtype: Yup.string().required('Required'),
	currency: Yup.string().required('Required'),
	status: Yup.string().required('Required'),
	legalname: Yup.string().min(4, 'Too short').optional(),
	identifier: Yup.string().optional(),
	shareclass: Yup.string().min(4, 'Too short').optional(),
	enterprises: Yup.number().typeError('Must be a number').integer('Please use a whole number').optional(),
	fundsize: Yup.string().required('Required'),
	minimuminvestment: Yup.string().required('Required')
});

const ManageFundForm = (props) => {
	const { fundStore } = useStores();
	const history = useHistory();
	let { id } = useParams();
	const [ fundSubmitButtonDisabled, setFundSubmitButtonDisabled ] = useState(false);
	const [ apiResults, setApiResults ] = useState();

	function goBack() {
		history.push('/organisation/securities');
	}

	//load thefund if indicated by an id to pass into initialvalues
	let fund = null;
	if (id) {
		fund = fundStore.funds.filter((a) => a._id === id)[0];
	}


	const handleSubmit = (v) => {
		let fundToChange;

		//copy data into current fund data if already there
		if (fund) {
			fundToChange = Object.assign(fund, v);

			if (!fundToChange.published) {
				fundToChange.published = 'unpublished';
			}
		} else {
			fundToChange = v;
			fundToChange.published = '';
		}

		if (!fundToChange.practice_exclusions_other) {
			fundToChange.practice_exclusions_other = '';
		}

		//stop double blick
		setFundSubmitButtonDisabled(true);

		//save
		fundStore.saveFund(fundToChange).then((results) => {
			if (results.errors) {
				setApiResults(JSON.stringify(results.errors));
				setFundSubmitButtonDisabled(false);
			} else {
				fundStore.refreshFromArchive().then(() => {
					if (props.location) {
						const params = QueryString.parse(props.location.search);

						if (params.review) {
							history.push('/classify/' + id + '/review');
						} else {
							history.push('/organisation/securities');
						}
					} else {
						history.push('/organisation/securities');
					}
				});
			}
		});

	};

	const [ RegionChoice, setRegionChoice ] = useState();

	const handleSelectRegion = (selectedOption) => {
		setRegionChoice({ selectedOption });
	};

	return (
		<Formik
			initialValues={{
				_id: fund ? fund._id : null,
				name: fund ? fund.name : '',
				legalname: fund ? fund.legalname : '',
				isin: fund ? fund.isin : '',
				ticker: fund ? fund.ticker : '',
				shareclass: fund ? fund.shareclass : '',
				fundtype: fund ? fund.fundtype : '',
				underlyingassets: fund ? fund.underlyingassets : [],
				fundtypeother: fund ? fund.fundtypeother : '',
				currency: fund ? fund.currency : '',
				fundsize: fund ? fund.fundsize : '',
				minimuminvestment: fund ? fund.minimuminvestment : '',
				status: fund ? fund.status : '',
				enterprises: fund ? fund.enterprises : '',
				multiregionfocus: fund ? fund.multiregionfocus : [],
				multiindustryfocus: fund ? fund.multiindustryfocus : []
			}}
			validationSchema={ManageFundFormSchema}
			onSubmit={(values) => {
				handleSubmit(values);
			}}
		>
			{({ errors, touched, handleChange, setFieldValue }) => (
				<Form>
					{apiResults ? <p class="green_msg">{apiResults}</p> : null}

					<Field name="name" title="Fund / Strategy Name" component={TextInput} placeholder="" />
					<Field
						name="legalname"
						title="Legal Name"
						infobox="fund_legal_name"
						infobox_info="Enter the registered legal entity name of your fund. This helps us identify your fund if it does not have a widely recognised identifier (below)."
						component={TextInput}
						placeholder=""
					/>

					{/* <div className={errors.identifiertype && touched.identifiertype ? 'errinput' : ''}>
						<p className="pofinput">
							Fund unique identification type{' '}
							<Infobox
								key="fund_unique_id"
								title=""
								info="Select a security identifier for your fund, if available. Then add the identifier in the field below."
							/>
						</p>

						<Field as="select" name="identifiertype">
							<option value="" disabled hidden>
								Select identification type
							</option>
							<option value="Bloomberg Global Identifier">Bloomberg Global Identifier</option>
							<option value="CUSIP">CUSIP</option>
							<option value="ISIN">ISIN</option>
							<option value="RIC">RIC</option>
							<option value="SEDOL">SEDOL</option>
							<option value="Internal Identifier">Internal identifier</option>
						</Field>
						{errors.identifiertype && touched.identifiertype ? (
							<p className="errmsg">{errors.identifiertype}</p>
						) : null}
					</div>

					<Field name="identifier" title="Identifier" component={TextInput} placeholder="" /> */}
					<Field name="isin" title="ISIN" component={TextInput} placeholder="" />
					<Field name="ticker" title="Ticker" component={TextInput} placeholder="" />

					<Field
						name="shareclass"
						title="Share Class (if applicable)"
						component={TextInput}
						placeholder=""
						infobox="fund_share_class"
						infobox_info="Typically relevant for public markets investment products. Add the share class for this fund entry. If more than one share class separate with a semi-colon E.g Class A; Class B; Class C"
					/>

					<div className={errors.fundtype && touched.fundtype ? 'errinput' : ''}>
						<p className="pofinput">Fund type</p>
						<Field as="select" name="fundtype">
							<option value="" disabled hidden>
								Select fund type
							</option>
							<option value="Standard (vanilla) investment funds/mutual funds">
								Standard (vanilla) investment funds/mutual funds
							</option>
							<option value="Hedge funds">Hedge funds</option>
							<option value="Real estate investment trusts (REITs)">
								Real estate investment trusts (REITs)
							</option>
							<option value="Discretionary Fund Management">Discretionary Fund Management</option>
							<option value="Exchange-traded funds (ETFs)">Exchange-traded funds (ETFs)</option>
							<option value="Pension funds">Pension funds</option>
							<option value="Funds of funds">Funds of funds</option>
							<option value="Private equity funds">Private equity funds</option>
							<option value="Others (miscellaneous)">Others (miscellaneous)</option>
						</Field>
						{errors.fundtype && touched.fundtype ? <p className="errmsg">{errors.fundtype}</p> : null}
					</div>

					<p className="pofinput2">What are the fund’s underlying assets? Please select all that apply:</p>
					<div className="row rowofcheckboxs">
						<div className="col-md-6">
							<label className="container-checkbox">
								Commodities
								<Field name="underlyingassets" value="Commodities" type="checkbox" />
								<span className="checkmark" />
							</label>
							<label className="container-checkbox">
								Convertible securities
								<Field name="underlyingassets" value="Convertible securities" type="checkbox" />
								<span className="checkmark" />
							</label>
							<label className="container-checkbox">
								Derivatives
								<Field name="underlyingassets" value="Derivatives" type="checkbox" />
								<span className="checkmark" />
							</label>
							<label className="container-checkbox">
								Equities
								<Field name="underlyingassets" value="Equities" type="checkbox" />
								<span className="checkmark" />
							</label>
							<label className="container-checkbox">
								Debt Instruments
								<Field name="underlyingassets" value="Debt Instruments" type="checkbox" />
								<span className="checkmark" />
							</label>
						</div>
						<div className="col-md-6">
							<label className="container-checkbox">
								Credit
								<Field name="underlyingassets" value="Credit" type="checkbox" />
								<span className="checkmark" />
							</label>
							<label className="container-checkbox">
								Mixed
								<Field name="underlyingassets" value="Mixed" type="checkbox" />
								<span className="checkmark" />
							</label>
							<label className="container-checkbox">
								Real estate
								<Field name="underlyingassets" value="Real estate" type="checkbox" />
								<span className="checkmark" />
							</label>
							<label className="container-checkbox">
								Others
								<Field name="underlyingassets" value="Others" type="checkbox" />
								<span className="checkmark" />
							</label>
						</div>
					</div>

					<div className={errors.fundtypeother && touched.fundtypeother ? 'errinput' : ''}>
						<Field name="fundtypeother" title="Other (if not above)" component={TextInput} placeholder="" />
						{errors.fundtypeother && touched.fundtypeother ? (
							<p className="errmsg">{errors.fundtypeother}</p>
						) : null}
					</div>

					<Field
						name="enterprises"
						title="Number of underlying enterprises (if applicable)"
						component={TextInput}
						placeholder=""
					/>

					<div className="addmargintop" />


					<p className="pofinput">Regional focus</p>
					<Field
						component={Select}
						isMulti
						closeMenuOnSelect={false}
						defaultValue={fund ? fund.multiregionfocus.map((i) => {
							return { value: i, label: i };
						}) : ''}
						name="multiregionfocus"
						options={groupedRegions.map(i => {return {label: i.label, options: i.options.map(o => {return {label:o, value: o}} ) } })}
						styles={customStyles}
						onChange={(option) => {
							setFieldValue(
								'multiregionfocus',
								option.map((i) => {
									return i.value;
								})
							);
						}}
					/>

					<div className="addmargintop" />

					<p className="pofinput">Industry focus</p>
					<Field
						component={Select}
						isMulti
						closeMenuOnSelect={false}
						defaultValue={fund ? fund.multiindustryfocus.map((i) => {
							return { value: i, label: i };
						}) : ''}
						name="multiindustryfocus"
						options={groupedIndustries.map(i => {return {label: i.label, options: i.options.map(o => {return {label:o, value: o}} ) } })}
						styles={customStyles}
						onChange={(option) => {
							setFieldValue(
								'multiindustryfocus',
								option.map((i) => {
									return i.value;
								})
							);
						}}
					/>

<br></br>

					<div className="row onhalf addmargintop">
						<div className="col-6">
							<div className={errors.currency && touched.currency ? 'errinput' : ''}>
								<p className="pofinput">Currency</p>
								<Field as="select" name="currency">
									<option value="" disabled hidden>
										Select
									</option>
									<option value="USD">USD</option>
									<option value="EUR">EUR</option>
									<option value="JPY">JPY</option>
									<option value="GBP">GBP</option>
									<option disabled>────────</option>
									<option value="AED">AED</option>
									<option value="AFN">AFN</option>
									<option value="ALL">ALL</option>
									<option value="AMD">AMD</option>
									<option value="ANG">ANG</option>
									<option value="AOA">AOA</option>
									<option value="ARS">ARS</option>
									<option value="AUD">AUD</option>
									<option value="AWG">AWG</option>
									<option value="AZN">AZN</option>
									<option value="BAM">BAM</option>
									<option value="BBD">BBD</option>
									<option value="BDT">BDT</option>
									<option value="BGN">BGN</option>
									<option value="BHD">BHD</option>
									<option value="BIF">BIF</option>
									<option value="BMD">BMD</option>
									<option value="BND">BND</option>
									<option value="BOB">BOB</option>
									<option value="BRL">BRL</option>
									<option value="BSD">BSD</option>
									<option value="BTN">BTN</option>
									<option value="BWP">BWP</option>
									<option value="BYN">BYN</option>
									<option value="BZD">BZD</option>
									<option value="CAD">CAD</option>
									<option value="CDF">CDF</option>
									<option value="CHF">CHF</option>
									<option value="CLP">CLP</option>
									<option value="CNY">CNY</option>
									<option value="COP">COP</option>
									<option value="CRC">CRC</option>
									<option value="CUC">CUC</option>
									<option value="CUP">CUP</option>
									<option value="CVE">CVE</option>
									<option value="CZK">CZK</option>
									<option value="DJF">DJF</option>
									<option value="DKK">DKK</option>
									<option value="DOP">DOP</option>
									<option value="DZD">DZD</option>
									<option value="EGP">EGP</option>
									<option value="ERN">ERN</option>
									<option value="ETB">ETB</option>
									<option value="EUR">EUR</option>
									<option value="FJD">FJD</option>
									<option value="FKP">FKP</option>
									<option value="GBP">GBP</option>
									<option value="GEL">GEL</option>
									<option value="GGP">GGP</option>
									<option value="GHS">GHS</option>
									<option value="GIP">GIP</option>
									<option value="GMD">GMD</option>
									<option value="GNF">GNF</option>
									<option value="GTQ">GTQ</option>
									<option value="GYD">GYD</option>
									<option value="HKD">HKD</option>
									<option value="HNL">HNL</option>
									<option value="HKD">HKD</option>
									<option value="HRK">HRK</option>
									<option value="HTG">HTG</option>
									<option value="HUF">HUF</option>
									<option value="IDR">IDR</option>
									<option value="ILS">ILS</option>
									<option value="IMP">IMP</option>
									<option value="INR">INR</option>
									<option value="IQD">IQD</option>
									<option value="IRR">IRR</option>
									<option value="ISK">ISK</option>
									<option value="JEP">JEP</option>
									<option value="JMD">JMD</option>
									<option value="JOD">JOD</option>
									<option value="JPY">JPY</option>
									<option value="KES">KES</option>
									<option value="KGS">KGS</option>
									<option value="KHR">KHR</option>
									<option value="KID">KID</option>
									<option value="KMF">KMF</option>
									<option value="KPW">KPW</option>
									<option value="KRW">KRW</option>
									<option value="KWD">KWD</option>
									<option value="KYD">KYD</option>
									<option value="KZT">KZT</option>
									<option value="LAK">LAK</option>
									<option value="LBP">LBP</option>
									<option value="LKR">LKR</option>
									<option value="LRD">LRD</option>
									<option value="LSL">LSL</option>
									<option value="LYD">LYD</option>
									<option value="MAD">MAD</option>
									<option value="MDL">MDL</option>
									<option value="MGA">MGA</option>
									<option value="MKD">MKD</option>
									<option value="MMK">MMK</option>
									<option value="MNT">MNT</option>
									<option value="MOP">MOP</option>
									<option value="MRU">MRU</option>
									<option value="MUR">MUR</option>
									<option value="MVR">MVR</option>
									<option value="MWK">MWK</option>
									<option value="MXN">MXN</option>
									<option value="MYR">MYR</option>
									<option value="MZN">MZN</option>
									<option value="NAD">NAD</option>
									<option value="NGN">NGN</option>
									<option value="NIO">NIO</option>
									<option value="NOK">NOK</option>
									<option value="NPR">NPR</option>
									<option value="NZD">NZD</option>
									<option value="OMR">OMR</option>
									<option value="PAB">PAB</option>
									<option value="PEN">PEN</option>
									<option value="PGK">PGK</option>
									<option value="PHP">PHP</option>
									<option value="PKR">PKR</option>
									<option value="PLN">PLN</option>
									<option value="PRB">PRB</option>
									<option value="PYG">PYG</option>
									<option value="QAR">QAR</option>
									<option value="RON">RON</option>

									<option value="RSD">RSD</option>
									<option value="RUB">RUB</option>
									<option value="RWF">RWF</option>
									<option value="SAR">SAR</option>
									<option value="SEK">SEK</option>
									<option value="SGD">SGD</option>
									<option value="SHP">SHP</option>
									<option value="SLL">SLL</option>
									<option value="SLS">SLS</option>
									<option value="SOS">SOS</option>
									<option value="SRD">SRD</option>
									<option value="SSP">SSP</option>
									<option value="STN">STN</option>
									<option value="SYP">SYP</option>
									<option value="SZL">SZL</option>
									<option value="THB">THB</option>
									<option value="TJS">TJS</option>
									<option value="TMT">TMT</option>
									<option value="TND">TND</option>
									<option value="TOP">TOP</option>
									<option value="TRY">TRY</option>
									<option value="TTD">TTD</option>
									<option value="TVD">TVD</option>
									<option value="TWD">TWD</option>
									<option value="TZS">TZS</option>
									<option value="UAH">UAH</option>
									<option value="UGX">UGX</option>
									<option value="USD">USD</option>
									<option value="UYU">UYU</option>
									<option value="UZS">UZS</option>
									<option value="VES">VES</option>
									<option value="VND">VND</option>
									<option value="VUV">VUV</option>
									<option value="WST">WST</option>
									<option value="XAF">XAF</option>
									<option value="XCD">XCD</option>
									<option value="XOF">XOF</option>
									<option value="XPF">XPF</option>
									<option value="ZAR">ZAR</option>
									<option value="ZMW">ZMW</option>
									<option value="ZWB">ZWB</option>
								</Field>
								{errors.currency && touched.currency ? (
									<p className="errmsg">{errors.currency}</p>
								) : null}
							</div>
						</div>
						<div className="col-6">
							<Field
								name="fundsize"
								title="Current fund size (full digits)"
								component={NumberInput}
								placeholder=""
							/>
						</div>
					</div>

					<Field
						name="minimuminvestment"
						title="Minimum investment for investors (full digits)"
						component={NumberInput}
						placeholder=""
					/>

					<div className="addmargintop" />

					<div className={errors.status && touched.status ? 'errinput' : ''}>
						<p className="pofinput">Status <Infobox id="fundstatus" info="Open or closed for investment" /></p>
						<Field as="select" name="status">
							<option value="" disabled hidden>
								Select status
							</option>
							<option value="Open">Open</option>
							<option value="Closed">Closed</option>
						</Field>
						{errors.status && touched.status ? <p className="errmsg">{errors.status}</p> : null}
					</div>

					<div className="buttonsbtn">
						<div className="row">
							<div className="col-6 leftside">
								<button onClick={goBack}>
									<span>Cancel</span>
								</button>
							</div>
							<div className="col-6 rightside">
								<button type="submit" disabled={fundSubmitButtonDisabled}>
									<span>{fundSubmitButtonDisabled ? 'Saving ...' : 'Save Changes'}</span>
								</button>
							</div>
						</div>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default withRouter(ManageFundForm);
