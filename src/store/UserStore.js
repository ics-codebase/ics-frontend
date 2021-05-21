import { decorate, observable } from 'mobx';
import Cookies from 'js-cookie';
import userService from '../services/user';
import { useHistory, useParams } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';



export class UserStore {
	constructor() {
		this.isAuthenticated = false;
		this.isAdmin = false;
		this.user = {};
		this.email = '';
		this.displayname = '';
		this.orgname = '';
		this.role = '';
		this.shownSDGWarning = false;

		const ck = Cookies.get('user');

		if (ck) {
			const userCookie = JSON.parse(ck);

			if (userCookie) {

					userService.verifytoken(userCookie.email, userCookie.token).then ((res) => {

						if (res.email)
						{
							this.authenticateUser(res)
						}
					})
			}
		}

	}

	async authenticateUser(user) {
		this.isAuthenticated = true;
		this.user = user;
		this.email = user.email;
		this.displayname = user.firstname + ' ' + user.lastname;
		this.orgname = user.organisationname
		this.role = user.role
		return null;
	}

	deauthenticateUser(user){
		this.isAuthenticated = false;
		Cookies.remove('user');
	}
}

decorate(UserStore, {
	isAuthenticated: observable,
	email: observable,
	user: observable,
	displayname: observable
});
