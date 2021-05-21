import React from 'react';
import Logout from '../../components/User/Logout';
import { useStores } from '../../hooks/use-stores';
import { Link } from 'react-router-dom';

import { useObserver, observer } from 'mobx-react';

const Copyright = observer(() => {
	const { userStore } = useStores();
	const loggedIn = userStore.isAuthenticated;

	return (
		<div>
				<p>
				<h4>Contact us</h4>
				If you would like to find out more about the IMP+ACT Alliance or have any questions on how to
				self-classify please contact us: team@impactalliance.co.uk.
			</p>
		</div>
	);
});

export default Copyright;
