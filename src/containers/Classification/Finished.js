import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { useHistory, useParams, Link } from 'react-router-dom';
import ScrollToTop from '../../components/Router/ScrollToTop';
import Matrix from '../../components/Statement/Matrix';
import axios from 'axios';

const Finished = (props) => {

	return (
		<div>
			<ScrollToTop />
			<div className="container-fluid step1_container">
				<div className="container">
					<div className="row">
						<div className="col-md-12" style={{ paddingTop: '30px', textAlign:'center' }}>
							<h1>Submission Complete</h1>

                            <br/>
                            Thank you for submitting your statement for publishing.

							<br />
							<br />

							<div style={{ marginBottom: '20px', marginTop: '20px', color: 'grey' }}>
								Disclaimer: The classification statements are for information purposes only and do not
								in any way amount to financial, investment, legal or tax advice or any other investment
								engagement, whether through use of the classification statements, or otherwise, whether
								by you or by anyone else on your behalf. You should take professional financial or
								investment advice in connection with, or independently research and verify, any
								information contained in the classification statements or otherwise on our website that
								you wish to rely upon, whether for the purpose of making an investment decision, or
								otherwise.
							</div>

							<div className="buttonsbtn">
								<div className="row">
									<div className="col-12 leftside">
										<div className="paddingdiv" styles={{ "alignContent": "center"}}>

										<Link to="/organisation/securities">
											<button>
												<span>Go back to 'Manage organisation and investment products'</span>
											</button>
										</Link>
										</div>
									</div>
								</div>
							</div>

						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Finished;
