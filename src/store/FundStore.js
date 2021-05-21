import { observable, computed, decorate } from 'mobx';
import fundService from '../services/fund';
import { observer } from 'mobx-react';

function findWithAttr(array, attr, value) {
	for (var i = 0; i < array.length; i += 1) {
		if (array[i][attr] === value) {
			return i;
		}
	}
	return -1;
}

export class FundStore {
	constructor() {
		this.funds = [];
		this.refreshFromArchive();
	}

	async refreshFromArchive() {
		try {
			//get from API
			const fundsFromAPI = await fundService.getFunds();

			//save to store
			this.funds = Object.assign(this.funds, fundsFromAPI);

			return this.funds;
		} catch (err) {
			console.log(err);
		}
	}

	async saveFund(v) {
		//this bit tidies up old data can be deleted after a while
		if (v.regionalfocus) {
			delete v.regionalfocus;
		}
		if (v.subregionalfocus) {
			delete v.subregionalfocus;
		}
		if (v.industryfocus) {
			delete v.industryfocus;
		}
		if (v.subindustryfocus) {
			delete v.subindustryfocus;
		}
		// -----------------


		if (v._id) {
			delete v.__v;
		}

		const res = await fundService.saveFund(v);

		return res;
	}
}

class Fund {
	constructor() {
		this._id = null;
		this.name = '';
		this.questions = [];
		this.impactabc = {};
		this.impactsdg = {};
	}

	async saveFund() {
		const res = await fundService.saveFund(this);
		return res;
	}
}
