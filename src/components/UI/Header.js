import React from 'react';
import { useObserver, observer } from 'mobx-react';
import { useCookies } from 'react-cookie';
import { useStores } from '../../hooks/use-stores';

const Header = observer(() => {
	const [ cookies, setCookie ] = useCookies([ 'token' ]);
	const { userStore } = useStores();

	//return header
	return (
		<div>
			Auth: {userStore.isAuthenticated.toString()}
			<br />
			email: {cookies.user ? cookies.user.email : null}
			<br />
			token:{cookies.user ? cookies.user.token.substring(0, 20) : null}
		</div>
	);
});

export default Header;
