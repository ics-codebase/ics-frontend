import React from 'react';
import { Link } from 'react-router-dom';

const Marketing = (props) => {
	return (
		<div className="container-fluid before_we_start">
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<h1>IMP+ACT Classification System Beta</h1>

						<div style={{'font-size':'20px'}}>
							<br/>
							Welcome! The system is in test mode today while we keep optimising the solution for you. Your data is safe and any feedback is appreciated.
						</div>

                        <p>
                            <Link to="/register">Register</Link>
                        </p>

                        <p>
                            <Link to="/login">Login</Link>
                        </p>

					</div>
				</div>
			</div>
		</div>
	);
};

export default Marketing;
