import { observable, decorate } from 'mobx';
import organisationService from '../services/organisation';
import { observer } from 'mobx-react';

export class OrganisationStore {
	constructor() {
		this.organisation = new Organisation();
		this.refreshFromArchive();
	}

	async refreshFromArchive() {

		//get from API
		const org = await organisationService.getOrganisation()

		if (org) {
				this.organisation = Object.assign(this.organisation, org);
				this.organisation._id = org._id;
				return org;
		}
	}

	saveCurrentOrganisation() {
		//save to db through API
		const res = organisationService.saveOrganisation(this.organisation);

		//this.organisation._id = res._id
		this.refreshFromArchive();

		return res;
	}
}

class Organisation {
	constructor() {
		this._id = null;
		this.name = '';
		this.website = '';
		this.identifiertype = '';
		this.identifier = '';
		this.practices = [];
		this.notations = [];
	}
}

decorate(OrganisationStore, {
	organisation: observable
});
