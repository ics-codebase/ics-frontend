// Render Prop
import React, { useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import ManageFundForm from "../../components/Fund/ManageFundForm";
import ScrollToTop from "../../components/Router/ScrollToTop";
import { withRouter } from "react-router";
import DuplicateFund from "../../components/Fund/DuplicateFund";

const ManageFund = (props) => {

    let { id } = useParams();
    const fundExists = id ? true : false


    return (
        <div>
            <ScrollToTop />
            <div className="container-fluid add_details">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="maxwidthcont">
                                <h1>Add details about your fund / strategy</h1>

                                <ManageFundForm location={props.location} />
                            </div>
                        </div>
                    </div>

                    { fundExists ? 
                    <div className="row" styles={{ paddingTop: "40px;" }}>
                        <div className="col-md-12">
                            <div className="maxwidthcont">
                                <hr />

                                <DuplicateFund />
                            </div>
                        </div>
                    </div> :null}
                </div>
            </div>
        </div>
    );
};

export default withRouter(ManageFund);
