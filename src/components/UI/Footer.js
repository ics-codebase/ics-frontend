import React from 'react';
import Logout from '../../components/User/Logout'

import { useObserver, observer } from 'mobx-react';

const Header = observer(() => {
	//return header
	return (
		<div>
			<br />
			<br />
            <Logout/>
		</div>
	);
});

export default Header;
