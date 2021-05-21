//core
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, NavLink, BrowserRouter, Redirect as Router, Switch, Redirect, useHistory } from 'react-router-dom';
import { withRouter } from 'react-router';
import Security from './containers/Auth/Security';
import Terms from './components/info/Terms';
import Privacy from './components/info/Privacy';
import { storesContext } from './store/StoresContext';
import { useStores } from './hooks/use-stores';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

//components

import PrivateRoute from './components/Router/PrivateRoute';
import AdminRoute from './components/Router/AdminRoute';
import NotFound from './components/Notfound';
import UserProfile from './components/User/Profile';
import Auth from './containers/Auth/Auth';
import RegisterContainer from './containers/User/Register';
import RegisterOrganisationContainer from './containers/Organisation/RegisterOrganisation';
import Login from './components/User/Login';
import Logout from './components/User/Logout';
import BeforeWeStart from './components/info/BeforeWeStart';
import Copyright from './components/UI/Copyright';
import NavigationUser from './components/UI/NavigationUser';
import Marketing from './components/info/Marketing';
import Store from './components/organisation/Store';
import SecuritiesContainer from './containers/Organisation/SecuritiesContainer';
import ManageFund from './containers/Fund/ManageFund';
import Loggedin from './components/User/Loggedin';
import Directory from './containers/Directory/Directory';
import Forgot from './components/User/Forgot';
import Change from './components/User/Change';
import ValidateEmail from './components/User/ValidateEmail';


//classification
import Start from './containers/Classification/Start';
import Practice from './containers/Classification/Practice';
import Performance from './containers/Classification/Performance';
import Rating from './containers/Classification/Rating';
import ImpactABC from './containers/Classification/ImpactABC';
import ImpactSDG from './containers/Classification/ImpactSDG';
import InvestorContribution from './containers/Classification/InvestorContribution';
import Allocation from './containers/Classification/Allocation';
import Review from './containers/Classification/Review';
import Statement from './containers/Classification/Statement';
import Finished from './containers/Classification/Finished';
import FinishedNotPublished from './containers/Classification/FinishedNotPublished';


import Test from './components/Test/Test';
import IdleTimer from 'react-idle-timer'


//admin
import AdminDashboard from './components/Admin/Dashboard'
import UserList from './components/Admin/UserList'
import AdminFundList from './components/Admin/FundList'
import PubRequests from './components/Admin/PubRequests'




const App = observer((props) => {
	const { userStore } = useStores();
	const loggedIn = userStore.isAuthenticated;

	
	function onIdle()
	{
		window.location.href = "/logout";
	}


	return (
		<BrowserRouter>
			<IdleTimer
				element={document}
				onIdle={onIdle}
				debounce={250}
				timeout={1000 * 60 * 20}
			/>

			<nav className="navbar navbar-expand-lg navbar-dark">
				<div className="container">
					<Link className="navbar-brand" to="/organisation">
						<img src="/assets/img/logo.png" alt="" />
					</Link>

					<div className="navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav mr-auto" />
						<ul className="navbar-nav mr-right">
							<NavigationUser />
						</ul>
					</div>
				</div>
			</nav>

			<Switch>
				<Route exact path="/" render={(props) => <Auth {...props} />} />
				<Route exact path="/start" component={BeforeWeStart} />
				<Route exact path="/register" component={RegisterContainer} />
				<Route exact path="/account/forgot" component={Forgot} />
				<Route exact path="/account/changepassword/:token" component={Change} />
				<Route exact path="/account/validateemail/:token" component={ValidateEmail} />
				<Route exact path="/terms" component={Terms} />
				<Route exact path="/privacy" component={Privacy} />
				<Route exact path="/logout" component={Logout} />
				<Route exact path="/test" component={Test} />
				<Route exact path="/store" component={Store} />
				<Route exact path="/loggedin" component={Loggedin} />
				<Route exact path="/user/profile" component={UserProfile} />

				<PrivateRoute exact path="/organisation" component={RegisterOrganisationContainer} />
				<PrivateRoute exact path="/organisation/securities" component={SecuritiesContainer} />
				<PrivateRoute exact path="/fund/manage" component={ManageFund} />
				<PrivateRoute exact path="/fund/manage/:id" component={ManageFund} />

				<PrivateRoute exact path="/classify/:id/start" component={Start} />
				<PrivateRoute exact path="/classify/:id/practice" component={Practice} />
				<PrivateRoute exact path="/classify/:id/performance" component={Performance} />
				<PrivateRoute exact path="/classify/:id/impactabc" component={ImpactABC} />
				<PrivateRoute exact path="/classify/:id/impactsdg" component={ImpactSDG} />
				<PrivateRoute exact path="/classify/:id/investor" component={InvestorContribution} />
				<PrivateRoute exact path="/classify/:id/allocation" component={Allocation} />
				<PrivateRoute exact path="/classify/:id/rating" component={Rating} />
				<PrivateRoute exact path="/classify/:id/review" component={Review} />
				<PrivateRoute exact path="/classify/finished" component={Finished} />
				<PrivateRoute exact path="/classify/finishednotpublished/:id" component={FinishedNotPublished} />

				<Route exact path="/statement/:id" component={Statement} />
				<Route exact path="/directory" component={Directory} />


				<AdminRoute exact path="/manage/dashboard" component={AdminDashboard} />
				<AdminRoute exact path="/manage/userlist" component={UserList} />
				<AdminRoute exact path="/manage/fundlist" component={AdminFundList} />
				<AdminRoute exact path="/manage/pubrequests" component={PubRequests} />



				<Route exact path="/test" component={Test} />

				<Route exact path="/login" render={(props) => <Auth {...props} />} />
				<Route component={NotFound} />
			</Switch>

			<div className="container-fluid footer">
				<div className="container">
					<img className="logo" src="/assets/img/logo.png" alt="" />

					<div className="rightdesc">
						<img src="/assets/img/footericon.png" alt="" />
						<Copyright />
					</div>
				</div>
			</div>
		</BrowserRouter>
	);
});

export default App;
