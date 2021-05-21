import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = (props) => {
	return (
		<div className="container-fluid before_we_start">
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<h1>Page not found!</h1>

                        <p>
                            <Link to="/">Home</Link>
                        </p>
                        <p>
                            <Link to="/test">TEst</Link>
                        </p>


					</div>
				</div>
			</div>
		</div>
	);
};

export default NotFound;
