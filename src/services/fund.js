import axios from 'axios';
import Cookies from 'js-cookie';
const qs = require('qs')


const fundService = {
	async createFund(fund) {
		try {
			const user = JSON.parse(Cookies.get('user'));

			var config = {
				headers: { Authorization: 'bearer ' + user.token }
			};

			let res = await axios.post(process.env.REACT_APP_API_URI + '/fund', fund, config);
			return res.data;
		} catch (err) {
			console.log(err);
		}
	},

	async saveFund(vals) {
		try {
			//do security
			const user = JSON.parse(Cookies.get('user'));
			var config = {
				headers: { Authorization: 'bearer ' + user.token }
			};

			
			//save or update
			if (vals._id) {
				let res = await axios.put(process.env.REACT_APP_API_URI + '/fund', vals, config);
				return res.data;
			} else {
				let res = await axios.post(process.env.REACT_APP_API_URI + '/fund', vals, config);
				return res.data;
			}
		} catch (err) {
			console.log(err);
			return err;
		}
	},

	async getFunds() {
		try {
			const user = JSON.parse(Cookies.get('user'));

			var config = {
				headers: { Authorization: 'bearer ' + user.token }
			};

			let res = await axios.get(process.env.REACT_APP_API_URI + '/fund/', config);

			return res.data;
		} catch (err) {
			console.log(err);
		}
	},

	async getSingleFund(id) {
		try {
			const url = process.env.REACT_APP_API_URI + '/fund/public/' + id
			let res = await axios.get(url)
			return res.data;

		} catch (err) {
			console.log(err);
		}
	},


	async changePublished(id, published) {
		try {
			const user = JSON.parse(Cookies.get('user'));

			var data = {
				'published': published,
			}

			const config = {
				headers: { 'Content-Type': 'application/x-www-form-urlencoded', Authorization: 'bearer ' + user.token  }
			};

			let res = await axios.put(process.env.REACT_APP_API_URI + '/fund/published/' + id, qs.stringify(data), config);
			return res.data;
		} catch (err) {
			console.log(err);
		}
	},



	async deleteFund(id) {
		try {
			const user = JSON.parse(Cookies.get('user'));

			const config = {
				headers: { 'Content-Type': 'application/x-www-form-urlencoded', Authorization: 'bearer ' + user.token  }
			};

			let res = await axios.delete(process.env.REACT_APP_API_URI + '/fund/delete/' + id, config);
			return res.data;
		} catch (err) {
			console.log(err);
		}
	},



	async duplicateFund(id) {
		try {
			const user = JSON.parse(Cookies.get('user'));

			const config = {
				headers: { 'Content-Type': 'application/x-www-form-urlencoded', Authorization: 'bearer ' + user.token  }
			};

			let res = await axios.get(process.env.REACT_APP_API_URI + '/fund/duplicate/' + id, config);
			return res.data;
		} catch (err) {
			console.log(err);
		}
	},

	

	async downloadCSV(id) {
		try {
			const user = JSON.parse(Cookies.get('user'));

			const config = {
				headers: { 'Content-Type': 'application/x-www-form-urlencoded', Authorization: 'bearer ' + user.token  }
			};

			let res = await axios.get(process.env.REACT_APP_API_URI + '/fund/csv/' + id, config);

			return res.data;
		} catch (err) {
			console.log(err);
		}
	},

	


	
};

export default fundService;
