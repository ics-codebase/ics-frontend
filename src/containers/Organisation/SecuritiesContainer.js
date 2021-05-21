// Render Prop
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import FundList from '../../components/Fund/FundList';
import { useStores } from '../../hooks/use-stores';

const SecuritiesContainer = () => {
	const { fundStore } = useStores();
	const { organisationStore } = useStores();

	return (
		<div>
			<div className="container-fluid hero">
				<div className="container">
					<h1>Manage your organisation and investment products</h1>
					<p>Complete information on your organisation and then add investment products to self-classify.</p>

					<ul className="buttons nav nav-tabs">
						<li className="nav-item">
							<Link className="nav-link" to="/organisation">
								Organisation
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link active" to="/organisation/securities">
								Investment Products
							</Link>
						</li>
					</ul>

					<div className="dline">
						<div className="greenline">
							<div className="dot" />
						</div>
					</div>
				</div>
			</div>

			<div id="menu1" className="container tab-pane">
				<br />

				<div className="manage_organisation_information">
					<h2>Add investments for self-classification</h2>
					<div className="like_tbl">
						<p className="title">{organisationStore.organisation.name}</p>
						<p className="rowp firston">
							NAME
							<span className="sec_c_side">VIEW</span>
							<span className="sec_b_side">LAST CLASSIFIED</span>
							<span className="actionspan">ACTION</span>
						</p>

						<FundList fundlist={fundStore.funds} />

						<div className="buttons">
							<Link className="abtn" to="/fund/manage">
								<span>+ Add a Fund</span>
							</Link>
							{/* <Link className="whitebtn" to="/investment/bulk">
								<span>Bulk upload</span>
							</Link> */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SecuritiesContainer;
