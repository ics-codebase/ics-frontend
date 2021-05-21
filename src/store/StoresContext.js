
import React from 'react';
import { OrganisationStore } from '../store/OrganisationStore';
import { UserStore } from '../store/UserStore';
import { FundStore } from './FundStore';

export const storesContext = React.createContext({
	organisationStore: new OrganisationStore(),
  userStore: new UserStore(),
  fundStore: new FundStore()
});
