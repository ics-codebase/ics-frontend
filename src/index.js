//core
import React from 'react';
import ReactDOM from 'react-dom';


//store
import { CookiesProvider } from 'react-cookie';

//components
import App from './App';

//ROUTES
const index = (
	<div>
		<CookiesProvider>
			<App />
		</CookiesProvider>
	</div>
);

ReactDOM.render(index, document.getElementById('root'));
