// Render Prop
import React, { useState, useContext } from 'react';
import Details from '../../components/organisation/Details';
import { Link } from 'react-router-dom';
import { useStores } from '../../hooks/use-stores';

const RegisterOrganisationContainer = () => {
	const saveOrganisationDetails = (orgdata) => {};

	const { userStore } = useStores();
	const { fundStore } = useStores();
	const { organisationStore } = useStores();
	const orgexists = organisationStore.organisation.website === '' ? false : true



	return (
		<div>
			<div className="container-fluid hero">
				<div className="container">
					<h1>Manage your organisation and investment products</h1>
					<p>Complete information on your organisation and then add investment products to self-classify.</p>

					<ul className="buttons nav nav-tabs">
						<li className="nav-item">
							<Link className="nav-link active" to="/organisation">
								Organisation
							</Link>
						</li>
						<li className="nav-item">
							{orgexists ? 
							<Link className="nav-link" to="/organisation/securities">
								Investment Products
							</Link>
							: null}

						</li>
					</ul>

					<div className="dline">
						<div className="greenline">
							<div className="dot" />
						</div>
					</div>
				</div>
			</div>

			<Details />
		</div>
	);
};

export default RegisterOrganisationContainer;
