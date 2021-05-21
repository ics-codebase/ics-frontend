import React, { Component } from "react";
import { withRouter } from "react-router";
import { useHistory, useParams } from "react-router-dom";
import { useStores } from "../../hooks/use-stores";
import Alloc from "../../components/Classify/Allocation";
import ScrollToTop from "../../components/Router/ScrollToTop";
import ModalInfo from "../../components/UI/ModalInfo";
import * as QueryString from "query-string";
import Steps from "../../components/Classify/Steps";

const Allocation = (props) => {
    let history = useHistory();
    let { id } = useParams();
    const { fundStore } = useStores();
    var fund = fundStore.funds.find((x) => x._id === id);

    function saveAndContinue() {
        fundStore.saveFund(fund); // IVE ADDED THIS AFTER NO SAVE BUG FOR ALLOCATION

        const params = QueryString.parse(props.location.search);

        if (params.review) {
            history.push("/classify/" + id + "/review");
        } else {
            history.push("/classify/" + id + "/rating");
        }
    }

    function goBack() {
        history.push("/classify/" + id + "/investor");
    }

    return (
        <div>
            <ScrollToTop />

            <div className="container-fluid step1_container">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Steps lineat="allocation" />

                            <h1 className="step5h1">
                                Step 6: Impact class allocation
                            </h1>
                            <p className="desc">
                                Your answers to previous sections have enabled
                                different impact classes. What percentage of
                                the fund's underlying assets (by AUM) fall
                                within these impact classes? Please note, an
                                asset must at least ‘<b>A</b>ct to avoid harm’
                                before it can be classified as ‘<b>B</b>enefit
                                stakeholders’ or ‘<b>C</b>ontribute to
                                solutions’.{" "}
                            </p>

                            <ModalInfo url="https://james536236.typeform.com/to/tlzVv8" />

                            <p>
                                If classifying the fund based on expected
                                performance, please input the expected
                                allocation of the fund.
                            </p>

                            <Alloc fund={fund} save={saveAndContinue} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Allocation);
