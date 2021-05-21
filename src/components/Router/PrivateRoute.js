import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useStores } from '../../hooks/use-stores';
import { useCookies } from 'react-cookie';
import userService from '../../services/user';
import Cookies from 'js-cookie';

const PrivateRoute = ({ component: Component, ...rest }) => {
	const { userStore } = useStores();
	const [ cookies, setCookie ] = useCookies([ 'token' ]);


	return (
		<Route
			{...rest}
			render={(props) =>
				userStore.isAuthenticated ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: props.location }
						}}
					/>
				)}
		/>
	);
};

export default PrivateRoute;
