import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment'


function formatMoney(number, decPlaces, decSep, thouSep) {

	decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces;
	decSep = typeof decSep === "undefined" ? "." : decSep;
	thouSep = typeof thouSep === "undefined" ? "," : thouSep;
	var sign = number < 0 ? "-" : "";
	var i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));
	var j = (j = i.length) > 3 ? j % 3 : 0;
	
	return sign + (j ? i.substr(0, j) + thouSep : "") + i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) + (decPlaces ? decSep + Math.abs(number - i).toFixed(decPlaces).slice(2) : "");
}
	



const ReviewFundData = (props) => {
	const fund = props.fund;
	const org = props.org;
	const id = props.id;
	const review = props.reviewOrStatement === 'review' ? true : false;


	return (
		<div>
			{review && (
				<h2>
					Key information <Link to={'/fund/manage/' + id + '?review=true'}>Edit</Link>{' '}
				</h2>
			)}
			<div className="ppfororange">
				<div className={review ? 'orangebox' : 'whitebox'}>

					<div className="row">
						<div className="col-md-6">
						<div className="info">
								<h3 className="mintit">Fund / strategy name</h3>
								<p>{fund.name}</p>
							</div>

							<div className="info">
								<h3 className="mintit">Fund / strategy legal name</h3>
								<p>{fund.legalname}</p>
							</div>
							<div className="info">
								<h3 className="mintit">Regions</h3>
								{fund.multiregionfocus ? 
								<p>
									{fund.multiregionfocus.map(i => <p>{i}</p>)}
								</p> : <p>No data provided</p>}
							</div>
							<div className="info">
								<h3 className="mintit">Fund size</h3>
								<p>
									{fund.fundsize == "0" ?   "Not Disclosed" : <div>{fund.currency} {fund.fundsize}</div> }									
								</p>
							</div>
							<div className="info">
								<h3 className="mintit">Share class</h3>
								<p>{fund.shareclass}</p>
							</div>
							<div className="info">
								<h3 className="mintit">Status</h3>
								<p>{fund.status}</p>
							</div>
							<div className="info">
								<h3 className="mintit">Date classified</h3>
								<p>{moment(fund.dateclassified).format('YYYY-MM-DD')}</p>
							</div>
						</div>

						<div className="col-md-6">
						{!review ?  
							<>
							<div className="info">
								<h3 className="mintit">Organisation</h3>
								<p>{org.name}</p>
							</div>

							</>
							: null}
							<div className="info">
								<h3 className="mintit">ISIN</h3>
								<p>{fund.isin}</p>
							</div>
							<div className="info">
								<h3 className="mintit">Ticker</h3>
								<p>{fund.ticker}</p>
							</div>
							<div className="info">
								<h3 className="mintit">Minimum investment (for investors)</h3>
								<p>
									{fund.currency} {fund.minimuminvestment}
								</p>
							</div>
							<div className="info">
								<h3 className="mintit">Underlying enterprises</h3>
								<p>{fund.enterprises}</p>
							</div>
							<div className="info">
								<h3 className="mintit">Fund Type</h3>
								<p>{fund.fundtype}</p>
							</div>
							<div className="info">
								<h3 className="mintit">Underlying assets</h3>
								{fund.underlyingassets.map((i) => <p>{i}</p>)}
							</div>
							<div className="info">
								<h3 className="mintit">Industry Focus</h3>
								<p>
									{fund.multiindustryfocus.map(i => <p>{i}</p>)}
								</p>
							</div>
							{!review ?  
							<>
							<div className="info">
								<h3 className="mintit">Website</h3>
								<p>{org.website}</p>
							</div>
							</>
							: null}							
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ReviewFundData;
