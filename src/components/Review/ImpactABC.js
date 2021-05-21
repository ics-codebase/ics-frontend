import React, { useState } from 'react';
import Infobox from '../../components/UI/Infobox';

const ImpactABC = (props) => {
	const impactabc = props.fund.impactabc; 

	return (
		<div>
			<div className="subtitle">
				<h6>
					<span>A</span>ct to avoid harm
				</h6>
				How do you conclude the fund’s underlying assets <b>mitigate or reduce negative outcomes</b> for people,
				the planet and the economy? Select all that apply.
			</div>

			<div className="ppfororange">
				<div className="orangedivcb">
					{impactabc.doing.includes('act-dd') ? (
						<div className="box">
							<p className="tit">
								<span>Rely on due diligence conducted prior to investment</span>
								<br />
								Conduct a thorough analysis of expected social and environmental impact before investment.
							</p>
						</div>
					) : null}

					{impactabc.doing.includes('act-thirdparty') ? (
						<div className="box">
							<p className="tit">
								<span>Third-party ratings</span>
								<br />
								We use ratings from third-party data providers to determine whether underlying assets
								are mitigating or reducing negative outcomes.
							</p>
						</div>
					) : null}

					{impactabc.doing.includes('act-dataused') ? (
						<div className="box">
							<p className="tit">
								<span>Data used as proxies for negative outcomes</span>
								<br />
								The data from underlying assets include proxy measures, which give some confidence that
								negative outcomes have been mitigated or reduced.
							</p>
						</div>
					) : null}

					{impactabc.doing.includes('act-outcomes') ? (
						<div className="box">
							<p className="tit">
								<span>Outcomes data</span>
								<br />
								Our underlying underlying assets report data that directly measures negative outcomes
								they are mitigating or reducing.
							</p>
						</div>
					) : null}

					{impactabc.doing.includes('act-other') ? (
						<div className="box">
							<p className="tit">
								<span>Other</span>
								<br />
								{impactabc.act_other}
							</p>
						</div>
					) : null}
				</div>
			</div>

			<div className="subtitle">
				<h6>
					<span>B</span>enefit stakeholders
				</h6>
				How do you conclude which of the fund’s underlying assets generate positive outcomes for people, the
				planet or the economy? Select all that apply.
			</div>
			<div className="ppfororange">
				<div className="orangedivcb">
					{impactabc.doing.includes('benefit-dd') ? (
						<div className="box">
							<p className="tit">
								<span>Rely on due diligence conducted prior to investment</span>
								<br />
								Conduct a thorough analysis of expected social and environmental impact before investment.
							</p>
						</div>
					) : null}

					{impactabc.doing.includes('benefit-existing') ? (
						<div className="box">
							<p className="tit">
								<span>Existing Research</span>
								<br />
								We use existing research to understand if the sectors represented in the portfolio are
								likely to generate positive outcomes.
							</p>
						</div>
					) : null}

					{impactabc.doing.includes('benefit-dataused') ? (
						<div className="box">
							<p className="tit">
								<span>Data used as proxies for positive outcomes</span>
								<br />
								The data from underlying assets include proxy measures, which give some confidence that
								positive outcomes have occurred.
							</p>
						</div>
					) : null}

					{impactabc.doing.includes('benefit-outcome') ? (
						<div className="box">
							<p className="tit">
								<span>Outcome data</span>
								<br />
								Our underlying assets report data that directly measures positive outcomes being
								generated.
							</p>
						</div>
					) : null}

					{impactabc.doing.includes('benefit-other') ? (
						<div className="box">
							<p className="tit">
								<span>Other</span>
								<br />
								{impactabc.benefit_other}
							</p>
						</div>
					) : null}
				</div>
			</div>

			<div className="subtitle">
				<h6>
					<span>C</span>ontribute to solutions
				</h6>
				How do you conclude which of the fund’s underlying assets generate positive change for people, the
				planet or the economy that would otherwise experience an outcome below the nationally or locally
				acceptable level? Select all that apply.
			</div>
			<div className="ppfororange">
				<div className="orangedivcb">
					{impactabc.doing.includes('contribute-existing') ? (
						<div className="box">
							<p className="tit">
								<span>Existing research</span>
								<br />
								We use existing research to understand if the sectors represented in the portfolio are
								likely to generate positive outcomes. We also collect data on whether the stakeholders
								affected would have experienced the outcomes below nationally or locally acceptable
								levels in absence of an asset's activities.
							</p>
						</div>
					) : null}

					{impactabc.doing.includes('contribute-dataused') ? (
						<div className="box">
							<p className="tit">
								<span>Data used as proxies for positive outcomes</span>
								<br />
								The data from underlying assets include proxy measures, which give some confidence that
								positive outcomes have occurred. We also collect data on whether the stakeholders
								affected would have experienced the outcomes below nationally or locally acceptable
								levels in absence of an asset's activities.
							</p>
						</div>
					) : null}

					{impactabc.doing.includes('contribute-outcome') ? (
						<div className="box">
							<p className="tit">
								<span>Outcome data</span>
								<br />
								Our underlying assets report data that directly measures positive outcomes being
								generated. We also collect data on whether the stakeholders affected would have
								experienced the outcomes below nationally or locally acceptable levels in absence of an
								asset's activities.
							</p>
						</div>
					) : null}

					{impactabc.doing.includes('contribute-other') ? (
						<div className="box">
							<p className="tit">
								<span>Other</span>
								<br />
								{impactabc.contribute_other}
							</p>
						</div>
					) : null}
				</div>

				<div className="subtitle">
					<h6>
						<i>Given selections above, classify the fund based on the following:</i>
					</h6>
					<p>{impactabc.basis}</p>
				</div>
			</div>
		</div>
	);
};

export default ImpactABC;
